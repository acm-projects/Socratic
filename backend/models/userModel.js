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
  const { 
    email, total_xp, weekly_xp, image, 
    first_name, last_name, school, major, class_status, streak 
  } = data;
  
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
