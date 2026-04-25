const { google } = require("googleapis");
const crypto = require("crypto");
const accountModel = require("../models/accountModel");

const getOAuth2Client = (redirectUri = 'postmessage') => new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUri
);

// Typed error for expired/revoked Google tokens so routes can return clean 401s
class ReauthRequiredError extends Error {
  constructor(userId) {
    super(`Google authorization expired or revoked for user ${userId}. Please sign in with Google again.`);
    this.name = 'ReauthRequiredError';
    this.code = 'reauth_required';
  }
}

// Returns true for any Google OAuth error that means "re-authorize this user"
const isReauthError = (err) => {
  const msg = err?.message || '';
  return msg.includes('invalid_grant') || msg.includes('Token has been expired or revoked');
};

const getClientForUser = async (userId) => {
  const accounts = await accountModel.getAccountsByUserId(userId);
  const googleAccount = accounts.find(acc => acc.provider === 'google');

  if (!googleAccount) {
    throw new Error(`No Google account found for user ${userId}`);
  }

  if (!googleAccount.refresh_token) {
    throw new ReauthRequiredError(userId);
  }

  const client = getOAuth2Client();
  client.setCredentials({
    access_token:  googleAccount.access_token,
    refresh_token: googleAccount.refresh_token,
    token_type:    googleAccount.type || 'Bearer',
  });

  // Persist refreshed tokens back to DB so they stay fresh
  client.on('tokens', async (newTokens) => {
    console.log(`[Calendar] Tokens auto-refreshed for user ${userId}`);
    await accountModel.updateAccountTokens(
      'google',
      googleAccount.providerAccountId,
      newTokens.access_token,
      newTokens.refresh_token || googleAccount.refresh_token
    );
  });

  return client;
};

const getCalendarTokens = async (code, redirectUri) => {
  const client = getOAuth2Client(redirectUri);
  const { tokens } = await client.getToken(code);
  return tokens;
};

const createCalendarEvent = async (userId, eventData) => { //create calendar event 
  const { summary, description, location, startDateTime, endDateTime, createMeet, attendeeEmails } = eventData;
  const auth = await getClientForUser(userId);
  const calendar = google.calendar({ version: 'v3', auth });

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
  type: 'meeting',
});

const getUpcomingMeetings = async (userId) => {
  const auth = await getClientForUser(userId);
  const calendar = google.calendar({ version: 'v3', auth });

  // Get the user's own email address to use for attendee filtering
  const oauth2 = google.oauth2({ version: 'v2', auth });
  const { data: profile } = await oauth2.userinfo.get();
  const userEmail = profile.email;

  const timeMin = new Date().toISOString();
  const sharedParams = {
    calendarId: 'primary',
    timeMin,
    maxResults: 20,
    singleEvents: true,
    orderBy: 'startTime',
  };

  // ── Query 1: Events this user ORGANIZED (Socratic-created) ──────────────
  const organizedRes = await calendar.events.list({
    ...sharedParams,
    privateExtendedProperty: 'createdBy=socraticApp',
  });
  const organizedEvents = (organizedRes.data.items || []).map(e => ({
    ...formatEvent(e),
    source: 'organizer',
  }));

  // ── Query 2: Events this user is an ATTENDEE of ──────────────────────────
  // Google Calendar API supports filtering by attendee email via the `q` param.
  // We also filter for events that have conference data (meetings) to match the
  // same spirit as the original organizer query (Socratic meetings).
  const attendeeRes = await calendar.events.list({
    ...sharedParams,
    q: userEmail,  // Google searches attendees, summary, description, etc.
  });

  // Filter down to events where:
  //  - The user is explicitly listed as an attendee (Google marks their entry with self:true)
  //  - AND they are NOT the organizer (organizer events are already covered by query 1)
  const attendeeEvents = (attendeeRes.data.items || [])
    .filter(e =>
      e.organizer?.self !== true &&          // not the organizer (avoid dup with query 1)
      Array.isArray(e.attendees) &&
      e.attendees.some(a => a.self === true) // self:true = the authenticated user's own attendee entry
    )
    .map(e => ({
      ...formatEvent(e),
      source: 'attendee',
    }));

  // ── Merge & deduplicate by event ID ─────────────────────────────────────
  // Organizer events take priority (they have the fullest metadata)
  const seen = new Set(organizedEvents.map(e => e.id));
  const merged = [...organizedEvents];
  for (const event of attendeeEvents) {
    if (!seen.has(event.id)) {
      seen.add(event.id);
      merged.push(event);
    }
  }

  // Re-sort by start time after merge (both queries returned sorted, but merged order may drift)
  merged.sort((a, b) => {
    const aTime = a.start?.dateTime || a.start?.date || '';
    const bTime = b.start?.dateTime || b.start?.date || '';
    return aTime.localeCompare(bTime);
  });

  // Trim to 10 most upcoming after merge
  return merged.slice(0, 10);
};

const getEvents = async (userId, timeMin, timeMax, maxResults = 100) => {
  const auth = await getClientForUser(userId);
  const calendar = google.calendar({ version: 'v3', auth });

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

const clearSocraticEvents = async (userId) => {
  const auth = await getClientForUser(userId);
  const calendar = google.calendar({ version: 'v3', auth });

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
  clearSocraticEvents,
  ReauthRequiredError,
  isReauthError
};
