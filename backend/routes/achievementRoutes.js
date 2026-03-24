const express = require('express');
const router = express.Router();
const achievementModel = require('../models/achievementModel');

router.get('/', async (req, res, next) => {
  try {
    const achievements = await achievementModel.getAllAchievements();
    res.json(achievements);
  } catch (error) { next(error); }
});

router.get('/user/:userId', async (req, res, next) => {
  try {
    const userAchievements = await achievementModel.getUserAchievements(req.params.userId);
    res.json(userAchievements);
  } catch (error) { next(error); }
});

module.exports = router;
