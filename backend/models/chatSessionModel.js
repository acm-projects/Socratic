const db = require('../db');

const getSessionsByUserId = async (userId) => {
  const result = await db.query("SELECT * FROM chat_sessions WHERE user_id = $1", [userId]);
  return result.rows;
};

const getSessionById = async (sessionId) => {
  const result = await db.query("SELECT * FROM chat_sessions WHERE session_id = $1", [sessionId]);
  return result.rows[0];
};

const createSession = async (data) => {
  const { session_id, class_code, user_id, topic_id } = data;
  const result = await db.query(
    "INSERT INTO chat_sessions (session_id, class_code, user_id, topic_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [session_id, class_code, user_id, topic_id]
  );
  return result.rows[0];
};

module.exports = {
  getSessionsByUserId,
  getSessionById,
  createSession
};
