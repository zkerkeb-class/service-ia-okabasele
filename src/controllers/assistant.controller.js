const { OpenAI } = require("openai")
const toolService = require("../services/tool.service")
const { toolsMap } = require("../constants/toolsMap")
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

exports.createThread = async (req, res) => {
  try {
    const thread = await openai.beta.threads.create()
    res.status(201).json({ threadId: thread.id })
  } catch (error) {
    console.error("Error creating thread:", error)
    res.status(500).json({ error: "Failed to create thread" })
  }
}

exports.getThreadById = async (req, res) => {
  const { threadId } = req.params
  try {
    const messages = await openai.beta.threads.messages.list(threadId)
    res.status(200).json({ threadId, messages: messages.data })
  } catch (error) {
    console.error("Error retrieving thread:", error)
    res.status(500).json({ error: "Failed to retrieve thread" })
  }
}

exports.addMessageToThread = async (req, res) => {
  const { threadId } = req.params
  const { message, userId } = req.body

  try {
    // Ajouter le message utilisateur
    await openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message
    })

    // Définir les outils
    const tools = Array.from(toolsMap.values())

    let run = await openai.beta.threads.runs.list(threadId)
    run = run.data.find((r) => ["in_progress", "queued"].includes(r.status))

    if (!run) {
      // Démarrer un run
      run = await openai.beta.threads.runs.create(threadId, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID,
        tools,
        max_prompt_tokens: 1000
      })
    }

    // Suivre le statut du run
    while (["queued", "in_progress", "requires_action"].includes(run.status)) {
      if (
        run.status === "requires_action" &&
        run.required_action?.submit_tool_outputs
      ) {
        const toolCalls = run.required_action.submit_tool_outputs.tool_calls
        const toolOutputs = []

        for (const toolCall of toolCalls) {
          const functionName = toolCall.function.name
          const args = JSON.parse(toolCall.function.arguments)

          let result
          if (toolService[functionName]) {
            result = await toolService[functionName](args.userId || userId)
          } else {
            result = { error: `Tool ${functionName} not found in toolHandlers` }
          }

          toolOutputs.push({
            tool_call_id: toolCall.id,
            output: JSON.stringify(result)
          })
        }

        // Soumettre les outputs au run
        await openai.beta.threads.runs.submitToolOutputs(threadId, run.id, {
          tool_outputs: toolOutputs
        })
      }

      // Attendre avant de re-check
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Récupérer le statut mis à jour
      run = await openai.beta.threads.runs.retrieve(threadId, run.id)
    }

    // Lire les messages de l’assistant
    const messages = await openai.beta.threads.messages.list(threadId)
    const assistantMessages = messages.data.filter(
      (m) => m.role === "assistant"
    )

    const latestMessage = assistantMessages[0]?.content[0]?.text?.value
    res
      .status(200)
      .json({ response: latestMessage || "No response from assistant." })
  } catch (error) {
    console.error("Error adding message to thread:", error)
    res.status(500).json({ error: "Failed to process message" })
  }
}
