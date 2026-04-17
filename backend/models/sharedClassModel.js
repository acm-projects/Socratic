const db = require('../db');
const { randomUUID } = require('crypto');

/**
 * Sync the shared_classes table for a specific user.
 * Finds all overlaps between the user and their friends across all classes.
 */
const syncSharedClasses = async (userId) => {
  // 1. Get all friends of the user
  const friendsRes = await db.query(
    "SELECT friend_id FROM friends WHERE user_id = $1",
    [userId]
  );
  const friendIds = friendsRes.rows.map(r => r.friend_id);

  if (friendIds.length === 0) return [];

  // 2. Identify all shared classes via dynamic overlap logic
  // A class is shared if user is in it (owner OR student) AND friend is in it (owner OR student)
  const syncQuery = `
    WITH user_all_classes AS (
      SELECT class_code, name FROM classes WHERE user_id = $1
      UNION
      SELECT uc.class_code, c.name FROM user_classes uc JOIN classes c ON uc.class_code = c.class_code WHERE uc.user_id = $1
    ),
    friend_all_classes AS (
      SELECT c.user_id as friend_id, c.class_code, c.name FROM classes c
      UNION
      SELECT uc.user_id as friend_id, uc.class_code, c.name FROM user_classes uc JOIN classes c ON uc.class_code = c.class_code
    )
    SELECT u.class_code, u.name, f.friend_id
    FROM user_all_classes u
    JOIN friend_all_classes f ON u.class_code = f.class_code
    WHERE f.friend_id = ANY($2)
  `;

  const overlaps = await db.query(syncQuery, [userId, friendIds]);

  // 3. Update the shared_classes table
  // We'll use a transaction to ensure atomicity
  const client = await db.connect();
  try {
    await client.query('BEGIN');

    // Remove old records for this user that are no longer valid (optional: or just UPSERT)
    // To be most efficient, we'll upsert and then delete orphans.
    
    const existingShared = await client.query(
      "SELECT friend_id, class_code FROM shared_classes WHERE user_id = $1",
      [userId]
    );

    const currentMap = new Set(overlaps.rows.map(r => `${r.friend_id}:${r.class_code}`));

    // Upsert new/existing overlaps
    for (const row of overlaps.rows) {
      await client.query(
        `INSERT INTO shared_classes (id, user_id, friend_id, class_code, class_name)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (user_id, friend_id, class_code) DO UPDATE SET class_name = $5`,
        [randomUUID(), userId, row.friend_id, row.class_code, row.name]
      );
    }

    // Delete records that are no longer shared
    for (const old of existingShared.rows) {
      if (!currentMap.has(`${old.friend_id}:${old.class_code}`)) {
        await client.query(
          "DELETE FROM shared_classes WHERE user_id = $1 AND friend_id = $2 AND class_code = $3",
          [userId, old.friend_id, old.class_code]
        );
      }
    }

    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error(`[SharedClassModel] ❌ Sync failed for ${userId}:`, e.message);
    throw e;
  } finally {
    client.release();
  }

  return overlaps.rows;
};

/**
 * Get shared classes from the persistence table for a list of friends.
 */
const getSharedClassesByUserId = async (userId) => {
  const result = await db.query(
    `SELECT friend_id, class_code, class_name 
     FROM shared_classes 
     WHERE user_id = $1`,
    [userId]
  );
  return result.rows;
};

module.exports = {
  syncSharedClasses,
  getSharedClassesByUserId
};
