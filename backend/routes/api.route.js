const router = require('express').Router();
const crypto = require('crypto');
const { google } = require('googleapis');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// const REFRESH_TOKEN = ''

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'postmessage' // <-- THIS IS MANDATORY FOR REACT POPUPS
);

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

router.post('/create-tokens', async (req, res, next) => {
  try {
    const { code } = req.body;
    console.log("1. Backend successfully received the Auth Code:", code);

    // <-- THIS MUST BE getToken(), NOT get()
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);
    console.log("2. SUCCESS! Here are your actual tokens:", tokens);
    res.send(tokens);
  }
  catch (error) {
    console.error("Google API Error:", error.message);
    next(error);
  }
});

router.post('/create-event', async (req, res, next) => {
  try {
    const { summary, description, location, startDateTime, endDateTime, createMeet, attendeeEmails } = req.body;
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Map array of email strings to EventAttendee objects
    const attendees = Array.isArray(attendeeEmails) && attendeeEmails.length > 0
      ? attendeeEmails.map(email => ({ email }))
      : undefined;

    const event = {
      summary,
      description,
      location,
      start: { dateTime: new Date(startDateTime).toISOString() },
      end: { dateTime: new Date(endDateTime).toISOString() },
      attendees,
    };

    if (createMeet) {
      event.conferenceData = {
        createRequest: {
          requestId: crypto.randomUUID(),
          conferenceSolutionKey: {
            type: 'hangoutsMeet',
          },
        },
      };
    }

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all', // Send an email invitation directly to everyone added in attendees
    });
    res.send(response.data);
  } catch (error) {
    next(error)
  }

})
module.exports = router;