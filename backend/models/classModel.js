const db = require('../db');

const getAllClasses = async (userId = null) => {
  const result = userId
    ? await db.query("SELECT * FROM classes WHERE user_id = $1", [userId])
    : await db.query("SELECT * FROM classes");
  return result.rows;
};
const getClassByCode = async (code) => {
  const result = await db.query("SELECT * FROM classes WHERE class_code = $1", [code]);
  return result.rows[0];
};

const createClass = async (data) => {
  const { class_code, subject, name, user_id } = data;

  // Check if this class_code already exists
  const existing = await db.query(
    "SELECT * FROM classes WHERE class_code = $1", [class_code]
  );

  if (existing.rows[0]) {
    // Belongs to same user — return it
    if (existing.rows[0].user_id === user_id) return existing.rows[0];

    // Belongs to different user — need a scoped version.
    // For null users: first check if ANY anonymous scoped version already exists
    // (we can't predict the suffix, so we do a prefix search)
    if (!user_id) {
      const existingAnon = await db.query(
        "SELECT * FROM classes WHERE class_code LIKE $1 AND user_id IS NULL ORDER BY created_at ASC LIMIT 1",
        [`${class_code}-%`]
      );
      if (existingAnon.rows[0]) return existingAnon.rows[0];
    }

    const suffix = user_id ? user_id.slice(-4) : Math.random().toString(36).slice(-4);
    const scopedCode = `${class_code}-${suffix}`;

    // Check if scoped version already exists for this user — return it if so
    const existingScoped = await db.query(
      "SELECT * FROM classes WHERE class_code = $1 AND user_id IS NOT DISTINCT FROM $2",
      [scopedCode, user_id || null]
    );
    if (existingScoped.rows[0]) return existingScoped.rows[0];

    const result = await db.query(
      `INSERT INTO classes (class_code, subject, name, user_id)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (class_code)
       DO UPDATE SET name = EXCLUDED.name, subject = EXCLUDED.subject
       RETURNING *`,
      [scopedCode, subject, name || class_code, user_id]
    );
    return result.rows[0];
  }

  // No conflict — insert normally
  const result = await db.query(
    `INSERT INTO classes (class_code, subject, name, user_id)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (class_code)
     DO UPDATE SET subject = EXCLUDED.subject,
                   name = EXCLUDED.name,
                   user_id = COALESCE(EXCLUDED.user_id, classes.user_id)
     RETURNING *`,
    [class_code, subject, name || class_code, user_id || null]
  );
  return result.rows[0];
};

/**
 * Ensures a class exists in the database.
 * If it doesn't, creates a placeholder record.
 */
const ensureClassExists = async (classCode, userId = null) => {
  const decoded = decodeURIComponent(classCode || '');
  const existing = await getClassByCode(decoded);
  if (existing) return existing;

  console.log(`[ClassModel] 🛠️ Auto-provisioning placeholder class: ${decoded}`);
  return await createClass({
    class_code: decoded,
    subject: 'General Study',
    name: decoded,
    user_id: userId
  });
};
const deleteClass = async (code) => {
  // Cascading deletes to avoid foreign key violations
  await db.query("DELETE FROM tasks WHERE class_code = $1", [code]);
  await db.query(
    "DELETE FROM chat_history WHERE session_id IN (SELECT session_id FROM chat_sessions WHERE class_code = $1)",
    [code]
  );
  await db.query("DELETE FROM chat_sessions WHERE class_code = $1", [code]);
  await db.query("DELETE FROM topics WHERE class_code = $1", [code]);
  await db.query("DELETE FROM syllabus_info WHERE class_code = $1", [code]);

  // Finally delete the class
  const result = await db.query("DELETE FROM classes WHERE class_code = $1 RETURNING *", [code]);
  return result.rows[0];
};

const deleteAllClasses = async () => {
  await db.query("DELETE FROM tasks");
  await db.query("DELETE FROM chat_history");
  await db.query("DELETE FROM chat_sessions");
  await db.query("DELETE FROM syllabus_info");
  await db.query("DELETE FROM topics");
  await db.query("DELETE FROM classes");
};

module.exports = {
  getAllClasses,
  getClassByCode,
  createClass,
  ensureClassExists,
  deleteClass,
  deleteAllClasses
};
