const express = require('express');
const router = express.Router();
const sessionModel = require('../models/chatSessionModel');

// GET /api/history - Retrieve chat sessions for a specific user
router.get('/', async (req, res, next) => {
  try {
    const { userId } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: "Missing required query parameter: userId" });
    }

    const sessions = await sessionModel.getSessionsByUserId(userId);
    // Map session_id to id for frontend compatibility
    const mapped = sessions.map(s => ({
      ...s,
      id: s.session_id
    }));
    res.status(200).json(mapped);
  } catch (error) {
    next(error);
  }
});

// GET /api/history/:chatId - Retrieve all messages for a specific chat
router.get('/:chatId', async (req, res, next) => {
  try {
    const messages = await sessionModel.getMessagesBySessionId(req.params.chatId);
    // Map sender to role for frontend compatibility
    const mapped = messages.map(m => ({
      ...m,
      role: m.sender
    }));
    res.status(200).json(mapped);
  } catch (error) {
    next(error);
  }
});

// POST /api/history - Create a new chat session (Legacy redirect)
router.post('/', async (req, res, next) => {
  try {
    const { id, title } = req.body;
    await sessionModel.createSession({ session_id: id, title });
    res.status(201).json({ success: true, id, title });
  } catch (error) {
    next(error);
  }
});

// POST /api/history/:chatId/messages - Add a message to a chat (Legacy redirect)
router.post('/:chatId/messages', async (req, res, next) => {
  try {
    const { role, content, score, reason } = req.body;
    await sessionModel.saveChatMessage({ 
      id: require('crypto').randomUUID(),
      session_id: req.params.chatId, 
      sender: role, 
      content, 
      score, 
      reason 
    });
    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
