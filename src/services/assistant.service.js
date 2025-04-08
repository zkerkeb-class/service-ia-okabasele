const OpenAI = require("openai")

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

async function getOpenAIResponse(prompt) {
  try {
    const response = await openai.ChatCompletion.create({
    //   model: "gpt-4", //A CHANGER
      messages: [
        { role: "system", content: "You are a piano teacher." },
        { role: "user", content: prompt }
      ]
    })
    return response.choices[0].message.content
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error)
    throw error
  }
}

module.exports = {
  getOpenAIResponse
}
