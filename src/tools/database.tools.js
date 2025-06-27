const { fetchJson } = require("../utils")
// Tool: Get session by ID
const getSessionByIdTool = async (sessionId) => {
  return fetchJson(`${process.env.DATABASE_SERVICE_URL}/sessions/${sessionId}`)
}

// Tool: Get all user performances for a session, grouped by section
const getPerformancesByUserAndSessionTool = async (sessionId, userId) => {
  return fetchJson(
    `${process.env.DATABASE_SERVICE_URL}/sessions/${sessionId}/user/${userId}/performances`
  )
}

// Tool: Get performances by session
const getPerformancesBySessionIdTool = async (sessionId) => {
  return fetchJson(
    `${process.env.DATABASE_SERVICE_URL}/performances/session/${sessionId}`
  )
}

// Tool: Get performances by session and section
const getSectionPerformancesForSessionTool = async (sessionId, section) => {
  return fetchJson(
    `${process.env.DATABASE_SERVICE_URL}/performances/session/${sessionId}/section/${section}`
  )
}

// Tool: Get latest performance for a user
const getLatestPerformanceByUserTool = async (userId) => {
  return fetchJson(
    `${process.env.DATABASE_SERVICE_URL}/performances/user/${userId}/latest`
  )
}

// Tool: Get all performances for a user
const getPerformancesByUserTool = async (userId) => {
  return fetchJson(
    `${process.env.DATABASE_SERVICE_URL}/performances/user/${userId}`
  )
}

// Tool: Get latest performance for a user and section
const getLatestPerformanceByUserSessionAndSectionTool = async (
  userId,
  sessionId,
  section
) => {
  return fetchJson(
    `${process.env.DATABASE_SERVICE_URL}/performances/user/${userId}/session/${sessionId}/section/${section}/latest`
  )
}

// Tool: Update feedback/score for a performance
const updatePerformanceFeedbackTool = async (performanceId, feedback) => {
  return fetchJson(
    `${process.env.DATABASE_SERVICE_URL}/performances/${performanceId}/feedback`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback)
    }
  )
}

module.exports = {
  getSessionByIdTool,
  getPerformancesByUserAndSessionTool,
  getPerformancesBySessionIdTool,
  getSectionPerformancesForSessionTool,
  getLatestPerformanceByUserTool,
  getPerformancesByUserTool,
  getLatestPerformanceByUserSessionAndSectionTool,
  updatePerformanceFeedbackTool
}
