const toolsMap = new Map([
  [
    "getUserProfile",
    {
      type: "function",
      function: {
        name: "getUserProfile",
        description: "Retrieve the user's piano learning profile",
        parameters: {
          type: "object",
          properties: { userId: { type: "string" } },
          required: ["userId"]
        }
      }
    }
  ],
  [
    "getLastPerformance",
    {
      type: "function",
      function: {
        name: "getLastPerformance",
        description: "Get the user's last piano performance for analysis",
        parameters: {
          type: "object",
          properties: { userId: { type: "string" } },
          required: ["userId"]
        }
      }
    }
  ]
])

module.exports = { toolsMap }
