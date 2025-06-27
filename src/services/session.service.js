const { fetchJson } = require("../utils")

// Create a new session
const createSession = async (userId, sessionData) => {
  return fetchJson(`${process.env.DATABASE_SERVICE_URL}/sessions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, ...sessionData })
  })
}

//  Add threadId to a session
const addThreadIdToSession = async (sessionId, threadId) => {
  return fetchJson(
    `${process.env.DATABASE_SERVICE_URL}/sessions/${sessionId}/thread`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threadId })
    }
  )
}

module.exports = {
  createSession,
  addThreadIdToSession
}
