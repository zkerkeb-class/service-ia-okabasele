// Mock functions to simulate tool service behavior
const getUserProfile = async (userId) => {
  return {
    id: userId,
    level: "beginner",
    goals: "improve left-hand independence",
    currentPiece: "Für Elise"
  }
}

const getLastPerformance = async (userId) => {
  return {
    userId,
    performance: [
      { note: 60, time: 1.2, velocity: 90 },
      { note: 62, time: 1.6, velocity: 88 }
    ],
    reference: [
      { note: 60, time: 1.2, velocity: 90 },
      { note: 62, time: 1.6, velocity: 90 }
    ],
    analysis: [
      {
        note: 60,
        success: true,
        errors: [],
        streak: { type: "success", count: 2 }
      }
    ],
    additional_context: "performance"
  }
}

const toolHandlers = {
  getUserProfile,
  getLastPerformance
}

module.exports = toolHandlers
