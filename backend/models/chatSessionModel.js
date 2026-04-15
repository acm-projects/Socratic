const db = require('../db');

const getSessionsByUserId = async (userId) => {
  const result = await db.query("SELECT * FROM chat_sessions WHERE user_id = $1", [userId]);
  return result.rows;
};

const getAllSessions = async () => {
  const result = await db.query("SELECT * FROM chat_sessions ORDER BY created_at DESC");
  return result.rows;
};

const getSessionById = async (sessionId) => {
  const result = await db.query("SELECT * FROM chat_sessions WHERE session_id = $1", [sessionId]);
  return result.rows[0];
};

const createSession = async (data) => {
  const { session_id, class_code, user_id, topic_id, title } = data;
  const result = await db.query(
    "INSERT INTO chat_sessions (session_id, class_code, user_id, topic_id, title) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [session_id, class_code, user_id, topic_id, title]
  );
  return result.rows[0];
};

/**
 * Ensures a tutor session exists for this user/class/topic.
 * If one already exists, it returns it. Otherwise creates a new one.
 */
const upsertTutorSession = async (data) => {
  const { session_id, class_code, user_id, topic_id, title } = data;
  
  // Try to find existing
  const existing = await db.query(
    "SELECT * FROM chat_sessions WHERE session_id = $1",
    [session_id]
  );
  if (existing.rows[0]) return existing.rows[0];

  // Otherwise create
  return await createSession(data);
};

/**
 * Saves a message specifically to the chat_history table.
 */
const saveChatMessage = async (data) => {
  const { id, session_id, sender, content, score = 0, reason = "" } = data;
  const result = await db.query(
    `INSERT INTO chat_history (id, session_id, sender, content, score, reason) 
     VALUES ($1, $2, $3, $4, $5, $6) 
     RETURNING *`,
    [id, session_id, sender, content, score, reason]
  );
  return result.rows[0];
};

/**
 * Retrieves all messages for a specific session from chat_history.
 */
const getMessagesBySessionId = async (sessionId) => {
  const result = await db.query(
    "SELECT * FROM chat_history WHERE session_id = $1 ORDER BY created_at ASC",
    [sessionId]
  );
  return result.rows;
};

module.exports = {
  getSessionsByUserId,
  getAllSessions,
  getSessionById,
  createSession,
  upsertTutorSession,
  saveChatMessage,
  getMessagesBySessionId
};
