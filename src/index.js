require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { mockDataError, referenceScore, generateMockFeedback } = require("./mocks")
const { comparePerformance, generatePrompt } = require("./services/performance.service")
const { getOpenAIResponse } = require("./services/assistant.service")

const app = express()
app.use(express.json())
app.use(cors())


// Route d'analyse
app.get("/api/analyze", async (req, res) => {
  try {
    const analysisResults = comparePerformance(
      mockDataError.performance,
      referenceScore.reference
    )

    // Création du prompt pour ChatGPT
    // const prompt = generatePrompt(mockDataError, referenceScore, analysisResults)

    // const response = await getOpenAIResponse(prompt)
    // res.json({ success: true, feedback: response });

    const feedback = generateMockFeedback(analysisResults)
    res.json({ success: true, feedback })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, error })
  }
})

// Lancer le serveur
app.listen(3001, () => console.log("🎵 Server running on port 3001"))
