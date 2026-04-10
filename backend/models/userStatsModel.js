const db = require('../db');

const getUserXpStats = async (userId) => {
  const result = await db.query("SELECT * FROM xp_system WHERE user_id = $1", [userId]);
  return result.rows;
};

const getTopicMetrics = async (topicId) => {
  const result = await db.query("SELECT * FROM daily_topic_metrics WHERE topic_id = $1", [topicId]);
  return result.rows;
};

/**
 * Increments ai_messages by 1 and updates the daily streak.
 *
 * Streak logic (atomic SQL):
 *  - last_active_date = today     → streak unchanged (already counted)
 *  - last_active_date = yesterday → streak + 1
 *  - otherwise (gap or NULL)      → reset streak to 1
 */
const incrementAiMessages = async (userId) => {
  await db.query(
    `UPDATE "User"
     SET
       ai_messages = ai_messages + 1,
       streak = CASE
         WHEN last_active_date = CURRENT_DATE THEN streak
         WHEN last_active_date = CURRENT_DATE - INTERVAL '1 day' THEN streak + 1
         ELSE 1
       END,
       last_active_date = CURRENT_DATE
     WHERE id = $1`,
    [userId]
  );
};

/**
 * Increments quizzes_taken by 1.
 * Called on POST /api/quizzes/generate or when a quiz is marked complete.
 */
const incrementQuizzesTaken = async (userId) => {
  await db.query(
    `UPDATE "User" SET quizzes_taken = quizzes_taken + 1 WHERE id = $1`,
    [userId]
  );
};

/**
 * Increments retakes_taken by 1.
 * Called when a quiz retake is triggered via POST /api/quizzes/:id/retake.
 */
const incrementRetakesTaken = async (userId) => {
  await db.query(
    `UPDATE "User" SET retakes_taken = retakes_taken + 1 WHERE id = $1`,
    [userId]
  );
};

/**
 * Returns activity stats for a user.
 */
const getUserStats = async (userId) => {
  const result = await db.query(
    `SELECT ai_messages, quizzes_taken, retakes_taken, streak, total_xp, weekly_xp, last_active_date
     FROM "User" WHERE id = $1`,
    [userId]
  );
  return result.rows[0] || null;
};

module.exports = {
  getUserXpStats,
  getTopicMetrics,
  incrementAiMessages,
  incrementQuizzesTaken,
  incrementRetakesTaken,
  getUserStats,
};
