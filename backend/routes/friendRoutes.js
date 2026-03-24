const express = require('express');
const router = express.Router();
const friendModel = require('../models/friendModel');

router.get('/user/:userId', async (req, res, next) => {
  try {
    const friends = await friendModel.getFriendsByUserId(req.params.userId);
    res.json(friends);
  } catch (error) { next(error); }
});

router.get('/requests/:userId', async (req, res, next) => {
  try {
    const requests = await friendModel.getFriendRequestsForUser(req.params.userId);
    res.json(requests);
  } catch (error) { next(error); }
});

router.post('/requests', async (req, res, next) => {
  try {
    const newRequest = await friendModel.createFriendRequest(req.body);
    res.json(newRequest);
  } catch (error) { next(error); }
});

router.put('/requests/:id', async (req, res, next) => {
  try {
    const updatedRequest = await friendModel.updateFriendRequestStatus(req.params.id, req.body.status);
    res.json(updatedRequest);
  } catch (error) { next(error); }
});

module.exports = router;
