const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const taskModel = require('../models/taskModel');
const db = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) { next(error); }
});

/**
 * GET /api/users/:id/classes
 * Returns all classes a user is enrolled in (via user_classes table),
 * joined with full class details from the classes table.
 */
router.get('/:id/classes', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT
         c.class_code,
         c.name,
         c.subject,
         c.syllabus_url,
         c.streak,
         c.last_activity_date,
         c.created_at,
         uc.enrolled_at
       FROM user_classes uc
       JOIN classes c ON c.class_code = uc.class_code
       WHERE uc.user_id = $1
       ORDER BY uc.enrolled_at DESC`,
      [id]
    );
    res.json(result.rows);
  } catch (error) { next(error); }
});
/**
 * GET /api/users/:id/upcoming-tasks
 * Returns all upcoming tasks for a specific user across all enrolled classes.
 */
router.get('/:id/upcoming-tasks', async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await taskModel.getUpcomingTasksByUserId(id);
    res.json(tasks);
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
