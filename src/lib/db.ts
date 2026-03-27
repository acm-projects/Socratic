import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'chats.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS chats (
    id TEXT PRIMARY KEY,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    accumulated_score INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id TEXT,
    role TEXT,
    content TEXT,
    score INTEGER DEFAULT 0,
    reason TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(chat_id) REFERENCES chats(id)
  );
`);

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

export function createChat(id: string, title: string) {
  const stmt = db.prepare('INSERT OR IGNORE INTO chats (id, title) VALUES (?, ?)');
  stmt.run(id, title);
}

export function addMessage(chatId: string, role: string, content: string, score: number = 0, reason: string = '') {
  const stmt = db.prepare('INSERT INTO messages (chat_id, role, content, score, reason) VALUES (?, ?, ?, ?, ?)');
  stmt.run(chatId, role, content, score, reason);
}

export function updateChatScore(chatId: string, scoreToAdd: number) {
  const stmt = db.prepare('UPDATE chats SET accumulated_score = accumulated_score + ? WHERE id = ?');
  stmt.run(scoreToAdd, chatId);
}

export function getChats(): Chat[] {
  return db.prepare('SELECT * FROM chats ORDER BY created_at DESC').all() as Chat[];
}

export function getMessages(chatId: string): Message[] {
  return db.prepare('SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC').all(chatId) as Message[];
}
