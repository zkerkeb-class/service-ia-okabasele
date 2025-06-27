const { comparePerformance } = require("../services/performance.service")
const databaseTools = require("../tools/database.tools")

// Analyze user performance: compare user MIDI to reference, store feedback
exports.analyzePerformance = async (req, res) => {
  try {
    const { performance, reference } = req.body
    // 1. Compare performance to reference (simple example, replace with your logic)
    const analysis = comparePerformance(performance.midiNotes, reference)
    let correctNotes = analysis.filter((note) => note.success).length
    let totalNotes = Math.max(performance.midiNotes.length, reference.length)
    let score = Math.round((correctNotes / totalNotes) * 100)
    const feedback = {
      score,
      comments: analysis
        .filter((note) => !note.feedback.success)
        .map((note) => note.feedback.errors)
        .join(", ")
    }

    // 2. Get latest performance for this user/session/section
    const latest =
      await databaseTools.getLatestPerformanceByUserSessionAndSectionTool(
        performance.user,
        performance.session,
        performance.section
      )
    if (latest && latest._id) {
      // 3. Update feedback in database
      await databaseTools.updatePerformanceFeedbackTool(latest._id, feedback)
    }
    res.json({ score, feedback: analysis })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
