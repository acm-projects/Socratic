const express = require('express');
const router = express.Router();
const chatSessionModel = require('../models/chatSessionModel');

router.get('/user/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    console.log(`[INFO] Fetching sessions for userId: ${userId}`);
    
    const sessions = await chatSessionModel.getSessionsByUserId(userId);
    
    // Log verification to console
    const leaked = sessions.filter(s => s.user_id !== userId);
    if (leaked.length > 0) {
      console.error(`[CRITICAL] Data leak detected! Returned ${leaked.length} sessions for other users.`);
    } else {
      console.log(`[PASS] Successfully retrieved ${sessions.length} sessions. Isolation verified.`);
    }

    res.json(sessions);
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const session = await chatSessionModel.getSessionById(req.params.id);
    res.json(session);
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const newSession = await chatSessionModel.createSession(req.body);
    res.json(newSession);
  } catch (error) { next(error); }
});

module.exports = router;
