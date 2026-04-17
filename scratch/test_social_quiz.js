const { Pool } = require('pg');
require('dotenv').config({ path: 'backend/.env' });

const db = {
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }),
  query: async (text, params) => {
    return await db.pool.query(text, params);
  }
};

async function testQuizOverview(userId) {
  const query = 'SELECT c.name as class_name, c.class_code, COUNT(q.id) as quiz_count, ROUND(AVG(q.score), 1) as average_score, MAX(q.color) as color FROM quizzes q JOIN topics t ON t.id = q.topic_id JOIN classes c ON c.class_code = t.class_code WHERE q.user_id = $1 GROUP BY c.name, c.class_code ORDER BY quiz_count DESC';
  const result = await db.query(query, [userId]);
  return result.rows;
}

async function testSharedClasses(userId) {
  const friendsResult = await db.query(
    'SELECT f.friend_id, u.first_name, u.last_name, u.image FROM friends f JOIN "User" u ON f.friend_id = u.id WHERE f.user_id = $1',
    [userId]
  )

  const friendsWithSharedClasses = await Promise.all(
    friendsResult.rows.map(async (friend) => {
      const sharedQuery = 'SELECT DISTINCT c.class_code, c.name FROM classes c LEFT JOIN user_classes uc ON c.class_code = uc.class_code WHERE (c.user_id = $1 OR uc.user_id = $1) AND c.class_code IN (SELECT class_code FROM classes WHERE user_id = $2 UNION SELECT class_code FROM user_classes WHERE user_id = $2)';
      const sharedResult = await db.query(sharedQuery, [friend.friend_id, userId]);

      return {
        friend_id: friend.friend_id,
        first_name: friend.first_name,
        last_name: friend.last_name,
        shared_classes: sharedResult.rows
      }
    })
  )
  return friendsWithSharedClasses;
}

async function runTests() {
  const userId = "cmn9fnpv60000gox6sumckr25";
  try {
    console.log("--- Testing Quiz Overview (Fixed) ---");
    const quizzes = await testQuizOverview(userId);
    console.log("Result Count:", quizzes.length);
    console.log("Result Summary:", quizzes.map(q => q.class_name + ": " + q.quiz_count).join(", "));

    console.log("\n--- Testing Shared Classes (Fixed) ---");
    const shared = await testSharedClasses(userId);
    const friendsWithShared = shared.filter(f => f.shared_classes.length > 0);
    console.log("Friends with shared classes count:", friendsWithShared.length);
    if (friendsWithShared.length > 0) {
      console.log("Result (Friends with shared only):", JSON.stringify(friendsWithShared, null, 2));
    } else {
        console.log("Still no shared classes found for this user even with the new logic.");
    }

  } catch (err) {
    console.error(err);
  } finally {
    db.pool.end();
  }
}

runTests();
