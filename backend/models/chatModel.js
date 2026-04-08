const pool = require('../db');

// Exported so app.js can await this before starting the session.
// LangChain's PostgresChatMessageHistory will create its OWN table separately.
async function initTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS chats (
      id TEXT PRIMARY KEY,
      title TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      accumulated_score INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL PRIMARY KEY,
      chat_id TEXT,
      role TEXT,
      content TEXT,
      score INTEGER DEFAULT 0,
      reason TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      FOREIGN KEY (chat_id) REFERENCES chats(id)
    );
  `);
  console.log('[DB] PostgreSQL chat tables ready.');
}

// --- CRUD Functions ---

async function createChat(id, title) {
  await pool.query(
    'INSERT INTO chats (id, title) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
    [id, title]
  );
}

async function addMessage(chatId, role, content, score = 0, reason = '') {
  await pool.query(
    'INSERT INTO messages (chat_id, role, content, score, reason) VALUES ($1, $2, $3, $4, $5)',
    [chatId, role, content, score, reason]
  );
}

async function updateChatScore(chatId, scoreToAdd) {
  await pool.query(
    'UPDATE chats SET accumulated_score = accumulated_score + $1 WHERE id = $2',
    [scoreToAdd, chatId]
  );
}

async function getChats() {
  const result = await pool.query('SELECT * FROM chats ORDER BY created_at DESC');
  return result.rows;
}

async function getMessages(chatId) {
  const result = await pool.query(
    'SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC',
    [chatId]
  );
  return result.rows;
}

module.exports = {
  initTables,
  createChat,
  addMessage,
  updateChatScore,
  getChats,
  getMessages
};
