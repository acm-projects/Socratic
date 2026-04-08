import { Pool } from 'pg'; //pg is a postgresql client for node.js
import * as dotenv from 'dotenv'; //load env
dotenv.config(); //load env

//postgres connection which stores the chats and messages
export const pool = new Pool({ //pool as in a group of connections in database
  connectionString: process.env.POSTGRES_URL, //this is the url to connect to the database
  ssl: { rejectUnauthorized: false }, //reject the ssl certificate
});

export async function initTables(): Promise<void> { //this is to create the tables in the database
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
  console.log('[DB] PostgreSQL tables ready.');
}


export interface Chat { //structure of the chat object
  id: string; //id of the chat
  title: string; //title of the chat
  created_at: string; //date and time of the chat
  accumulated_score: number; //score of the chat
}

export interface Message { //structure of the message object
  id: number; //id of the message
  chat_id: string; //id of the chat
  role: 'user' | 'assistant'; //role of the user or assistant
  content: string; //content of the message
  score: number; //score of the message
  reason: string; //reason for the score
  created_at: string; //date and time of the message
}

export async function createChat(id: string, title: string): Promise<void> { //create a chat
  await pool.query( //query to create a chat
    'INSERT INTO chats (id, title) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING', //insert a chat or do nothing if the chat already exists
    [id, title] //id and title of the chat
  );
}

export async function addMessage( //add a message
  chatId: string, //id of the chat
  role: string, //role of the user or assistant
  content: string, //content of the message
  score: number = 0, //score of the message
  reason: string = '' //reason for the score
): Promise<void> {
  await pool.query( //query to add a message
    'INSERT INTO messages (chat_id, role, content, score, reason) VALUES ($1, $2, $3, $4, $5)', //insert a message or do nothing if the message already exists
    [chatId, role, content, score, reason] //id of the chat, role of the user or assistant, content of the message, score of the message, reason for the score
  );
}

export async function updateChatScore(chatId: string, scoreToAdd: number): Promise<void> { //update the score of the chat
  await pool.query( //query to update the score of the chat
    'UPDATE chats SET accumulated_score = accumulated_score + $1 WHERE id = $2', //update the score of the chat or do nothing if the chat already exists
    [scoreToAdd, chatId] //score to add and id of the chat
  );
}

export async function getChats(): Promise<Chat[]> { //get all the chats
  const result = await pool.query('SELECT * FROM chats ORDER BY created_at DESC'); //query to get all the chats
  return result.rows as Chat[]; //return all the chats
}

export async function getMessages(chatId: string): Promise<Message[]> { //get all the messages
  const result = await pool.query( //query to get all the messages
    'SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC', //query to get all the messages
    [chatId] //id of the chat
  );
  return result.rows as Message[]; //return all the messages
}
