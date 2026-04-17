const pool = require('../db');

/**
 * Merges duplicate user accounts that share the same email.
 * Favoring CUIDs (alphanumeric) over Google IDs (numeric) as the primary account.
 */
async function runMigration() {
  const client = await pool.connect();
  console.log("=== Starting Account Migration ===");

  try {
    await client.query('BEGIN');

    // 1. Find emails with more than 1 account
    const duplicatesRes = await client.query(`
      SELECT email, COUNT(*) as count 
      FROM "User" 
      GROUP BY email 
      HAVING COUNT(*) > 1
    `);

    const emails = duplicatesRes.rows.map(r => r.email);
    console.log(`Found ${emails.length} emails with split-brain accounts:`, emails);

    for (const email of emails) {
      console.log(`\n--- Processing ${email} ---`);
      
      const accRes = await client.query('SELECT * FROM "User" WHERE email = $1', [email]);
      const accounts = accRes.rows;

      // Identify the CUID vs Google ID
      // CUIDs are typically 25 chars and start with 'c' (e.g. cmn9...). Google IDs are purely numeric.
      let primaryId = accounts.find(a => isNaN(Number(a.id)))?.id;
      let secondaryId = accounts.find(a => !isNaN(Number(a.id)))?.id;

      let primaryAcc = accounts.find(a => a.id === primaryId);
      let secondaryAcc = accounts.find(a => a.id === secondaryId);

      // Fallback: If both are numeric or both are alphabetic, just take the oldest one
      if (!primaryId || !secondaryId) {
         accounts.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
         primaryAcc = accounts[0];
         secondaryAcc = accounts[1];
         primaryId = primaryAcc.id;
         secondaryId = secondaryAcc.id;
      }

      console.log(`Primary ID (Keeping): ${primaryId}`);
      console.log(`Secondary ID (Merging & Deleting): ${secondaryId}`);

      // 2. Transfer relationships
      
      // Transfer user_classes (ignore conflicts)
      await client.query(`
        UPDATE user_classes 
        SET user_id = $1 
        WHERE user_id = $2 
          AND NOT EXISTS (SELECT 1 FROM user_classes uc WHERE uc.user_id = $1 AND uc.class_code = user_classes.class_code)
      `, [primaryId, secondaryId]).catch(()=>console.log("no user_classes"));
      
      await client.query('DELETE FROM user_classes WHERE user_id = $1', [secondaryId]).catch(()=>console.log("no user_classes"));

      // Transfer chat_sessions
      await client.query(`UPDATE chat_sessions SET user_id = $1 WHERE user_id = $2`, [primaryId, secondaryId]).catch(e => console.log('Err chat_sessions', e.message));
      
      // Transfer friends
      await client.query(`UPDATE friends SET user_id = $1 WHERE user_id = $2 ON CONFLICT DO NOTHING`, [primaryId, secondaryId]).catch(e => console.log('Err friends', e.message));
      await client.query(`UPDATE friends SET friend_id = $1 WHERE friend_id = $2 ON CONFLICT DO NOTHING`, [primaryId, secondaryId]).catch(e => console.log('Err friends', e.message));
      
      // Transfer xp_system
      await client.query(`UPDATE xp_system SET user_id = $1 WHERE user_id = $2`, [primaryId, secondaryId]).catch(e => console.log('Err xp_system', e.message));

      // Transfer Accounts (OAuth links)
      await client.query(`UPDATE "Account" SET "userId" = $1 WHERE "userId" = $2 ON CONFLICT DO NOTHING`, [primaryId, secondaryId]).catch(e => console.log('Err Account', e.message));

      // 3. Merge profile data (take non-null values from secondary if primary is missing)
      const mergedImage = primaryAcc.image || secondaryAcc.image;
      const mergedFirstName = primaryAcc.first_name || secondaryAcc.first_name;
      const mergedLastName = primaryAcc.last_name || secondaryAcc.last_name;
      const mergedTotalXp = Math.max(primaryAcc.total_xp || 0, secondaryAcc.total_xp || 0);

      await client.query(`
        UPDATE "User"
        SET image = $1, first_name = $2, last_name = $3, total_xp = $4
        WHERE id = $5
      `, [mergedImage, mergedFirstName, mergedLastName, mergedTotalXp, primaryId]);

      // 4. Delete the secondary account!
      await client.query(`DELETE FROM "User" WHERE id = $1`, [secondaryId]);
      
      console.log(`✅ Successfully merged and deleted secondary account for ${email}`);
    }

    await client.query('COMMIT');
    console.log("\n=== Migration Complete ===");

  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Migration failed, rolling back:", err);
  } finally {
    client.release();
    process.exit();
  }
}

runMigration();
