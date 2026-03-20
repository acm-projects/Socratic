const router = require('express').Router();
const crypto = require('crypto');
const { google } = require('googleapis');

// Initialize Prisma
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("@prisma/client");

// We safely initialize Prisma. If DATABASE_URL is missing, Prisma will throw an error when queried,
// but the server itself will still boot up correctly.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL || 'postgresql://dummy:password@localhost:5432/dummy' });
const prisma = new PrismaClient({ adapter });

// Initialize Google OAuth
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  'postmessage' // <-- THIS IS MANDATORY FOR REACT POPUPS
);

// -----------------------------------------------------
// HEALTH CHECK
// -----------------------------------------------------
router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok combined api is working 🚀' });
});

// -----------------------------------------------------
// GOOGLE CALENDAR API
// -----------------------------------------------------

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

// -----------------------------------------------------
// USERS API (PRISMA)
// -----------------------------------------------------

router.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/users/:id", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id }
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/users", async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put("/users/:id", async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { id: req.params.id },
            data: req.body
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete("/users/:id", async (req, res) => {
    try {
        await prisma.user.delete({
            where: { id: req.params.id }
        })
        res.json({ message: "User deleted" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// -----------------------------------------------------
// CLASSES API
// -----------------------------------------------------

router.get("/classes", async (req, res) => {
    try {
        const classes = await prisma.classes.findMany()
        res.json(classes)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/classes/:code", async (req, res) => {
    try {
        const classData = await prisma.classes.findUnique({
            where: { class_code: req.params.code }
        })
        res.json(classData)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/classes", async (req, res) => {
    try {
        const newClass = await prisma.classes.create({
            data: req.body
        })
        res.json(newClass)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// -----------------------------------------------------
// TOPICS API
// -----------------------------------------------------

router.get("/classes/:code/topics", async (req, res) => {
    try {
        const topics = await prisma.topics.findMany({
            where: { class_code: req.params.code }
        })
        res.json(topics)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/topics/:id", async (req, res) => {
    try {
        const topic = await prisma.topics.findUnique({
            where: { id: req.params.id }
        })
        res.json(topic)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/topics", async (req, res) => {
    try {
        const topic = await prisma.topics.create({
            data: req.body
        })
        res.json(topic)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// -----------------------------------------------------
// CHAT SESSIONS API
// -----------------------------------------------------

router.get("/users/:id/sessions", async (req, res) => {
    try {
        const sessions = await prisma.chat_sessions.findMany({
            where: { user_id: req.params.id }
        })
        res.json(sessions)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/sessions", async (req, res) => {
    try {
        const session = await prisma.chat_sessions.create({
            data: req.body
        })
        res.json(session)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/sessions/:id", async (req, res) => {
    try {
        const session = await prisma.chat_sessions.findUnique({
            where: { session_id: req.params.id }
        })
        res.json(session)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// -----------------------------------------------------
// ACHIEVEMENTS API
// -----------------------------------------------------

router.get("/achievements", async (req, res) => {
    try {
        const achievements = await prisma.achievements.findMany()
        res.json(achievements)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/users/:id/achievements", async (req, res) => {
    try {
        const achievements = await prisma.user_achievements.findMany({
            where: { user_id: req.params.id }
        })
        res.json(achievements)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// -----------------------------------------------------
// USER STATS API
// -----------------------------------------------------

router.get("/users/:id/stats", async (req, res) => {
    try {
        const stats = await prisma.xp_system.findMany({
            where: { user_id: req.params.id }
        })
        res.json(stats)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/topics/:id/metrics", async (req, res) => {
    try {
        const metrics = await prisma.daily_topic_metrics.findMany({
            where: { topic_id: req.params.id }
        })
        res.json(metrics)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// -----------------------------------------------------
// OAUTH ACCOUNTS API
// -----------------------------------------------------

router.get("/users/:id/accounts", async (req, res) => {
    try {
        const accounts = await prisma.account.findMany({
            where: { userId: req.params.id }
        })
        res.json(accounts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/accounts", async (req, res) => {
    try {
        const account = await prisma.account.create({
            data: req.body
        })
        res.json(account)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/accounts/:provider/:providerAccountId", async (req, res) => {
    try {
        const account = await prisma.account.findUnique({
            where: {
                provider_providerAccountId: {
                    provider: req.params.provider,
                    providerAccountId: req.params.providerAccountId
                }
            }
        })
        res.json(account)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put("/accounts/:provider/:providerAccountId", async (req, res) => {
    try {
        const account = await prisma.account.update({
            where: {
                provider_providerAccountId: {
                    provider: req.params.provider,
                    providerAccountId: req.params.providerAccountId
                }
            },
            data: req.body
        })
        res.json(account)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.delete("/accounts/:provider/:providerAccountId", async (req, res) => {
    try {
        await prisma.account.delete({
            where: {
                provider_providerAccountId: {
                    provider: req.params.provider,
                    providerAccountId: req.params.providerAccountId
                }
            }
        })
        res.json({ message: "Account unlinked" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// -----------------------------------------------------
// FRIENDS API
// -----------------------------------------------------

router.get("/users/:id/friends", async (req, res) => {
    try {
        const friends = await prisma.friends.findMany({
            where: { user_id: req.params.id }
        })
        res.json(friends)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get("/users/:id/friend-requests", async (req, res) => {
    try {
        const requests = await prisma.friend_requests.findMany({
            where: { receiver_id: req.params.id }
        })
        res.json(requests)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.post("/friend-requests", async (req, res) => {
    try {
        const request = await prisma.friend_requests.create({
            data: req.body
        })
        res.json(request)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.put("/friend-requests/:id", async (req, res) => {
    try {
        const request = await prisma.friend_requests.update({
            where: { id: req.params.id },
            data: req.body
        })
        res.json(request)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router;