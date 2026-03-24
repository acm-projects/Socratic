const express = require('express');
const router = express.Router();
const userStatsModel = require('../models/userStatsModel');

router.get('/user/:userId', async (req, res, next) => {
  try {
    const stats = await userStatsModel.getUserXpStats(req.params.userId);
    res.json(stats);
  } catch (error) { next(error); }
});

router.get('/topic/:topicId', async (req, res, next) => {
  try {
    const metrics = await userStatsModel.getTopicMetrics(req.params.topicId);
    res.json(metrics);
  } catch (error) { next(error); }
});

module.exports = router;
