require("dotenv").config()
const express = require("express")
const cors = require("cors")
const assistantRoutes = require("./routes/assistant.routes")

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true
  })
)

// Routes
app.use("/api", assistantRoutes)
// Lancer le serveur
app.listen(PORT, () => console.log("🎵 Server running on port 3001"))
