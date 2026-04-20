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
 * Uses COALESCE to ensure math works even if initial value is NULL.
 */
const incrementAiMessages = async (userId) => {
  await db.query(
    `UPDATE "User"
     SET
       ai_messages = COALESCE(ai_messages, 0) + 1,
       streak = CASE
         WHEN last_active_date = CURRENT_DATE THEN COALESCE(streak, 0)
         WHEN last_active_date = CURRENT_DATE - INTERVAL '1 day' THEN COALESCE(streak, 0) + 1
         ELSE 1
       END,
       last_active_date = CURRENT_DATE
     WHERE id = $1`,
    [userId]
  );
};

/**
 * Increments quizzes_taken by 1.
 */
const incrementQuizzesTaken = async (userId) => {
  await db.query(
    `UPDATE "User" SET quizzes_taken = COALESCE(quizzes_taken, 0) + 1 WHERE id = $1`,
    [userId]
  );
};

/**
 * Increments retakes_taken by 1.
 */
const incrementRetakesTaken = async (userId) => {
  await db.query(
    `UPDATE "User" SET retakes_taken = COALESCE(retakes_taken, 0) + 1 WHERE id = $1`,
    [userId]
  );
};

/**
 * Updates the daily_topic_metrics (Heatmap) for a user.
 * Handles both chat (single questions) and quiz results.
 * 
 * @param {string} userId
 * @param {string} topicId
 * @param {string} classCode
 * @param {number|null} score - Raw quality score (0-5 scale)
 */
const updateHeatmap = async (userId, topicId, classCode, score) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const numericScore = score !== undefined && score !== null ? parseFloat(score) : null;

    await db.query(
      `INSERT INTO daily_topic_metrics (user_id, topic_id, class_code, metric_date, questions_asked, avg_score)
       VALUES ($1, $2, $3, $4, 1, $5)
       ON CONFLICT (user_id, class_code, topic_id, metric_date)
       DO UPDATE SET
         questions_asked = daily_topic_metrics.questions_asked + 1,
         avg_score = CASE
           WHEN $5 IS NOT NULL THEN ROUND(((COALESCE(daily_topic_metrics.avg_score, 0) * daily_topic_metrics.questions_asked) + $5) / (daily_topic_metrics.questions_asked + 1), 2)
           ELSE daily_topic_metrics.avg_score
         END`,
      [userId, topicId, classCode, today, numericScore]
    );
  } catch (err) {
    console.error('[Heatmap] Failed to update metrics:', err.message);
  }
};

/**
 * Returns activity stats for a user.
 */
const getUserStats = async (userId) => {
  const result = await db.query(
    `SELECT 
      COALESCE(ai_messages, 0) as ai_messages, 
      COALESCE(quizzes_taken, 0) as quizzes_taken, 
      COALESCE(retakes_taken, 0) as retakes_taken, 
      COALESCE(streak, 0) as streak, 
      COALESCE(total_xp, 0) as total_xp, 
      COALESCE(weekly_xp, 0) as weekly_xp, 
      last_active_date
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
  updateHeatmap,
  getUserStats,
};
