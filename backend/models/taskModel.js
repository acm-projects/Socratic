const db = require('../db');

/**
 * Fetches all upcoming tasks for a specific user across all their enrolled classes.
 * Joins user_classes with class_tasks and classes to provide a comprehensive list.
 */
const getUpcomingTasksByUserId = async (userId) => {
  const query = `
    SELECT
      ct.id,
      ct.class_code,
      c.name AS class_name,
      ct.task_name,
      ct.due_date,
      ct.completed,
      ct.completed AS is_completed,
      ct.created_at
    FROM user_classes uc
    JOIN classes c ON c.class_code = uc.class_code
    JOIN class_tasks ct ON ct.class_code = c.class_code
    WHERE uc.user_id = $1
      AND ct.due_date >= CURRENT_DATE - INTERVAL '1 day'
    ORDER BY ct.due_date ASC;
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
};

/**
 * Updates the completion status of a specific task.
 */
const updateTaskStatus = async (taskId, completed) => {
  const query = `
    UPDATE class_tasks
    SET completed = $2
    WHERE id = $1
    RETURNING *;
  `;
  const result = await db.query(query, [taskId, completed]);
  return result.rows[0];
};

module.exports = {
  getUpcomingTasksByUserId,
  updateTaskStatus
};
