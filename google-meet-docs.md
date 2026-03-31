# Google Meet Integration - Quick Rundown

Hey! Here's a simple walkthrough of our Google Meet integration, the routes, and the core files that make it work.

## How to run and test it

To set it up do `cd backend` and `npm run dev`. 
To test with front end you can do `cd backend/frontend` then `npm run dev`.

---

## The Bare Files You Need to Know

### 1. `backend/services/calendarService.js`
**What it does:** This is the brains of the operation. It's the file that actually talks to Google's API. 
*   **Getting access:** It handles the secure login stuff (taking an auth code and trading it in for real access tokens).
*   **Creating the meeting:** It builds the calendar event using the info sent over, and if requested, it generates a fresh Google Meet link and attaches it to the invite.

### 2. `backend/routes/calendarRoutes.js`
**What it does:** This acts as the middleman between our frontend and the `calendarService.js` file. It sets up two main routes:
*   **`POST /create-tokens`**: The frontend sends a Google login code here, and this route asks the service to grab the real auth tokens.
*   **`POST /create-event`**: The frontend sends the event details here (like title, time, and whether to include a Meet link), and this route passes it to the service to actually book the meeting.

### 3. `backend/app.js`
**What it does:** This is our main server setup file. 
*   For the calendar stuff, it basically just gives directions. It tells the server, *"Hey, if you get any requests that start with `/api/calendar/...`, go use the `calendarRoutes.js` file to handle it."*
*   You'll see it written as: `app.use('/api/calendar', require('./routes/calendarRoutes'));`

### 4. `backend/frontend/src/App.js` (Frontend)
**What it does:** This is the visual part where the user interacts. 
*   It has a checkbox tied to a `createMeet` variable. When the user checks "Add Google Meet Conference", it sends that `true` or `false` choice over to our `/create-event` backend route!

---
That's pretty much it! The frontend asks the `routes`, the `routes` ask the `service`, and the `service` talks to Google. Let me know if you need me to clarify anything!
