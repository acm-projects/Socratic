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
const historyRoutes = require('./backend/routes/historyRoutes')
const tutorRoutes = require('./backend/routes/tutorRoutes')
const ingestRoutes = require('./backend/routes/ingestRoutes')
const quizRoutes = require('./backend/routes/quizRoutes')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use(cors())
app.use(express.json())
app.use('/api/syllabus', syllabusRoutes)
app.use('/api/calendar', calendarRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/tutor', tutorRoutes)
app.use('/api/ingest', ingestRoutes)
app.use('/api/quizzes', quizRoutes)

app.get('/', (req, res) => {
  res.send({ message: 'Socratic API is live 🚀' })
})

// -----------------------------------------------------
// TABLE DISCOVERY
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
// XP HISTORY (Points Earned Over Time)
// -----------------------------------------------------

app.get("/users/:id/xp-history", async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30
    const userId = req.params.id

    // Get XP grouped by date from xp_system
    const result = await pool.query(
      `SELECT DATE(created_at) as date, SUM(amount) as xp_earned
       FROM xp_system
       WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '${days} days'
       GROUP BY DATE(created_at)
       ORDER BY date ASC`,
      [userId]
    )

    // Zero-fill missing days
    const xpMap = {}
    result.rows.forEach(row => {
      xpMap[row.date.toISOString().split('T')[0]] = parseInt(row.xp_earned)
    })

    const filled = []
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      filled.push({ date: dateStr, xp_earned: xpMap[dateStr] || 0 })
    }

    res.json(filled)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// CLASSES API
// -----------------------------------------------------

app.get("/classes", async (req, res) => {
  try {
    const { user_id } = req.query;
    let query = "SELECT * FROM classes";
    let params = [];
    
    if (user_id) {
      query += " WHERE user_id = $1";
      params = [user_id];
    }
    
    const result = await pool.query(query, params);
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
    const { class_code, subject, name, user_id } = req.body
    const result = await pool.query(
      "INSERT INTO classes (class_code, subject, name, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [class_code, subject, name, user_id]
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
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).json({ error: "user_id is required to delete a class" });
    }

    // 1. Delete associated topics first
    await pool.query("DELETE FROM topics WHERE class_code = $1", [req.params.code]);

    // 2. Delete the class ONLY if it belongs to this user
    const result = await pool.query(
      "DELETE FROM classes WHERE class_code = $1 AND user_id = $2 RETURNING *",
      [req.params.code, user_id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Class not found or you do not have permission to delete it" });
    }

    res.json({ message: "Class and topics deleted successfully", deletedClass: result.rows[0] })
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

const ACHIEVEMENT_LIST = [
  { id: 1, name: "First Quiz Completed", description: "Completed your first quiz", slug: "first-quiz" },
  { id: 2, name: "10 Quizzes Completed", description: "Completed 10 quizzes", slug: "ten-quizzes" },
  { id: 3, name: "First Retake Completed", description: "Completed your first retake", slug: "first-retake" },
  { id: 4, name: "20 Chat Messages Sent", description: "Sent 20 chat messages", slug: "twenty-messages" },
  { id: 5, name: "Perfect Score on a Quiz", description: "Scored 100% on a quiz", slug: "perfect-score" },
  { id: 6, name: "5 Day Study Streak", description: "Studied 5 days in a row", slug: "five-day-streak" },
  { id: 7, name: "5 Perfect Quiz Scores", description: "Scored 100% on 5 quizzes", slug: "five-perfect" },
  { id: 8, name: "10 Perfect Quiz Scores", description: "Scored 100% on 10 quizzes", slug: "ten-perfect" },
  { id: 9, name: "5 Retakes Completed", description: "Completed 5 retakes", slug: "five-retakes" },
  { id: 10, name: "10 Day Study Streak", description: "Studied 10 days in a row", slug: "ten-day-streak" },
  { id: 11, name: "First Study Session Scheduled", description: "Scheduled your first study session", slug: "first-session-scheduled" },
  { id: 12, name: "10 Perfect Score Questions", description: "Answered 10 questions perfectly", slug: "ten-perfect-questions" },
  { id: 13, name: "20 Retakes Completed", description: "Completed 20 retakes", slug: "twenty-retakes" },
  { id: 14, name: "10 Study Sessions Scheduled", description: "Scheduled 10 study sessions", slug: "ten-sessions-scheduled" },
  { id: 15, name: "30 Day Study Streak", description: "Studied 30 days in a row", slug: "thirty-day-streak" },
  { id: 16, name: "20 Perfect Score Questions", description: "Answered 20 questions perfectly", slug: "twenty-perfect-questions" },
  { id: 17, name: "100 Chat Messages Sent", description: "Sent 100 chat messages", slug: "hundred-messages" },
  { id: 18, name: "50 Perfect Score Questions", description: "Answered 50 questions perfectly", slug: "fifty-perfect-questions" },
  { id: 19, name: "50 Day Study Streak", description: "Studied 50 days in a row", slug: "fifty-day-streak" },
  { id: 20, name: "20 Study Sessions Scheduled", description: "Scheduled 20 study sessions", slug: "twenty-sessions-scheduled" },
]

app.get("/achievements", async (req, res) => {
  try {
    res.json(ACHIEVEMENT_LIST)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/users/:id/achievements", async (req, res) => {
  try {
    const userId = req.params.id

    const userResult = await pool.query('SELECT first_name, last_name FROM "User" WHERE id = $1', [userId])
    const user = userResult.rows[0]
    const userName = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : ''

    const earnedResult = await pool.query(
      "SELECT achievement_id, earned_at FROM user_achievements WHERE user_id = $1",
      [userId]
    )

    const earnedMap = {}
    earnedResult.rows.forEach(row => {
      earnedMap[row.achievement_id] = row.earned_at
    })

    const achievements = ACHIEVEMENT_LIST.map(a => ({
      id: String(a.id),
      name: a.name,
      description: a.description,
      slug: a.slug,
      unlocked: !!earnedMap[String(a.id)],
      unlocked_at: earnedMap[String(a.id)] || null,
      user_name: userName
    }))

    res.json(achievements)
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
// HEATMAP METRICS
// -----------------------------------------------------

// Overall heatmap — all classes for a user
app.get("/users/:id/metrics", async (req, res) => {
  try {
    const userId = req.params.id
    const days = parseInt(req.query.days) || 30

    const result = await pool.query(
      `SELECT metric_date as date, SUM(questions_asked) as questions_asked, AVG(avg_score) as avg_score
       FROM daily_topic_metrics
       WHERE user_id = $1 AND metric_date >= NOW() - INTERVAL '${days} days'
       GROUP BY metric_date
       ORDER BY metric_date ASC`,
      [userId]
    )

    // Zero-fill missing days
    const dataMap = {}
    result.rows.forEach(row => {
      dataMap[row.date.toISOString().split('T')[0]] = {
        questions_asked: parseInt(row.questions_asked) || 0,
        avg_score: parseFloat(row.avg_score) || 0
      }
    })

    const filled = []
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      filled.push({
        date: dateStr,
        questions_asked: dataMap[dateStr]?.questions_asked || 0,
        avg_score: dataMap[dateStr]?.avg_score || 0
      })
    }

    res.json(filled)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Per class heatmap
app.get("/classes/:code/metrics", async (req, res) => {
  try {
    const classCode = req.params.code
    const days = parseInt(req.query.days) || 30
    const userId = req.query.user_id

    const result = await pool.query(
      `SELECT metric_date as date, SUM(questions_asked) as questions_asked, AVG(avg_score) as avg_score
       FROM daily_topic_metrics
       WHERE class_code = $1 AND user_id = $2 AND metric_date >= NOW() - INTERVAL '${days} days'
       GROUP BY metric_date
       ORDER BY metric_date ASC`,
      [classCode, userId]
    )

    const dataMap = {}
    result.rows.forEach(row => {
      dataMap[row.date.toISOString().split('T')[0]] = {
        questions_asked: parseInt(row.questions_asked) || 0,
        avg_score: parseFloat(row.avg_score) || 0
      }
    })

    const filled = []
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      filled.push({
        date: dateStr,
        questions_asked: dataMap[dateStr]?.questions_asked || 0,
        avg_score: dataMap[dateStr]?.avg_score || 0
      })
    }

    res.json(filled)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// CLASS DISTRIBUTION (Engagement pie chart)
// -----------------------------------------------------

app.get("/users/:id/engagement/class-distribution", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT class_name, SUM(question_count) as question_count
       FROM class_engagement
       WHERE user_id = $1
       GROUP BY class_name
       ORDER BY question_count DESC`,
      [req.params.id]
    )
    res.json(result.rows.map(row => ({
      class_name: row.class_name,
      question_count: parseInt(row.question_count)
    })))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
app.post("/class-engagement", async (req, res) => {
  try {
    const { user_id, class_name, question_count, week_start } = req.body
    const id = randomUUID()
    const result = await pool.query(
      `INSERT INTO class_engagement (id, user_id, class_name, question_count, week_start)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, class_name, week_start)
       DO UPDATE SET question_count = class_engagement.question_count + EXCLUDED.question_count
       RETURNING *`,
      [id, user_id, class_name, question_count || 1, week_start || new Date()]
    )
    res.json(result.rows[0])
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

    const senderResult = await pool.query('SELECT id FROM "User" WHERE email = $1', [sender_email])
    const receiverResult = await pool.query('SELECT id FROM "User" WHERE email = $1', [receiver_email])

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
// QUIZZES API
// -----------------------------------------------------

app.get("/users/:id/quizzes", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM quizzes WHERE user_id = $1 ORDER BY date DESC",
      [req.params.id]
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get("/quizzes/:id/questions", async (req, res) => {
  try {
    const quiz = await pool.query("SELECT * FROM quizzes WHERE id = $1", [req.params.id])
    const questions = await pool.query("SELECT * FROM quiz_questions WHERE quiz_id = $1", [req.params.id])
    if (!quiz.rows[0]) {
      return res.status(404).json({ error: "Quiz not found" })
    }
    res.json({ ...quiz.rows[0], questions: questions.rows })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/quizzes", async (req, res) => {
  try {
    const { id, user_id, topic_id, score, date, retake_count, questions } = req.body

    const quiz = await pool.query(
      "INSERT INTO quizzes (id, user_id, topic_id, score, date, retake_count) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, user_id, topic_id, score, date || new Date(), retake_count || 0]
    )

    const savedQuestions = []
    if (Array.isArray(questions)) {
      for (const q of questions) {
        const savedQ = await pool.query(
          "INSERT INTO quiz_questions (id, quiz_id, question, user_answer, correct_answer, is_correct, depth_score) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
          [q.id, id, q.question, q.user_answer, q.correct_answer, q.is_correct, q.depth_score || 0]
        )
        savedQuestions.push(savedQ.rows[0])
      }
    }

    res.json({ ...quiz.rows[0], questions: savedQuestions })
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
