import { Pool } from 'pg';
import * as dotenv from 'dotenv';
dotenv.config();

// --- PostgreSQL Connection Pool ---
// Replaces the old SQLite (better-sqlite3) setup.
// ssl: rejectUnauthorized: false is required for AWS RDS which uses self-signed certs.
export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: { rejectUnauthorized: false },
});

// Exported so index.ts can await this before starting the session.
// LangChain's PostgresChatMessageHistory will create its OWN table separately.
export async function initTables(): Promise<void> {
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

// --- TypeScript Interfaces (same shape as before, just async now) ---

export interface Chat {
  id: string;
  title: string;
  created_at: string;
  accumulated_score: number;
}

export interface Message {
  id: number;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  score: number;
  reason: string;
  created_at: string;
}

// --- CRUD Functions (all async — pg uses promises, not sync like sqlite) ---

export async function createChat(id: string, title: string): Promise<void> {
  await pool.query(
    'INSERT INTO chats (id, title) VALUES ($1, $2) ON CONFLICT (id) DO NOTHING',
    [id, title]
  );
}

export async function addMessage(
  chatId: string,
  role: string,
  content: string,
  score: number = 0,
  reason: string = ''
): Promise<void> {
  await pool.query(
    'INSERT INTO messages (chat_id, role, content, score, reason) VALUES ($1, $2, $3, $4, $5)',
    [chatId, role, content, score, reason]
  );
}

export async function updateChatScore(chatId: string, scoreToAdd: number): Promise<void> {
  await pool.query(
    'UPDATE chats SET accumulated_score = accumulated_score + $1 WHERE id = $2',
    [scoreToAdd, chatId]
  );
}

export async function getChats(): Promise<Chat[]> {
  const result = await pool.query('SELECT * FROM chats ORDER BY created_at DESC');
  return result.rows as Chat[];
}

export async function getMessages(chatId: string): Promise<Message[]> {
  const result = await pool.query(
    'SELECT * FROM messages WHERE chat_id = $1 ORDER BY created_at ASC',
    [chatId]
  );
  return result.rows as Message[];
}
