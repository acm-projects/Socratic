require('dotenv').config()
require('dotenv').config({ path: __dirname + '/backend/.env', override: false })

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
const classRoutes = require('./backend/routes/classRoutes')
const userRoutes = require('./backend/routes/userRoutes')
const topicRoutes = require('./backend/routes/topicRoutes')
const chatSessionRoutes = require('./backend/routes/chatSessionRoutes')
const achievementRoutes = require('./backend/routes/achievementRoutes')
const userStatsRoutes = require('./backend/routes/userStatsRoutes')
const accountRoutes = require('./backend/routes/accountRoutes')
const friendRoutes = require('./backend/routes/friendRoutes')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.use(cors())
app.use(express.json())
app.use('/api/syllabus', syllabusRoutes)
app.use('/api/calendar', calendarRoutes)
app.use('/api/history', historyRoutes)
app.use('/api/tutor', tutorRoutes)
app.use('/api/ingest', ingestRoutes)
app.use('/api/quizzes', quizRoutes)
app.use('/api/classes', classRoutes)
app.use('/api/users', userRoutes)
app.use('/api/topics', topicRoutes)
app.use('/api/sessions', chatSessionRoutes)
app.use('/api/achievements', achievementRoutes)
app.use('/api/stats', userStatsRoutes)
app.use('/api/accounts', accountRoutes)
app.use('/api/friends', friendRoutes)

app.get('/', (req, res) => {
  res.send({ message: 'Socratic API is live 🚀' })
})

// -----------------------------------------------------
// CLASS STREAK HELPER
// -----------------------------------------------------

const updateClassStreak = async (class_code, user_id) => {
  try {
    const today = new Date().toISOString().split('T')[0]

    const classResult = await pool.query(
      "SELECT streak, last_activity_date FROM classes WHERE class_code = $1 AND user_id = $2",
      [class_code, user_id]
    )

    if (!classResult.rows[0]) return

    const { streak, last_activity_date } = classResult.rows[0]
    const lastDate = last_activity_date ? new Date(last_activity_date).toISOString().split('T')[0] : null

    if (lastDate === today) {
      // Already studied today, no change
      return
    }

    let newStreak = 1
    if (lastDate) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayStr = yesterday.toISOString().split('T')[0]
      if (lastDate === yesterdayStr) {
        // Studied yesterday, increment
        newStreak = (streak || 0) + 1
      }
      // else missed a day, reset to 1
    }

    await pool.query(
      "UPDATE classes SET streak = $1, last_activity_date = $2 WHERE class_code = $3 AND user_id = $4",
      [newStreak, today, class_code, user_id]
    )
  } catch (err) {
    console.error('[ClassStreak] Failed to update:', err.message)
  }
}


// -----------------------------------------------------
// HEATMAP AUTO-UPDATE HELPER
// Called when: user chats (POST /sessions) or takes a quiz (POST /quizzes)
// Upserts a row in daily_topic_metrics for today
// -----------------------------------------------------

