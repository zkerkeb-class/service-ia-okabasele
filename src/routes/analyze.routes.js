const express = require("express")
const router = express.Router()
const analyzeController = require("../controllers/analyze.controller")

// Route: POST /analyze
router.post("/analyze", analyzeController.analyzePerformance)

module.exports = router
