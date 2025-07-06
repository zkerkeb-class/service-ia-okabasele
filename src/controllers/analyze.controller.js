const { comparePerformance } = require("../services/performance.service")
const databaseTools = require("../tools/database.tools")

// Analyze user performance: compare user MIDI to reference, store feedback
exports.analyzePerformance = async (req, res) => {
  try {
    const { performance, reference } = req.body
    const sectionName = performance.section || "intro"
    const referenceNotes = reference.sections?.[sectionName] || []
    // 1. Compare performance to reference (simple example, replace with your logic)
    const analysis = comparePerformance(performance.midiNotes, referenceNotes)
    console.log("Analysis result:", analysis)
    let correctNotes = analysis.filter((note) => note.success).length
    let totalNotes = Math.max(
      performance.midiNotes.length,
      referenceNotes.length
    )
    let score =
      totalNotes > 0 ? Math.round((correctNotes / totalNotes) * 100) : 0
    const feedback = {
      score,
      comments: analysis
        .filter((note) => !note.success)
        .map((note) =>
          Array.isArray(note.errors)
            ? note.errors
                .map((e) => (typeof e === "string" ? e : JSON.stringify(e)))
                .join(", ")
            : ""
        )
        .join(", ")
    }
    console.log("updatePerformanceFeedbackTool payload:", {
      performanceId: performance._id,
      feedback
    })
    // 2. Update feedback in the performance just analyzed
    await databaseTools.updatePerformanceFeedbackTool({
      performanceId: performance._id,
      feedback
    })
    res.json({ score, feedback })
  } catch (error) {
    console.error("Error analyzing performance:", error)
    res.status(500).json({
      error: `Feedback of performance was not updated! : ${error.message}`
    })
  }
}
