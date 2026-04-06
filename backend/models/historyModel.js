const pool = require('../db');

// Fetch all chat sessions ordered by newest first
async function getChats() {
  const result = await pool.query('SELECT * FROM chats ORDER BY created_at DESC');
  return result.rows;
}

// Fetch all messages for a specific chat session ordered chronologically
async function getMessages(chatId) {
  const result = await pool.query(
    'SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC',
    [chatId]
  );
  return result.rows;
}

module.exports = {
  getChats,
  getMessages
};
