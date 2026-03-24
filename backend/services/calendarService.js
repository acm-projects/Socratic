const { google } = require("googleapis");
const crypto = require("crypto");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

const getCalendarTokens = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  return tokens;
};

const createCalendarEvent = async (eventData) => {
  const { summary, description, location, startDateTime, endDateTime, createMeet, attendeeEmails } = eventData;
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

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
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    };
  }

  const response = await calendar.events.insert({
    calendarId: 'primary',
    requestBody: event,
    conferenceDataVersion: 1,
    sendUpdates: 'all',
  });

  return response.data;
};

module.exports = {
  getCalendarTokens,
  createCalendarEvent
};
