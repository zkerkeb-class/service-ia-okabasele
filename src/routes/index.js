const express = require("express")
const router = express.Router()

const assistantRoutes = require("./assistant.routes")
const analyzeRoutes = require("./analyze.routes")

router.use("/assistant", assistantRoutes)
router.use("/analyze", analyzeRoutes)

module.exports = router
