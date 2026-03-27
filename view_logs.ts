import Database from 'better-sqlite3';

const db = new Database('chats.db', { fileMustExist: false });

console.log("======================================");
console.log("          SOCRATIC CHAT LOGS          ");
console.log("======================================\n");

try {
  const chats = db.prepare('SELECT * FROM chats ORDER BY created_at DESC').all() as any[];

  if (chats.length === 0) {
    console.log("No chats recorded yet. Start a session to see history!");
    process.exit(0);
  }

  for (const chat of chats) {
    console.log(`\nSESSION: ${chat.title}`);
    console.log(`Created: ${chat.created_at} | Total EXP: ${chat.accumulated_score}\n`);
    
    const messages = db.prepare('SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC').all(chat.id) as any[];
    
    for (const msg of messages) {
      const role = msg.role === 'user' ? 'USER' : 'AI TUTOR';
      let output = `[${msg.created_at}] ${role}: ${msg.content.substring(0, 80).replace(/\n/g, " ")}...`;
      
      if (msg.role === 'user' && msg.score > 0) {
        output += `\n   -> SCORE: ${msg.score}/5 | REASON: ${msg.reason}`;
      } else if (msg.role === 'user' && msg.reason && msg.reason.toLowerCase().includes("off")) {
        output += `\n   -> SCORE: 0/5   | REASON: Off-topic warning`;
      }
      
      console.log(output);
    }
    console.log("-----------------------------------------");
  }
} catch (err) {
  console.log("No database found or table doesn't exist yet! Have you run the app?");
}
