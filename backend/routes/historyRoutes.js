const express = require('express');
const router = express.Router();
const historyModel = require('../models/historyModel');

// GET /api/history - Retrieve all chat sessions
router.get('/', async (req, res, next) => {
  try {
    const chats = await historyModel.getChats();
    res.status(200).json(chats);
  } catch (error) {
    next(error);
  }
});

// GET /api/history/:chatId - Retrieve all messages for a specific chat
router.get('/:chatId', async (req, res, next) => {
  try {
    const messages = await historyModel.getMessages(req.params.chatId);
    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
