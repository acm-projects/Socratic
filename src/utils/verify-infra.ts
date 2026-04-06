import * as dotenv from 'dotenv';
import { pool } from '../db';
import { Pinecone } from '@pinecone-database/pinecone';

dotenv.config();

async function verifyInfra() {
  console.log('\n--- VERIFYING POSTGRES ---');
  try {
    const chatsCount = await pool.query('SELECT COUNT(*) FROM chats');
    console.log(`[Postgres] chats table: ${chatsCount.rows[0].count} records found.`);

    const messagesCount = await pool.query('SELECT COUNT(*) FROM messages');
    console.log(`[Postgres] messages table: ${messagesCount.rows[0].count} records found.`);

    try {
      const langchainCount = await pool.query('SELECT COUNT(*) FROM langchain_chat_messages');
      console.log(`[Postgres] langchain_chat_messages table: ${langchainCount.rows[0].count} records found.`);
    } catch (e) {
      // Ignore if table doesn't exist
    }

    const recentChats = await pool.query('SELECT * FROM chats ORDER BY created_at DESC LIMIT 5');
    console.log('[Postgres] Recent Chat Sessions:');
    recentChats.rows.forEach(chat => {
      console.log(` - ID: ${chat.id} | Title: ${chat.title} | Date: ${new Date(chat.created_at)}`);
    });
  } catch (error) {
    console.error('[Postgres] Connection Error:', error);
  }

  console.log('\n--- VERIFYING PINECONE ---');
  try {
    const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
    const indexName = 'socratic-tutor';
    const index = pc.Index(indexName);
    const stats = await index.describeIndexStats();
    
    console.log(`[Pinecone] Index "${indexName}" status: READY`);
    console.log(`[Pinecone] Total Record Count: ${stats.totalRecordCount}`);
    if (stats.namespaces) {
      for (const [ns, nsStats] of Object.entries(stats.namespaces)) {
        console.log(` - Namespace "${ns}": ${nsStats.recordCount} records`);
      }
    }
  } catch (error) {
    console.error('[Pinecone] Connection Error:', error);
  }

  process.exit(0);
}

verifyInfra();
