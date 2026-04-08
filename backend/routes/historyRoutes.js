const express = require('express');
const router = express.Router();
const chatModel = require('../models/chatModel');

// GET /api/history - Retrieve all chat sessions
router.get('/', async (req, res, next) => {
  try {
    const chats = await chatModel.getChats();
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
});

// GET /api/history/:chatId - Retrieve all messages for a specific chat
router.get('/:chatId', async (req, res, next) => {
  try {
    const messages = await chatModel.getMessages(req.params.chatId);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

// POST /api/history - Create a new chat session
router.post('/', async (req, res, next) => {
  try {
    const { id, title } = req.body;
    await chatModel.createChat(id, title);
    res.status(201).json({ success: true, id, title });
  } catch (error) {
    next(error);
  }
});

// POST /api/history/:chatId/messages - Add a message to a chat
router.post('/:chatId/messages', async (req, res, next) => {
  try {
    const { role, content, score, reason } = req.body;
    await chatModel.addMessage(req.params.chatId, role, content, score, reason);
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
