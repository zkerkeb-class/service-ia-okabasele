const express = require("express")

const assistantController = require("../controllers/assistant.controller")

const router = express.Router()

// 1. Créer un thread pour une session
router.post("/threads", assistantController.createThreadForSession)

// 2. Récupérer un thread avec historique
router.get("/threads/:threadId", assistantController.getThreadById)

// 3. Ajouter un message à un thread et obtenir une réponse
router.post(
  "/threads/:threadId/messages",
  assistantController.addMessageToThread
)
module.exports = router
