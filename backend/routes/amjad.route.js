const express = require("express")
const cors = require("cors")
const { PrismaPg } = require("@prisma/adapter-pg")
const { PrismaClient } = require("@prisma/client")

// Connect Prisma to PostgreSQL using the DATABASE_URL environment variable
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

const app = express.Router()

// -----------------------------------------------------
// USERS API
// Handles creating, reading, updating, and deleting users
// -----------------------------------------------------

// Get every user in the database — used for admin views or leaderboards
app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get a single user by their ID — used to load a user's profile
app.get("/users/:id", async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id }
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Create a new user — called when someone signs up for the first time
app.post("/users", async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Update an existing user's data — used for profile edits or XP updates
app.put("/users/:id", async (req, res) => {
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

// Delete a user and all their related data (cascades in the DB)
app.delete("/users/:id", async (req, res) => {
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
// A class represents a subject/course (e.g. "AP Biology")
// Topics belong to classes, and chat sessions are tied to both
// -----------------------------------------------------

// Get all available classes — used to populate a class selection screen
app.get("/classes", async (req, res) => {
    try {
        const classes = await prisma.classes.findMany()
        res.json(classes)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get a single class by its class_code — used when loading a class detail page
app.get("/classes/:code", async (req, res) => {
    try {
        const classData = await prisma.classes.findUnique({
            where: { class_code: req.params.code }
        })
        res.json(classData)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Create a new class — used by admins or teachers to add a new course
app.post("/classes", async (req, res) => {
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
// Topics are specific units/chapters within a class
// (e.g. "Photosynthesis" inside "AP Biology")
// Chat sessions are tied to a specific topic
// -----------------------------------------------------

// Get all topics for a specific class — used to show the topic list for a course
app.get("/classes/:code/topics", async (req, res) => {
    try {
        const topics = await prisma.topics.findMany({
            where: { class_code: req.params.code }
        })
        res.json(topics)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get a single topic by ID — used when loading a specific study session
app.get("/topics/:id", async (req, res) => {
    try {
        const topic = await prisma.topics.findUnique({
            where: { id: req.params.id }
        })
        res.json(topic)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Create a new topic inside a class — used by admins or teachers
app.post("/topics", async (req, res) => {
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
// A chat session is one study conversation between a user and the AI
// Each session is linked to a user, a class, and a specific topic
// -----------------------------------------------------

// Get all chat sessions for a user — used to show their study history
app.get("/users/:id/sessions", async (req, res) => {
    try {
        const sessions = await prisma.chat_sessions.findMany({
            where: { user_id: req.params.id }
        })
        res.json(sessions)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Start a new chat session — called when a user begins studying a topic
app.post("/sessions", async (req, res) => {
    try {
        const session = await prisma.chat_sessions.create({
            data: req.body
        })
        res.json(session)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get a single session by ID — used to resume or review a past session
app.get("/sessions/:id", async (req, res) => {
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
// Achievements are badges/rewards users earn for hitting milestones
// (e.g. "Studied 7 days in a row" or "Scored 100% on a topic")
// -----------------------------------------------------

// Get all possible achievements — used to show the full achievements list
app.get("/achievements", async (req, res) => {
    try {
        const achievements = await prisma.achievements.findMany()
        res.json(achievements)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get achievements a specific user has earned — used on their profile page
app.get("/users/:id/achievements", async (req, res) => {
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
// USER STATS
// Tracks XP earned and daily performance scores per topic
// Used for progress dashboards, leaderboards, and streaks
// -----------------------------------------------------

// Get a user's full XP history — each row is an XP earning event (e.g. completing a session)
app.get("/users/:id/stats", async (req, res) => {
    try {
        const stats = await prisma.xp_system.findMany({
            where: { user_id: req.params.id }
        })
        res.json(stats)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get daily performance metrics for a topic — used to show score trends over time
app.get("/topics/:id/metrics", async (req, res) => {
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
// OAUTH ACCOUNTS
// Stores linked OAuth providers for a user (e.g. Google, GitHub)
// The Account table uses a composite PK of [provider, providerAccountId]
// so there is no single :id — routes use both fields to identify a record
// -----------------------------------------------------

// Get all OAuth accounts linked to a user — used on account settings page
app.get("/users/:id/accounts", async (req, res) => {
    try {
        const accounts = await prisma.account.findMany({
            where: { userId: req.params.id }
        })
        res.json(accounts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Link a new OAuth account to a user — called after a successful OAuth login
app.post("/accounts", async (req, res) => {
    try {
        const account = await prisma.account.create({
            data: req.body
        })
        res.json(account)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get a specific linked account using provider + providerAccountId as the unique key
app.get("/accounts/:provider/:providerAccountId", async (req, res) => {
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

// Update an account's tokens — called when an OAuth access/refresh token is refreshed
app.put("/accounts/:provider/:providerAccountId", async (req, res) => {
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

// Unlink (delete) an OAuth account — called when a user disconnects a provider
app.delete("/accounts/:provider/:providerAccountId", async (req, res) => {
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
// Users can add each other as friends
// friend_requests tracks pending/accepted/rejected requests
// friends is the confirmed friendship table (both directions stored)
// -----------------------------------------------------

// Get a user's confirmed friends list — used on their profile/social page
app.get("/users/:id/friends", async (req, res) => {
    try {
        const friends = await prisma.friends.findMany({
            where: { user_id: req.params.id }
        })
        res.json(friends)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Get incoming friend requests for a user — used to show a notification/pending list
app.get("/users/:id/friend-requests", async (req, res) => {
    try {
        const requests = await prisma.friend_requests.findMany({
            where: { receiver_id: req.params.id }
        })
        res.json(requests)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Send a friend request — called when a user clicks "Add Friend"
app.post("/friend-requests", async (req, res) => {
    try {
        const request = await prisma.friend_requests.create({
            data: req.body
        })
        res.json(request)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Accept or reject a friend request — update the status field to "accepted" or "rejected"
app.put("/friend-requests/:id", async (req, res) => {
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


// -----------------------------------------------------
// SERVER START
// -----------------------------------------------------

module.exports = app;
