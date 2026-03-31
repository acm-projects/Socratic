# Google Meet Integration - Quick Rundown

## How to run and test it

To set it up do `cd backend` and `npm run dev`. 
To test with front end you can do `cd backend/frontend` then `npm run dev`.

---

## The Bare Files You Need to Know

### 1. `backend/services/calendarService.js`
**What it does:** This is the brain that talks to the google API to access and create events.
*   **Getting access:** It handles the secure login stuff (taking an auth code and trading it in for real access tokens).
*   **Creating the meeting:** It builds the calendar event using the info sent over, and if requested, it generates a fresh Google Meet link and attaches it to the invite.

### 2. `backend/routes/calendarRoutes.js`
**What it does:** This is like the middleman between the frontend and the `calendarService.js` file. It sets up two routes:
*   **`POST /create-tokens`**: The frontend sends a Google login code here, and the route returns the auth tokens.
*   **`POST /create-event`**: The frontend sends the event details here (like title, time, and whether to include a Meet link), and passes it to google calander to actually make the meeting.

### 3. `backend/app.js`
**What it does:** This is our backend server file its what we run with the terminal.
*   For the calendar stuff, it basically just gives directions. It tells the server, if you get any requests that have `/api/calendar/...` use `calendarRoutes.js` file to handle it.
*   You'll see it written as: `app.use('/api/calendar', require('./routes/calendarRoutes'));`

### 4. `backend/frontend/src/App.js` (Frontend)
**What it does:** This is the visual part where the user interacts. 
*   It has a checkbox tied to a `createMeet` variable. When the user checks "Add Google Meet Conference", it sends that `true` or `false` choice over to our `/create-event` backend route.

---

## Fetching Upcoming Meetings & Google Meet Links

Here is the exact breakdown of how we pull upcoming meetings (with their Google Meet links) using the stored user tokens:

### 1. `backend/services/calendarService.js` (The Code)
This file is responsible for holding the persistent `oauth2Client`, and executing the Google Calendar `events.list()` API.
-   **Token Setup**: We load the saved token from `backend/tokens.json` directly into `oauth2Client` on startup. 
-   **Fetching Logic**:
```javascript
const getUpcomingMeetings = async () => {
  // Use the authorized global oauth2Client
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  
  // Call the Google Calendar API
  const response = await calendar.events.list({
    calendarId: 'primary', // The user's main calendar
    timeMin: new Date().toISOString(), // Only grab events starting from RIGHT NOW
    maxResults: 10, // Max number of events to pull
    singleEvents: true, // Expand recurring events into single instances
    orderBy: 'startTime', // Sort chronologically
  });

  return response.data.items; // Returns the array of raw event objects
};
```

### 2. `backend/routes/calendarRoutes.js` (The Route)
This sets up our lightweight endpoint that simply triggers the `calendarService` code above:
*   **`GET /upcoming-events`**:
```javascript
router.get('/upcoming-events', async (req, res, next) => {
  try {
    const events = await calendarService.getUpcomingMeetings();
    res.send(events); // Fires the array of events straight back to the frontend!
  } catch (error) {
    next(error);
  }
});
```

### 3. `backend/frontend/src/App.js` (The UI Rendering)
Once the frontend hits our `GET /upcoming-events` route, we simply loop through the returned data. Here is the exact data structure we pull from to get the relevant meeting details:
*   **Title**: `event.summary` (The title of the meeting).
*   **Date**: `event.start.dateTime` (The timestamp).
*   **Invitees**: `event.attendees` (An array of objects representing who is invited: `[{ email: "test@test.com" }]`).
*   **Google Meet Hyperlink**: `event.hangoutLink` (This string only exists if a Meet link was attached to the event. If it isn't, the event just won't have this property).

*(You can look at `fetchUpcomingMeetings` and the `upcomingMeetings.map(...)` block inside `App.js` to see the exact barebones frontend implementation).*
