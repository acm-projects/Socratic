const db = require('../db');

/**
 * Fetches all upcoming tasks for a specific user across all their enrolled classes.
 * Joins user_classes with class_tasks and classes to provide a comprehensive list.
 */
const getUpcomingTasksByUserId = async (userId) => {
  const query = `
    SELECT DISTINCT
      ct.id,
      ct.class_code,
      c.name AS class_name,
      ct.task_name,
      ct.due_date,
      ct.completed,
      ct.completed AS is_completed,
      ct.created_at
    FROM class_tasks ct
    JOIN classes c ON c.class_code = ct.class_code
    LEFT JOIN user_classes uc ON uc.class_code = c.class_code AND uc.user_id = $1
    WHERE (c.user_id = $1 OR uc.user_id = $1)
      AND ct.due_date >= CURRENT_DATE
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
