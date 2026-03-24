const db = require('../db');

const getUserXpStats = async (userId) => {
  const result = await db.query("SELECT * FROM xp_system WHERE user_id = $1", [userId]);
  return result.rows;
};

const getTopicMetrics = async (topicId) => {
  const result = await db.query("SELECT * FROM daily_topic_metrics WHERE topic_id = $1", [topicId]);
  return result.rows;
};

module.exports = {
  getUserXpStats,
  getTopicMetrics
};
