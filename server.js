require('dotenv').config()

const { randomUUID } = require("crypto")

const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

const app = express()
const PORT = 5000

const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('./swagger.json')
const syllabusRoutes = require('./backend/routes/syllabusRoutes')
const calendarRoutes = require('./backend/routes/calendarRoutes')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use(cors())
app.use(express.json())
app.use('/', syllabusRoutes)
app.use('/api/calendar', calendarRoutes)

app.get('/', (req, res) => {
  res.send({ message: 'Socratic API is live 🚀' })
})

// -----------------------------------------------------
// TABLE DISCOVERY — hit /tables to see all table names
// -----------------------------------------------------

app.get("/tables", async (req, res) => {
  try {
    const result = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// USERS API
// -----------------------------------------------------

app.get("/users", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "User"')
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/users/:id", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "User" WHERE id = $1', [req.params.id])
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/users", async (req, res) => {
  try {
    const { id, email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak } = req.body
    const result = await pool.query(
      'INSERT INTO "User" (id, email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *',
      [id, email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put("/users/:id", async (req, res) => {
  try {
    const { email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak } = req.body
    const result = await pool.query(
      'UPDATE "User" SET email = $1, total_xp = $2, weekly_xp = $3, image = $4, first_name = $5, last_name = $6, school = $7, major = $8, class_status = $9, streak = $10 WHERE id = $11 RETURNING *',
      [email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak, req.params.id]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete("/users/:id", async (req, res) => {
  try {
    await pool.query('DELETE FROM "User" WHERE id = $1', [req.params.id])
    res.json({ message: "User deleted" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// CLASSES API
// -----------------------------------------------------

app.get("/classes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM classes")
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/classes/:code", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM classes WHERE class_code = $1", [req.params.code])
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/classes", async (req, res) => {
  try {
    const { class_code, subject, name } = req.body

    const result = await pool.query(
      "INSERT INTO classes (class_code, subject, name) VALUES ($1, $2, $3) RETURNING *",
      [class_code, subject, name]
    )

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
app.put("/classes/:code", async (req, res) => {
  try {
    const { subject, name } = req.body

    const result = await pool.query(
      "UPDATE classes SET subject = $1, name = $2 WHERE class_code = $3 RETURNING *",
      [subject, name, req.params.code]
    )

    if (!result.rows[0]) {
      return res.status(404).json({ error: "Class not found" })
    }

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete("/classes/:code", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM classes WHERE class_code = $1 RETURNING *",
      [req.params.code]
    )

    if (!result.rows[0]) {
      return res.status(404).json({ error: "Class not found" })
    }

    res.json({ message: "Class deleted successfully", deletedClass: result.rows[0] })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// TOPICS API
// -----------------------------------------------------

app.get("/classes/:code/topics", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM topics WHERE class_code = $1", [req.params.code])
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/topics/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM topics WHERE id = $1", [req.params.id])
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/topics", async (req, res) => {
  try {
    const { id, class_code, name } = req.body
    const result = await pool.query(
      "INSERT INTO topics (id, class_code, name) VALUES ($1, $2, $3) RETURNING *",
      [id, class_code, name]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// CHAT SESSIONS API
// -----------------------------------------------------

app.get("/users/:id/sessions", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM chat_sessions WHERE user_id = $1", [req.params.id])
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/sessions", async (req, res) => {
  try {
    const { session_id, class_code, user_id, topic_id } = req.body
    const result = await pool.query(
      "INSERT INTO chat_sessions (session_id, class_code, user_id, topic_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [session_id, class_code, user_id, topic_id]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/sessions/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM chat_sessions WHERE session_id = $1", [req.params.id])
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// ACHIEVEMENTS API
// -----------------------------------------------------

app.get("/achievements", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM achievements")
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/users/:id/achievements", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM user_achievements WHERE user_id = $1", [req.params.id])
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// USER STATS
// -----------------------------------------------------

app.get("/users/:id/stats", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM xp_system WHERE user_id = $1", [req.params.id])
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/topics/:id/metrics", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM daily_topic_metrics WHERE topic_id = $1", [req.params.id])
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// OAUTH ACCOUNTS
// -----------------------------------------------------

app.get("/users/:id/accounts", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Account" WHERE "userId" = $1', [req.params.id])
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/accounts", async (req, res) => {
  try {
    const { userId, provider, providerAccountId, access_token, refresh_token, type } = req.body
    const result = await pool.query(
      'INSERT INTO "Account" ("userId", provider, "providerAccountId", access_token, refresh_token, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, provider, providerAccountId, access_token, refresh_token, type]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/accounts/:provider/:providerAccountId", async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "Account" WHERE provider = $1 AND "providerAccountId" = $2',
      [req.params.provider, req.params.providerAccountId]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put("/accounts/:provider/:providerAccountId", async (req, res) => {
  try {
    const { access_token, refresh_token } = req.body
    const result = await pool.query(
      'UPDATE "Account" SET access_token = $1, refresh_token = $2 WHERE provider = $3 AND "providerAccountId" = $4 RETURNING *',
      [access_token, refresh_token, req.params.provider, req.params.providerAccountId]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.delete("/accounts/:provider/:providerAccountId", async (req, res) => {
  try {
    await pool.query(
      'DELETE FROM "Account" WHERE provider = $1 AND "providerAccountId" = $2',
      [req.params.provider, req.params.providerAccountId]
    )
    res.json({ message: "Account unlinked" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// FRIENDS API
// -----------------------------------------------------

app.get("/users/:id/friends", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM friends WHERE user_id = $1", [req.params.id])
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/friends", async (req, res) => {
  try {
    const { user_id, friend_id, first_name, last_name, streak, total_xp } = req.body
    const result = await pool.query(
      "INSERT INTO friends (user_id, friend_id, first_name, last_name, streak, total_xp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [user_id, friend_id, first_name, last_name, streak, total_xp]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/users/:id/friend-requests", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM friend_requests WHERE receiver_id = $1",
      [req.params.id]
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/friend-requests", async (req, res) => {
  try {
    const { sender_email, receiver_email, status } = req.body

    if (!sender_email || !receiver_email) {
      return res.status(400).json({ error: "sender_email and receiver_email are required" })
    }

    const senderResult = await pool.query(
      'SELECT id FROM "User" WHERE email = $1',
      [sender_email]
    )

    const receiverResult = await pool.query(
      'SELECT id FROM "User" WHERE email = $1',
      [receiver_email]
    )

    const sender = senderResult.rows[0]
    const receiver = receiverResult.rows[0]

    if (!sender || !receiver) {
      return res.status(404).json({ error: "Sender or receiver not found" })
    }

    const id = randomUUID()

    const result = await pool.query(
      "INSERT INTO friend_requests (id, sender_id, receiver_id, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, sender.id, receiver.id, status || "pending"]
    )

    res.json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

app.put("/friend-requests/:id", async (req, res) => {
  try {
    const { status } = req.body
    const result = await pool.query(
      "UPDATE friend_requests SET status = $1 WHERE id = $2 RETURNING *",
      [status, req.params.id]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// SERVER START
// -----------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})