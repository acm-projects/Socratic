const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const calendarService = require('../services/calendarService');
const { ReauthRequiredError, isReauthError } = calendarService;
const userModel = require('../models/userModel');
const accountModel = require('../models/accountModel');

// Unified error handler for calendar routes.
// Converts expired/revoked token errors into a clean 401 so the frontend
// knows to redirect the user to re-authorize with Google.
const handleCalendarError = (error, res) => {
  if (error instanceof ReauthRequiredError || isReauthError(error)) {
    console.warn('[Calendar] Token expired/revoked:', error.message);
    return res.status(401).json({
      error: 'reauth_required',
      message: 'Your Google authorization has expired. Please sign in with Google again.'
    });
  }
  console.error('[Calendar] Unexpected error:', error.message);
  res.status(500).json({ error: error.message || 'Internal server error' });
};

// In-memory session tracking for "Volatile Sessions" (restarts clear this)
const activeSessions = new Set();

// Middleware: resolve and validate the requesting user's ID
// userId must be supplied via x-user-id header, request body, or query param.
const checkSession = async (req, res, next) => {
  const userId = req.headers['x-user-id'] || (req.body && req.body.userId) || req.query.userId;

  if (!userId) {
    return res.status(401).json({ error: "userId is required. Pass it via the x-user-id header, body, or query param." });
  }

  // 1. Check in-memory session (fastest path)
  if (activeSessions.has(userId)) {
    req.resolvedUserId = userId;
    return next();
  }

  // 2. Fall through to DB to handle server restarts
  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(401).json({ error: "No user found with this ID." });
    }
    activeSessions.add(userId);
    req.resolvedUserId = userId;
    next();
  } catch (error) {
    console.error("Session verification error:", error.message);
    res.status(500).json({ error: "Internal server error during session verification." });
  }
};

router.get('/session-check', checkSession, (req, res) => {
  res.send({ status: "ok" });
});

router.post('/create-tokens', async (req, res, next) => {
  try {
    const { code, redirect_uri } = req.body;
    console.log("[Auth] Backend received Auth Code and Redirect URI:", redirect_uri);

    // 1. Exchange code for tokens
    const tokens = await calendarService.getCalendarTokens(code, redirect_uri);
    console.log("[Auth] Tokens successfully exchanged with Google.");

    // 2. Use tokens to get user profile from Google
    // IMPORTANT: If frontend sends code with a specific redirect_uri, 
    // we must match it here. Defaulting to 'postmessage' or the origin.
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

    console.log(`[Auth] User ${profile.email} authenticated. Refresh Token Present: ${!!(tokens.refresh_token || (account && account.refresh_token))}`);

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

router.post('/create-event', checkSession, async (req, res) => {
  try {
    const userId = req.resolvedUserId;
    const responseData = await calendarService.createCalendarEvent(userId, req.body);
    res.send(responseData);
  } catch (error) {
    handleCalendarError(error, res);
  }
});

router.get('/upcoming-events', checkSession, async (req, res) => {
  try {
    const userId = req.resolvedUserId;
    const events = await calendarService.getUpcomingMeetings(userId);
    res.send(events);
  } catch (error) {
    handleCalendarError(error, res);
  }
});

router.get('/events', checkSession, async (req, res) => {
  try {
    const userId = req.resolvedUserId;
    const { timeMin, timeMax, maxResults } = req.query;
    const events = await calendarService.getEvents(
      userId,
      timeMin,
      timeMax,
      maxResults ? parseInt(maxResults, 10) : undefined
    );
    res.send(events);
  } catch (error) {
    handleCalendarError(error, res);
  }
});

module.exports = router;
