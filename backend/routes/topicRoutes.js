const express = require('express');
const router = express.Router();
const topicModel = require('../models/topicModel');

router.get('/', async (req, res, next) => {
  try {
    const topics = await topicModel.getAllTopics();
    res.json(topics);
  } catch (error) { next(error); }
});

router.get('/class/:code', async (req, res, next) => {
  try {
    const topics = await topicModel.getTopicsByClassCode(req.params.code);
    res.json(topics);
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const topic = await topicModel.getTopicById(req.params.id);
    res.json(topic);
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const newTopic = await topicModel.createTopic(req.body);
    res.json(newTopic);
  } catch (error) { next(error); }
});

module.exports = router;
