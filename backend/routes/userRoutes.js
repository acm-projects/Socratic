const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

router.get('/', async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    res.json(user);
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const newUser = await userModel.createUser(req.body);
    res.json(newUser);
  } catch (error) { next(error); }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = await userModel.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) { next(error); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) { next(error); }
});

module.exports = router;
