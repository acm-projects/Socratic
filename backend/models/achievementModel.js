const db = require('../db'); //database connection

const getAllAchievements = async () => { //get all achievements
  const result = await db.query("SELECT * FROM achievements"); //query to get all achievements
  return result.rows; //returning the all achievements
};

const getUserAchievements = async (userId) => { //get user achievements
  const result = await db.query("SELECT * FROM user_achievements WHERE user_id = $1", [userId]); //query to get user achievements
  return result.rows; //returning the user achievements
};

module.exports = { //exporting the achievement model so that it can be used in other files
  getAllAchievements, //exporting the getAllAchievements function
  getUserAchievements //exporting the getUserAchievements function
};
