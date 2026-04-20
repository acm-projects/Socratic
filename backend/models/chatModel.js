const pool = require('../db'); //database connection
//all of this is for postgres telling it how to format the chat history and messages

// Exported so app.js can await this before starting the session.
// LangChain's postgres chat message history creates its own table separately
// chats table stores the chat history and messages table stores the messages

async function initTables() { //every time the server starts this will run and create the tables if they don't exist self healing like deadpool
  //tables for chat history and messages
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


async function createChat(id, title) { //creates a new chat and inserts it into the chats table
  await pool.query( //creates a new row in the chats table
    'INSERT INTO chats (id, title) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
    [id, title]
  );
}

async function addMessage(chatId, role, content, score = 0, reason = '') { //adds a message to the messages table
  await pool.query( //creates a new row in the messages table
    'INSERT INTO messages (chat_id, role, content, score, reason) VALUES ($1, $2, $3, $4, $5)',
    [chatId, role, content, score, reason]
  );
}

async function updateChatScore(chatId, scoreToAdd) {
  await pool.query( //updates the accumulated score in the chats table
    'UPDATE chats SET accumulated_score = accumulated_score + $1 WHERE id = $2',
    [scoreToAdd, chatId]
  );
}

async function getChats() { //gets all the chats from the chats table
  const result = await pool.query('SELECT * FROM chats ORDER BY created_at DESC'); //table displays chats in order of creation date
  return result.rows; //returns all the chats
}

async function getMessages(chatId) { //gets all the messages from the messages table
  const result = await pool.query(
    'SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC',
    [chatId]
  );
  return result.rows; //returns all the messages
}

module.exports = {//exports all the functions to be used in other files
  initTables,//initializes the tables
  createChat,//creates a new chat
  addMessage,//adds a message
  updateChatScore,//updates the chat score
  getChats,//gets all the chats
  getMessages//gets all the messages
};
