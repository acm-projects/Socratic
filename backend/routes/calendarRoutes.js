const express = require('express');
const router = express.Router();
const calendarService = require('../services/calendarService');

router.post('/create-tokens', async (req, res, next) => {
  try {
    const { code } = req.body;
    console.log("1. Backend successfully received the Auth Code:", code);
    const tokens = await calendarService.getCalendarTokens(code);
    console.log("2. SUCCESS! Here are your actual tokens:", tokens);
    res.send(tokens);
  } catch (error) {
    console.error("Google API Error:", error.message);
    next(error);
  }
});

router.post('/create-event', async (req, res, next) => {
  try {
    const responseData = await calendarService.createCalendarEvent(req.body);
    res.send(responseData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
