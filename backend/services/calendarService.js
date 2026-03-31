const { google } = require("googleapis");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const TOKEN_PATH = path.join(__dirname, '..', 'tokens.json');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'postmessage'
);

try {
  if (fs.existsSync(TOKEN_PATH)) {
    const tokens = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf8'));
    oauth2Client.setCredentials(tokens);
  }
} catch (err) {
  console.error("Error loading tokens.json:", err.message);
}

const getCalendarTokens = async (code) => {
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
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
    extendedProperties: {
      private: {
        createdBy: 'socraticApp'
      }
    }
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

const formatEvent = (event) => ({
  id: event.id,
  summary: event.summary || "Untitled Event",
  description: event.description || "",
  location: event.location || "",
  start: event.start,
  end: event.end,
  attendees: event.attendees ? event.attendees.map(a => ({ email: a.email })) : [],
  hangoutLink: event.hangoutLink || null,
});

const getUpcomingMeetings = async () => {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
    privateExtendedProperty: 'createdBy=socraticApp'
  });

  return (response.data.items || []).map(formatEvent);
};

const getEvents = async (timeMin, timeMax, maxResults = 100) => {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  const options = {
    calendarId: 'primary',
    singleEvents: true,
    orderBy: 'startTime',
    maxResults,
    privateExtendedProperty: 'createdBy=socraticApp'
  };

  if (timeMin) options.timeMin = new Date(timeMin).toISOString();
  if (timeMax) options.timeMax = new Date(timeMax).toISOString();

  const response = await calendar.events.list(options);
  return (response.data.items || []).map(formatEvent);
};

const clearSocraticEvents = async () => {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  // Find all events created by app
  const response = await calendar.events.list({
    calendarId: 'primary',
    privateExtendedProperty: 'createdBy=socraticApp',
  });
  
  const events = response.data.items;
  if (!events || events.length === 0) return { deletedCount: 0 };

  let deletedCount = 0;
  for (const event of events) {
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: event.id
    });
    deletedCount++;
  }
  
  return { deletedCount };
};

module.exports = {
  getCalendarTokens,
  createCalendarEvent,
  getUpcomingMeetings,
  getEvents,
  clearSocraticEvents
};
