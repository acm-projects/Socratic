const db = require('../db');

const getAllAchievements = async () => {
  const result = await db.query("SELECT * FROM achievements");
  return result.rows;
};

const getUserAchievements = async (userId) => {
  const result = await db.query("SELECT * FROM user_achievements WHERE user_id = $1", [userId]);
  return result.rows;
};

module.exports = {
  getAllAchievements,
  getUserAchievements
};
