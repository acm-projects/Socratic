const express = require('express');
const router = express.Router();
const chatSessionModel = require('../models/chatSessionModel');

router.get('/user/:userId', async (req, res, next) => {
  try {
    const sessions = await chatSessionModel.getSessionsByUserId(req.params.userId);
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
