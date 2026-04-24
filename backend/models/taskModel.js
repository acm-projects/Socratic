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
      ct.created_at,
      'task' AS entry_type
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

const updateTask = async (taskId, taskData) => {
  const { task_name, due_date, completed } = taskData;
  const updates = [];
  const values = [];
  let idx = 1;
  if (task_name !== undefined) { updates.push(`task_name = $${idx++}`); values.push(task_name); }
  if (due_date !== undefined) { updates.push(`due_date = $${idx++}`); values.push(due_date); }
  if (completed !== undefined) { updates.push(`completed = $${idx++}`); values.push(completed); }
  if (updates.length === 0) return null;
  values.push(taskId);
  const result = await db.query(
    `UPDATE class_tasks SET ${updates.join(', ')} WHERE id = $${idx} RETURNING *`,
    values
  );
  return result.rows[0] || null;
};

/**
 * Creates a new task for a specific class.
 */
const createTask = async (taskData) => {
  const { id, class_code, task_name, due_date } = taskData;
  const taskId = id || require('crypto').randomUUID();
  const query = `
    INSERT INTO class_tasks (id, class_code, task_name, due_date)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const result = await db.query(query, [taskId, class_code, task_name, due_date]);
  return result.rows[0];
};

module.exports = {
  getUpcomingTasksByUserId,
  updateTaskStatus,
  updateTask,
  createTask
};
