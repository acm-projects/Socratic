const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const calendarService = require('../services/calendarService');
const userModel = require('../models/userModel');
const accountModel = require('../models/accountModel');

// In-memory session tracking for "Volatile Sessions" (restarts clear this)
const activeSessions = new Set();

// Middleware to check if the user has an active session in local server memory
const checkSession = (req, res, next) => {
  const userId = req.headers['x-user-id'] || (req.body && req.body.userId) || req.query.userId;
  if (!userId || !activeSessions.has(userId)) {
    console.warn(`Unauthorized access attempt or server restarted for user: ${userId}`);
    return res.status(401).send({ error: "Session expired or server restarted. Please log in again." });
  }
  next();
};

router.get('/session-check', checkSession, (req, res) => {
  res.send({ status: "ok" });
});

router.post('/create-tokens', async (req, res, next) => {
  try {
    const { code } = req.body;
    console.log("1. Backend successfully received the Auth Code:", code);

    // 1. Exchange code for tokens
    const tokens = await calendarService.getCalendarTokens(code);

    // 2. Use tokens to get user profile from Google
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'postmessage'
    );
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: profile } = await oauth2.userinfo.get();

    console.log("2. SUCCESS! Fetched Google Profile:", profile.email);

    // 3. Upsert User in database
    let user = await userModel.getUserByEmail(profile.email);
    if (!user) {
      user = await userModel.createUser({
        id: profile.id, // Use Google sub ID as internal ID
        email: profile.email,
        total_xp: 0,
        weekly_xp: 0,
        image: profile.picture
      });
    }

    // 4. Upsert Account in database
    let account = await accountModel.getAccountByProvider('google', profile.id);
    if (!account) {
      account = await accountModel.createAccount({
        userId: user.id,
        provider: 'google',
        providerAccountId: profile.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        type: tokens.token_type
      });
    } else {
      await accountModel.updateAccountTokens(
        'google',
        profile.id,
        tokens.access_token,
        tokens.refresh_token || account.refresh_token
      );
    }

    // 5. Register in volatile memory
    activeSessions.add(user.id);

    // 6. Return tokens and userId to frontend
    res.send({
      userId: user.id,
      email: user.email,
      tokens
    });
  } catch (error) {
    console.error("Google API Error:", error.message);
    next(error);
  }
});

router.post('/create-event', checkSession, async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId;
    const responseData = await calendarService.createCalendarEvent(userId, req.body);
    res.send(responseData);
  } catch (error) {
    next(error);
  }
});

router.get('/upcoming-events', checkSession, async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId;
    const events = await calendarService.getUpcomingMeetings(userId);
    res.send(events);
  } catch (error) {
    next(error);
  }
});

router.get('/events', checkSession, async (req, res, next) => {
  try {
    const userId = req.headers['x-user-id'] || req.query.userId;
    const { timeMin, timeMax, maxResults } = req.query;
    const events = await calendarService.getEvents(
      userId,
      timeMin,
      timeMax,
      maxResults ? parseInt(maxResults, 10) : undefined
    );
    res.send(events);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
