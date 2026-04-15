const db = require('../db');

const getAllUsers = async () => {
  const result = await db.query('SELECT * FROM "User"');
  return result.rows;
};

const getUserById = async (id) => {
  const result = await db.query('SELECT * FROM "User" WHERE id = $1', [id]);
  return result.rows[0];
};

const createUser = async (data) => {
  const { id, email, total_xp, weekly_xp, image } = data;
  const result = await db.query(
    'INSERT INTO "User" (id, email, total_xp, weekly_xp, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id, email, total_xp, weekly_xp, image]
  );
  return result.rows[0];
};

const updateUser = async (id, data) => {
  // Fetch existing user to prevent overwriting with null
  const existingResult = await db.query('SELECT * FROM "User" WHERE id = $1', [id]);
  if (!existingResult.rows[0]) return null;
  const existing = existingResult.rows[0];

  const email = data.email !== undefined ? data.email : existing.email;
  const total_xp = data.total_xp !== undefined ? data.total_xp : existing.total_xp;
  const weekly_xp = data.weekly_xp !== undefined ? data.weekly_xp : existing.weekly_xp;
  // Crucially, only update image if they actually provided a valid non-null string
  const image = data.image ? data.image : existing.image;
  const first_name = data.first_name !== undefined ? data.first_name : existing.first_name;
  const last_name = data.last_name !== undefined ? data.last_name : existing.last_name;
  const school = data.school !== undefined ? data.school : existing.school;
  const major = data.major !== undefined ? data.major : existing.major;
  const class_status = data.class_status !== undefined ? data.class_status : existing.class_status;
  const streak = data.streak !== undefined ? data.streak : existing.streak;
  
  const result = await db.query(
    `UPDATE "User" SET 
       email = $1, total_xp = $2, weekly_xp = $3, image = $4,
       first_name = $5, last_name = $6, school = $7, major = $8, 
       class_status = $9, streak = $10 
     WHERE id = $11 
     RETURNING *`,
    [email, total_xp, weekly_xp, image, first_name, last_name, school, major, class_status, streak, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  await db.query('DELETE FROM "User" WHERE id = $1', [id]);
};

const getUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM "User" WHERE email = $1', [email]);
  return result.rows[0];
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};
