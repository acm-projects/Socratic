const { Pool } = require('pg');
require('dotenv').config({ path: './backend/.env' });
const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
const userStatsModel = require('../backend/models/userStatsModel');

async function testAwardXP() {
  const userId = 'cmn9fnpv60000gox6sumckr25';
  try {
    const before = await pool.query('SELECT total_xp FROM "User" WHERE id = $1', [userId]);
    const xpBefore = before.rows[0]?.total_xp || 0;
    console.log('XP Before:', xpBefore);

    // Using 'chat' as it is a known valid source
    await userStatsModel.awardXP(userId, 'chat', 5);
    
    const after = await pool.query('SELECT total_xp FROM "User" WHERE id = $1', [userId]);
    const xpAfter = after.rows[0]?.total_xp || 0;
    console.log('XP After:', xpAfter);

    if (xpAfter === xpBefore + 5) {
      console.log('✅ awardXP test passed!');
    } else {
      console.log('❌ awardXP test failed!');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

testAwardXP();
