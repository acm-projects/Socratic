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

/**
 * Patches the score and reason on an already-saved chat_history row.
 * Used by the fire-and-forget scoring path to backfill after streaming completes.
 */
const updateChatMessageScore = async (id, score, reason) => {
  await db.query(
    'UPDATE chat_history SET score = $1, reason = $2 WHERE id = $3',
    [score, reason, id]
  );
};

module.exports = {
  getSessionsByUserId,
  getSessionById,
  createSession,
  upsertTutorSession,
  saveChatMessage,
  updateChatMessageScore,
  getMessagesBySessionId
};
