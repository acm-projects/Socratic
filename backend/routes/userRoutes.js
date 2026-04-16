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
      `SELECT DISTINCT
         c.class_code,
         c.name,
         c.subject,
         c.syllabus_url,
         c.streak,
         c.last_activity_date,
         c.created_at,
         COALESCE(uc.enrolled_at, c.created_at) as enrolled_at
       FROM classes c
       LEFT JOIN user_classes uc ON c.class_code = uc.class_code AND uc.user_id = $1
       WHERE c.user_id = $1 OR uc.user_id = $1
       ORDER BY enrolled_at DESC`,
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

/**
 * GET /api/users/:id/friends/shared-classes
 * Returns friends of the user along with the classes they share.
 */
router.get('/:id/friends/shared-classes', async (req, res, next) => {
  try {
    const userId = req.params.id

    const userClasses = await db.query(
      "SELECT class_code FROM classes WHERE user_id = $1",
      [userId]
    )
    const userClassCodes = userClasses.rows.map(r => r.class_code)

    const friendsResult = await db.query(
      `SELECT f.friend_id, u.first_name, u.last_name, u.image 
       FROM friends f
       JOIN "User" u ON f.friend_id = u.id
       WHERE f.user_id = $1`,
      [userId]
    )

    const friendsWithSharedClasses = await Promise.all(
      friendsResult.rows.map(async (friend) => {
        const sharedResult = await db.query(
          `SELECT c.class_code, c.name
           FROM classes c
           WHERE c.user_id = $1
           AND c.class_code = ANY($2::text[])`,
          [friend.friend_id, userClassCodes]
        )

        return {
          friend_id: friend.friend_id,
          first_name: friend.first_name,
          last_name: friend.last_name,
          image: friend.image,
          shared_classes: sharedResult.rows.map(r => ({
            class_code: r.class_code,
            name: r.name
          }))
        }
      })
    )

    res.json(friendsWithSharedClasses)
  } catch (error) { next(error) }
})

/**
 * PATCH /api/users/:id/tasks/:taskId
 * Updates the completion status of a specific task.
 */
router.patch('/:id/tasks/:taskId', async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { completed } = req.body;
    
    if (completed === undefined) {
      return res.status(400).json({ error: "Missing required field: completed" });
    }

    const updatedTask = await taskModel.updateTaskStatus(taskId, completed);
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
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
