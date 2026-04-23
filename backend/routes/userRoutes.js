const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');
const taskModel = require('../models/taskModel');
const sharedClassModel = require('../models/sharedClassModel');
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
       LEFT JOIN user_classes uc ON c.class_code = uc.class_code AND uc.user_id IN (
         SELECT id FROM "User" WHERE email = (SELECT email FROM "User" WHERE id = $1)
         UNION
         SELECT $1
       )
       WHERE c.user_id IN (
         SELECT id FROM "User" WHERE email = (SELECT email FROM "User" WHERE id = $1)
         UNION
         SELECT $1
       ) OR uc.user_id IN (
         SELECT id FROM "User" WHERE email = (SELECT email FROM "User" WHERE id = $1)
         UNION
         SELECT $1
       )
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
 * GET /api/users/:id/quiz-overview
 * Returns an overview of quizzes taken by the user, grouped by class.
 */
router.get('/:id/quiz-overview', async (req, res, next) => {
  try {
    const userId = req.params.id

    const result = await db.query(
      `SELECT COALESCE(c.name, 'Uncategorized') as class_name, 
              COALESCE(c.class_code, 'N/A') as class_code,
              COUNT(q.id) as quiz_count,
              ROUND(AVG(q.score), 1) as average_score,
              MAX(q.color) as color
       FROM quizzes q
       LEFT JOIN topics t ON t.id = q.topic_id
       LEFT JOIN classes c ON c.class_code = t.class_code
       WHERE q.user_id IN (
         SELECT id FROM "User" WHERE email = (SELECT email FROM "User" WHERE id = $1)
         UNION
         SELECT $1
       )
       GROUP BY COALESCE(c.name, 'Uncategorized'), COALESCE(c.class_code, 'N/A')
       ORDER BY quiz_count DESC`,
      [userId]
    )

    const COLORS = ['#10B981','#8B5CF6','#3B82F6','#EC4899','#F59E0B','#06B6D4']
    res.json(result.rows.map((row, i) => ({
      class_name: row.class_name,
      class_code: row.class_code,
      quiz_count: parseInt(row.quiz_count),
      average_score: parseFloat(row.average_score),
      color: row.color || COLORS[i % COLORS.length]
    })))
  } catch (error) { next(error) }
})

/**
 * GET /api/users/:id/friends/shared-classes
 * Returns friends of the user along with the classes they share.
 */
router.get('/:id/friends/shared-classes', async (req, res, next) => {
  try {
    const userId = req.params.id

    const friendsResult = await db.query(
      `SELECT f.friend_id, u.first_name, u.last_name, u.image 
       FROM friends f
       JOIN "User" u ON f.friend_id = u.id
       WHERE f.user_id = $1`,
      [userId]
    )

    // 1. Trigger an automated sync to ensure the shared_classes table is updated
    await sharedClassModel.syncSharedClasses(userId);

    // 2. Fetch the updated results from the persistence table
    const sharedClassesFromTable = await sharedClassModel.getSharedClassesByUserId(userId);

    // 3. Map the results back to the friend-grouped format
    const friendsWithSharedClasses = friendsResult.rows.map((friend) => {
      // Filter the synced results for this specific friend
      const friendShared = sharedClassesFromTable.filter(r => r.friend_id === friend.friend_id);

      return {
        friend_id: friend.friend_id,
        first_name: friend.first_name,
        last_name: friend.last_name,
        image: friend.image,
        shared_classes: friendShared.map(r => ({
          class_code: r.class_code,
          name: r.class_name
        }))
      };
    });

    res.json(friendsWithSharedClasses);
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

router.put('/:id/tasks/:taskId', async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { task_name, due_date, completed } = req.body;
    if (task_name === undefined && due_date === undefined && completed === undefined) {
      return res.status(400).json({ error: 'No fields to update' });
    }
    const updatedTask = await taskModel.updateTask(taskId, { task_name, due_date, completed });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
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

router.get('/:id/sessions', async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT session_id, class_code, user_id, topic_id, title, created_at 
       FROM chat_sessions 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [req.params.id]
    );
    res.json(result.rows);
  } catch (error) { next(error); }
});

module.exports = router;
