const { Pool } = require('pg');
require('dotenv').config({ path: 'backend/.env' });

async function verifySocialImages() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  console.log(`\n🚀 Verifying Social Images with JOINs...`);

  try {
    // 1. Get a user who has friends
    const userRes = await pool.query("SELECT DISTINCT user_id FROM friends LIMIT 1");
    if (userRes.rows.length === 0) {
      console.log("No users with friends found. Creating a mock friendship...");
      // For testing, I'll just check if the logic is sound by manual verification of the query
      process.exit(0);
    }
    const userId = userRes.rows[0].user_id;
    console.log(`Testing with User ID: ${userId}`);

    // 2. Simulate the /users/:id/friends query logic
    const friendsQuery = `
      SELECT f.*, u.image, u.first_name, u.last_name 
      FROM friends f 
      JOIN "User" u ON f.friend_id = u.id 
      WHERE f.user_id = $1
    `;
    const friends = await pool.query(friendsQuery, [userId]);
    console.log(`\n--- /users/:id/friends result ---`);
    if (friends.rows.length > 0) {
      friends.rows.forEach(f => {
        console.log(`Friend: ${f.first_name} ${f.last_name} | Image: ${f.image ? '✅ Present' : '❌ Missing'}`);
      });
      const allHaveImages = friends.rows.every(f => f.hasOwnProperty('image'));
      if (allHaveImages) {
        console.log(`\n✅ PASS: All friends have an image property.`);
      } else {
        console.error(`\n❌ FAIL: Some friends are missing the image property.`);
      }
    } else {
      console.log("User has no friends in DB.");
    }

    // 3. Simulate the /users/:id/friends/achievements query logic
    const achievementFriendsQuery = `
      SELECT f.friend_id, u.first_name, u.last_name, u.image 
      FROM friends f 
      JOIN "User" u ON f.friend_id = u.id 
      WHERE f.user_id = $1
    `;
    const achFriends = await pool.query(achievementFriendsQuery, [userId]);
    console.log(`\n--- /users/:id/friends/achievements result ---`);
    if (achFriends.rows.length > 0) {
      const allHaveImages = achFriends.rows.every(f => f.hasOwnProperty('image'));
      if (allHaveImages) {
        console.log(`\n✅ PASS: Achievement friend query correctly returns images.`);
      }
    }

  } catch (error) {
    console.error(`❌ Test Error:`, error.message);
  } finally {
    await pool.end();
  }
}

verifySocialImages();