const updateHeatmap = async (user_id, topic_id, class_code, score) => {
  try {
    const today = new Date().toISOString().split('T')[0]
    const numericScore = score !== undefined && score !== null ? parseFloat(score) / 20 : null // convert 0-100 to 0-5 scale

    await pool.query(
      `INSERT INTO daily_topic_metrics (user_id, topic_id, class_code, metric_date, questions_asked, avg_score)
       VALUES ($1, $2, $3, $4, 1, $5)
       ON CONFLICT (user_id, topic_id, metric_date)
       DO UPDATE SET
         questions_asked = daily_topic_metrics.questions_asked + 1,
         avg_score = CASE
           WHEN $5 IS NOT NULL THEN ROUND(((daily_topic_metrics.avg_score * daily_topic_metrics.questions_asked) + $5) / (daily_topic_metrics.questions_asked + 1), 2)
           ELSE daily_topic_metrics.avg_score
         END`,
      [user_id, topic_id, class_code, today, numericScore]
    )
  } catch (err) {
    console.error('[Heatmap] Failed to update:', err.message)
  }
}

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
    const userId = req.params.id

    const userResult = await pool.query('SELECT * FROM "User" WHERE id = $1', [userId])
    if (!userResult.rows[0]) {
      return res.status(404).json({ error: "User not found" })
    }
    const user = userResult.rows[0]

    const friendCount = await pool.query(
      "SELECT COUNT(*) FROM friends WHERE user_id = $1",
      [userId]
    )

    const achievementCount = await pool.query(
      "SELECT COUNT(*) FROM user_achievements WHERE user_id = $1",
      [userId]
    )

    res.json({
      ...user,
      friend_count: parseInt(friendCount.rows[0].count),
      achievement_count: parseInt(achievementCount.rows[0].count)
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/users", async (req, res) => {
  try {
    const { id, email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak } = req.body
    
    // UPSERT: Catch conflict on EMAIL rather than ID. 
    // This allows users with legacy CUIDs to "log in" via Google (sending a numeric ID),
    // automatically linking the Google login to their existing CUID row and updating the image!
    const result = await pool.query(
      `INSERT INTO "User" (id, email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       ON CONFLICT (email) DO UPDATE SET 
         image = COALESCE(EXCLUDED.image, "User".image),
         first_name = COALESCE(EXCLUDED.first_name, "User".first_name),
         last_name = COALESCE(EXCLUDED.last_name, "User".last_name)
       RETURNING *`,
      [id, email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const existingResult = await pool.query('SELECT * FROM "User" WHERE id = $1', [id]);
    if (!existingResult.rows[0]) {
      return res.status(404).json({ error: "User not found" });
    }
    const existing = existingResult.rows[0];

    const { email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak } = req.body;
    
    // Fallbacks
    const updatedEmail = email !== undefined ? email : existing.email;
    const updatedTotalXp = total_xp !== undefined ? total_xp : existing.total_xp;
    const updatedWeeklyXp = weekly_xp !== undefined ? weekly_xp : existing.weekly_xp;
    const updatedImage = image ? image : existing.image;
    const updatedFirstName = first_name !== undefined ? first_name : existing.first_name;
    const updatedLastName = last_name !== undefined ? last_name : existing.last_name;
    const updatedSchool = school !== undefined ? school : existing.school;
    const updatedMajor = major !== undefined ? major : existing.major;
    const updatedClassStatus = class_status !== undefined ? class_status : existing.class_status;
    const updatedStreak = streak !== undefined ? streak : existing.streak;

    const result = await pool.query(
      'UPDATE "User" SET email = $1, total_xp = $2, weekly_xp = $3, image = $4, first_name = $5, last_name = $6, school = $7, major = $8, class_status = $9, streak = $10 WHERE id = $11 RETURNING *',
      [updatedEmail, updatedTotalXp, updatedWeeklyXp, updatedImage, updatedFirstName, updatedLastName, updatedSchool, updatedMajor, updatedClassStatus, updatedStreak, id]
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
    const groupBy = req.query.group_by || 'day'

    if (groupBy === 'month') {
      const result = await pool.query(
        `SELECT TO_CHAR(DATE_TRUNC('month', created_at), 'Mon') as month,
                DATE_TRUNC('month', created_at) as month_date,
                SUM(amount) as total_xp
         FROM xp_system
         WHERE user_id = $1
         GROUP BY DATE_TRUNC('month', created_at)
         ORDER BY month_date ASC`,
        [userId]
      )
      res.json(result.rows.map(row => ({
        month: row.month,
        total_xp: parseInt(row.total_xp)
      })))
    } else {
      const result = await pool.query(
        `SELECT DATE(created_at) as date, SUM(amount) as xp_earned
         FROM xp_system
         WHERE user_id = $1 AND created_at >= NOW() - INTERVAL '${days} days'
         GROUP BY DATE(created_at)
         ORDER BY date ASC`,
        [userId]
      )

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
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// UPCOMING TASKS (Legacy Mapping)
// -----------------------------------------------------
app.get("/users/:id/upcoming-tasks", async (req, res) => {
  try {
    const userId = req.params.id;
    const taskModel = require('./backend/models/taskModel');
    const tasks = await taskModel.getUpcomingTasksByUserId(userId);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -----------------------------------------------------
// QUIZ OVERVIEW (grouped by class)
// -----------------------------------------------------

app.patch("/users/:id/tasks/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { completed } = req.body;
    
    if (completed === undefined) {
      return res.status(400).json({ error: "Missing required field: completed" });
    }

    const taskModel = require('./backend/models/taskModel');
    const updatedTask = await taskModel.updateTaskStatus(taskId, completed);
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id/quiz-overview", async (req, res) => {
  try {
    const userId = req.params.id

    const result = await pool.query(
      `SELECT c.name as class_name, c.class_code,
              COUNT(q.id) as quiz_count,
              ROUND(AVG(q.score), 1) as average_score,
              MAX(q.color) as color
       FROM quizzes q
       JOIN topics t ON t.id = q.topic_id
       JOIN classes c ON c.class_code = t.class_code
       WHERE q.user_id = $1
       GROUP BY c.name, c.class_code
       ORDER BY quiz_count DESC`,
      [userId]
    )

    res.json(result.rows.map(row => ({
      class_name: row.class_name,
      class_code: row.class_code,
      quiz_count: parseInt(row.quiz_count),
      average_score: parseFloat(row.average_score),
      color: row.color || null
    })))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// FRIENDS WITH SHARED CLASSES
// -----------------------------------------------------

app.get("/users/:id/friends/shared-classes", async (req, res) => {
  try {
    const userId = req.params.id

    const friendsResult = await pool.query(
      `SELECT f.friend_id, u.first_name, u.last_name, u.image 
       FROM friends f
       JOIN "User" u ON f.friend_id = u.id
       WHERE f.user_id = $1`,
      [userId]
    )

    const friendsWithSharedClasses = await Promise.all(
      friendsResult.rows.map(async (friend) => {
        const sharedResult = await pool.query(
          `SELECT class_code, class_name AS name
           FROM shared_classes
           WHERE user_id = $1
           AND friend_id = $2`,
          [userId, friend.friend_id]
        )

        return {
          friend_id: friend.friend_id,
          first_name: friend.first_name,
          last_name: friend.last_name,
          shared_classes: sharedResult.rows.map(r => ({
            class_code: r.class_code,
            name: r.name
          }))
        }
      })
    )

    res.json(friendsWithSharedClasses)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


// -----------------------------------------------------
// GET /users/:id/friends/achievements
// Returns recent achievements from all of the user's friends
// -----------------------------------------------------

app.get("/users/:id/friends/achievements", async (req, res) => {
  try {
    const userId = req.params.id

    const friendsResult = await pool.query(
      `SELECT f.friend_id, u.first_name, u.last_name, u.image 
       FROM friends f
       JOIN "User" u ON f.friend_id = u.id
       WHERE f.user_id = $1`,
      [userId]
    )

    if (!friendsResult.rows.length) return res.json([])

    const friendIds = friendsResult.rows.map(f => f.friend_id)
    const friendMap = {}
    friendsResult.rows.forEach(f => {
      friendMap[f.friend_id] = { 
        first_name: f.first_name, 
        last_name: f.last_name,
        image: f.image
      }
    })

    const achievementsResult = await pool.query(
      `SELECT ua.user_id, ua.achievement_id, ua.earned_at,
              a.name as achievement_name
       FROM user_achievements ua
       JOIN achievements a ON a.id = ua.achievement_id
       WHERE ua.user_id = ANY($1::text[])
       ORDER BY ua.earned_at DESC
       LIMIT 50`,
      [friendIds]
    )

    const results = achievementsResult.rows.map(row => ({
      friend_id: row.user_id,
      first_name: friendMap[row.user_id]?.first_name || null,
      last_name: friendMap[row.user_id]?.last_name || null,
      image: friendMap[row.user_id]?.image || null,
      achievement_id: row.achievement_id,
      achievement_title: row.achievement_name,
      earned_at: row.earned_at
    }))

    res.json(results)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// CLASSES API
// -----------------------------------------------------

app.get("/classes", async (req, res) => {
  try {
    const { user_id } = req.query
    let query = "SELECT * FROM classes"
    let params = []

    if (user_id) {
      query += " WHERE user_id = $1"
      params = [user_id]
    }

    const result = await pool.query(query, params)
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
    const { user_id } = req.query
    if (!user_id) {
      return res.status(400).json({ error: "user_id is required to delete a class" })
    }

    await pool.query("DELETE FROM topics WHERE class_code = $1", [req.params.code])

    const result = await pool.query(
      "DELETE FROM classes WHERE class_code = $1 AND user_id = $2 RETURNING *",
      [req.params.code, user_id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Class not found or you do not have permission to delete it" })
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
    const code = req.params.code

    const [topicsResult, classResult] = await Promise.all([
      pool.query("SELECT * FROM topics WHERE class_code = $1", [code]),
      pool.query("SELECT streak, last_activity_date FROM classes WHERE class_code = $1", [code])
    ])

    const classInfo = classResult.rows[0] || {}

    res.json({
      class_code: code,
      streak: classInfo.streak || 0,
      last_activity_date: classInfo.last_activity_date || null,
      topics: topicsResult.rows
    })
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

    // Update class streak + heatmap when a chat session is created
    if (class_code && user_id) {
      await updateClassStreak(class_code, user_id)
      await updateHeatmap(user_id, topic_id, class_code, null)
    }

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
  { id: 1,  name: "First Quiz Completed",         description: "Completed your first quiz",             slug: "first-quiz" },
  { id: 2,  name: "10 Quizzes Completed",          description: "Completed 10 quizzes",                  slug: "ten-quizzes" },
  { id: 3,  name: "First Retake Completed",        description: "Completed your first retake",           slug: "first-retake" },
  { id: 4,  name: "20 Chat Messages Sent",         description: "Sent 20 chat messages",                 slug: "twenty-messages" },
  { id: 5,  name: "Perfect Score on a Quiz",       description: "Scored 100% on a quiz",                 slug: "perfect-score" },
  { id: 6,  name: "5 Day Study Streak",            description: "Studied 5 days in a row",               slug: "five-day-streak" },
  { id: 7,  name: "5 Perfect Quiz Scores",         description: "Scored 100% on 5 quizzes",              slug: "five-perfect" },
  { id: 8,  name: "10 Perfect Quiz Scores",        description: "Scored 100% on 10 quizzes",             slug: "ten-perfect" },
  { id: 9,  name: "5 Retakes Completed",           description: "Completed 5 retakes",                   slug: "five-retakes" },
  { id: 10, name: "10 Day Study Streak",           description: "Studied 10 days in a row",              slug: "ten-day-streak" },
  { id: 11, name: "First Study Session Scheduled", description: "Scheduled your first study session",    slug: "first-session-scheduled" },
  { id: 12, name: "10 Perfect Score Questions",    description: "Answered 10 questions perfectly",       slug: "ten-perfect-questions" },
  { id: 13, name: "20 Retakes Completed",          description: "Completed 20 retakes",                  slug: "twenty-retakes" },
  { id: 14, name: "10 Study Sessions Scheduled",   description: "Scheduled 10 study sessions",           slug: "ten-sessions-scheduled" },
  { id: 15, name: "30 Day Study Streak",           description: "Studied 30 days in a row",              slug: "thirty-day-streak" },
  { id: 16, name: "20 Perfect Score Questions",    description: "Answered 20 questions perfectly",       slug: "twenty-perfect-questions" },
  { id: 17, name: "100 Chat Messages Sent",        description: "Sent 100 chat messages",                slug: "hundred-messages" },
  { id: 18, name: "50 Perfect Score Questions",    description: "Answered 50 questions perfectly",       slug: "fifty-perfect-questions" },
  { id: 19, name: "50 Day Study Streak",           description: "Studied 50 days in a row",              slug: "fifty-day-streak" },
  { id: 20, name: "20 Study Sessions Scheduled",   description: "Scheduled 20 study sessions",           slug: "twenty-sessions-scheduled" },
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

    const iconsResult = await pool.query(
      "SELECT id, icon_colored, icon_greyed FROM achievements"
    )

    const earnedMap = {}
    earnedResult.rows.forEach(row => {
      earnedMap[row.achievement_id] = row.earned_at
    })

    const iconsMap = {}
    iconsResult.rows.forEach(row => {
      iconsMap[row.id] = { icon_colored: row.icon_colored, icon_greyed: row.icon_greyed }
    })

    const achievements = ACHIEVEMENT_LIST.map(a => ({
      id: String(a.id),
      name: a.name,
      description: a.description,
      slug: a.slug,
      icon_colored: iconsMap[String(a.id)]?.icon_colored || null,
      icon_greyed: iconsMap[String(a.id)]?.icon_greyed || null,
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
    const userId = req.params.id

    const quizStats = await pool.query(
      "SELECT COUNT(*) as quizzes_taken, COALESCE(SUM(retake_count), 0) as retakes_taken FROM quizzes WHERE user_id = $1",
      [userId]
    )

    const userResult = await pool.query(
      'SELECT weekly_xp, streak FROM "User" WHERE id = $1',
      [userId]
    )

    let aiMessages = 0
    try {
      const messageCount = await pool.query(
        "SELECT COUNT(*) as ai_messages FROM messages WHERE chat_id IN (SELECT id FROM chats WHERE user_id = $1)",
        [userId]
      )
      aiMessages = parseInt(messageCount.rows[0].ai_messages) || 0
    } catch (e) {
      aiMessages = 0
    }

    const user = userResult.rows[0] || {}
    const stats = quizStats.rows[0]

    res.json({
      quizzes_taken: parseInt(stats.quizzes_taken) || 0,
      weekly_xp: parseInt(user.weekly_xp) || 0,
      ai_messages: aiMessages,
      retakes_taken: parseInt(stats.retakes_taken) || 0,
      streak: parseInt(user.streak) || 0
    })
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
      `SELECT class_name, SUM(question_count) as question_count, MAX(color) as color, MAX(light) as light
       FROM class_engagement
       WHERE user_id = $1
       GROUP BY class_name
       ORDER BY question_count DESC`,
      [req.params.id]
    )
    res.json(result.rows.map(row => ({
      class_name: row.class_name,
      question_count: parseInt(row.question_count),
      color: row.color || null,
      light: row.light || null
    })))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/class-engagement", async (req, res) => {
  try {
    const { user_id, class_name, question_count, week_start, color, light } = req.body
    const id = randomUUID()
    const result = await pool.query(
      `INSERT INTO class_engagement (id, user_id, class_name, question_count, week_start, color, light)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (user_id, class_name, week_start)
       DO UPDATE SET question_count = class_engagement.question_count + EXCLUDED.question_count,
                     color = EXCLUDED.color,
                     light = EXCLUDED.light
       RETURNING *`,
      [id, user_id, class_name, question_count || 1, week_start || new Date(), color || null, light || null]
    )
    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// COURSE MATERIALS API
// -----------------------------------------------------

app.get("/classes/:code/materials", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM course_materials WHERE class_code = $1 ORDER BY uploaded_at DESC",
      [req.params.code]
    )
    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.post("/course-materials", async (req, res) => {
  try {
    const { class_code, user_id, file_name, file_url, doc_type } = req.body
    const id = randomUUID()
    const result = await pool.query(
      "INSERT INTO course_materials (id, class_code, user_id, file_name, file_url, doc_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [id, class_code, user_id, file_name, file_url || null, doc_type || 'document']
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
    const query = `
      SELECT f.*, u.image, u.first_name, u.last_name, u.email
      FROM friends f
      JOIN "User" u ON f.friend_id = u.id
      WHERE f.user_id = $1
    `;
    const result = await pool.query(query, [req.params.id])
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
// POST /friend-requests/:id/accept
// Accepts request and auto-creates friendship in both directions
// -----------------------------------------------------

app.post("/friend-requests/:id/accept", async (req, res) => {
  try {
    const requestId = req.params.id

    const reqResult = await pool.query(
      "SELECT * FROM friend_requests WHERE id = $1",
      [requestId]
    )
    if (!reqResult.rows[0]) return res.status(404).json({ error: "Friend request not found" })

    const { sender_id, receiver_id } = reqResult.rows[0]

    // Update request status
    await pool.query(
      "UPDATE friend_requests SET status = 'accepted' WHERE id = $1",
      [requestId]
    )

    // Fetch both users for name/xp/streak
    const [senderRes, receiverRes] = await Promise.all([
      pool.query('SELECT first_name, last_name, streak, total_xp FROM "User" WHERE id = $1', [sender_id]),
      pool.query('SELECT first_name, last_name, streak, total_xp FROM "User" WHERE id = $1', [receiver_id])
    ])
    const sender = senderRes.rows[0] || {}
    const receiver = receiverRes.rows[0] || {}

    // Create friendship in both directions
    await pool.query(
      `INSERT INTO friends (user_id, friend_id, first_name, last_name, streak, total_xp)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT DO NOTHING`,
      [receiver_id, sender_id, sender.first_name, sender.last_name, sender.streak || 0, sender.total_xp || 0]
    )
    await pool.query(
      `INSERT INTO friends (user_id, friend_id, first_name, last_name, streak, total_xp)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT DO NOTHING`,
      [sender_id, receiver_id, receiver.first_name, receiver.last_name, receiver.streak || 0, receiver.total_xp || 0]
    )

    res.json({ message: "Friend request accepted", sender_id, receiver_id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// POST /friend-requests/:id/decline
// Declines and deletes the friend request
// -----------------------------------------------------

app.post("/friend-requests/:id/decline", async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM friend_requests WHERE id = $1 RETURNING *",
      [req.params.id]
    )
    if (!result.rows[0]) return res.status(404).json({ error: "Friend request not found" })
    res.json({ message: "Friend request declined" })
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
    const { id, user_id, topic_id, score, date, retake_count, color, questions } = req.body

    const quiz = await pool.query(
      "INSERT INTO quizzes (id, user_id, topic_id, score, date, retake_count, color) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [id, user_id, topic_id, score, date || new Date(), retake_count || 0, color || null]
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

    // Update class streak
    try {
      const topicResult = await pool.query("SELECT class_code FROM topics WHERE id = $1", [topic_id])
      if (topicResult.rows[0]) {
        await updateClassStreak(topicResult.rows[0].class_code, user_id)
      }
    } catch (streakErr) {
      console.error('[ClassStreak] Failed to update from quiz:', streakErr.message)
    }

    // Update heatmap when a quiz is taken
    try {
      const topicForHeatmap = await pool.query("SELECT class_code FROM topics WHERE id = $1", [topic_id])
      if (topicForHeatmap.rows[0]) {
        await updateHeatmap(user_id, topic_id, topicForHeatmap.rows[0].class_code, score)
      }
    } catch (heatmapErr) {
      console.error('[Heatmap] Failed to update from quiz:', heatmapErr.message)
    }

    // -----------------------------------------------------
    // AUTO-UNLOCK ACHIEVEMENTS
    // -----------------------------------------------------
    try {
      const allQuizzes = await pool.query(
        "SELECT score, retake_count FROM quizzes WHERE user_id = $1",
        [user_id]
      )
      const quizCount = allQuizzes.rows.length
      const perfectScores = allQuizzes.rows.filter(q => parseInt(q.score) === 100).length
      const totalRetakes = allQuizzes.rows.reduce((sum, q) => sum + (parseInt(q.retake_count) || 0), 0)
      const hasRetake = totalRetakes > 0

      const toUnlock = []
      if (quizCount >= 1) toUnlock.push('1')
      if (quizCount >= 10) toUnlock.push('2')
      if (hasRetake) toUnlock.push('3')
      if (perfectScores >= 1) toUnlock.push('5')
      if (perfectScores >= 5) toUnlock.push('7')
      if (perfectScores >= 10) toUnlock.push('8')
      if (totalRetakes >= 5) toUnlock.push('9')
      if (totalRetakes >= 20) toUnlock.push('13')

      for (const achId of toUnlock) {
        await pool.query(
          `INSERT INTO user_achievements (user_id, achievement_id)
           VALUES ($1, $2)
           ON CONFLICT DO NOTHING`,
          [user_id, achId]
        )
      }
    } catch (achErr) {
      console.error('[Achievements] Failed to auto-unlock:', achErr.message)
    }

    res.json({ ...quiz.rows[0], questions: savedQuestions })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// -----------------------------------------------------
// PUT /quizzes/:id — Update quiz score + per-question answers after submission/retake
// Uses backend/db module (proper connection) since root pool has no DATABASE_URL
// -----------------------------------------------------
const _db = require('./backend/db')

app.put("/quizzes/:id", async (req, res) => {
  try {
    const { score, retake_count, questions } = req.body
    const quizId = req.params.id

    const newScore = (score !== undefined && score !== null) ? score : null
    const newRetakeCount = (retake_count !== undefined && retake_count !== null) ? retake_count : null

    // Update quiz record
    const quizResult = await _db.query(
      "UPDATE quizzes SET score = COALESCE($1, score), retake_count = COALESCE($2, retake_count) WHERE id = $3 RETURNING *",
      [newScore, newRetakeCount, quizId]
    )

    if (!quizResult.rows[0]) {
      return res.status(404).json({ error: "Quiz not found" })
    }

    // Update per-question user_answer and is_correct if provided
    const updatedQuestions = []
    if (Array.isArray(questions)) {
      for (const q of questions) {
        const updated = await _db.query(
          "UPDATE quiz_questions SET user_answer = $1, is_correct = $2 WHERE id = $3 RETURNING *",
          [q.user_answer, q.is_correct, q.id]
        )
        if (updated.rows[0]) updatedQuestions.push(updated.rows[0])
      }
    }

    // Re-run achievement unlock checks
    const user_id = quizResult.rows[0].user_id
    try {
      const allQuizzes = await _db.query(
        "SELECT score, retake_count FROM quizzes WHERE user_id = $1",
        [user_id]
      )
      const quizCount = allQuizzes.rows.length
      const perfectScores = allQuizzes.rows.filter(q => parseInt(q.score) === 100).length
      const totalRetakes = allQuizzes.rows.reduce((sum, q) => sum + (parseInt(q.retake_count) || 0), 0)

      const toUnlock = []
      if (quizCount >= 1) toUnlock.push('1')
      if (quizCount >= 10) toUnlock.push('2')
      if (totalRetakes > 0) toUnlock.push('3')
      if (perfectScores >= 1) toUnlock.push('5')
      if (perfectScores >= 5) toUnlock.push('7')
      if (perfectScores >= 10) toUnlock.push('8')
      if (totalRetakes >= 5) toUnlock.push('9')
      if (totalRetakes >= 20) toUnlock.push('13')

      for (const achId of toUnlock) {
        await _db.query(
          "INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
          [user_id, achId]
        )
      }
    } catch (achErr) {
      console.error('[Achievements] Failed to auto-unlock on quiz update:', achErr.message)
    }

    res.json({ ...quizResult.rows[0], questions: updatedQuestions })
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