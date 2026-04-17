const db = require('../db');

const getFriendsByUserId = async (userId) => {
  const query = `
    SELECT f.*, u.image AS profile_pic, u.image, u.first_name, u.last_name, u.email
    FROM friends f
    JOIN "User" u ON f.friend_id = u.id
    WHERE f.user_id = $1
  `;
  const result = await db.query(query, [userId]);
  return result.rows;
};

const getFriendRequestsForUser = async (userId) => {
  const result = await db.query("SELECT * FROM friend_requests WHERE receiver_id = $1", [userId]);
  return result.rows;
};

const createFriendRequest = async (data) => {
  const { id, sender_id, receiver_id, status } = data;
  const result = await db.query(
    "INSERT INTO friend_requests (id, sender_id, receiver_id, status) VALUES ($1, $2, $3, $4) RETURNING *",
    [id, sender_id, receiver_id, status]
  );
  return result.rows[0];
};

const updateFriendRequestStatus = async (id, status) => {
  const result = await db.query(
    "UPDATE friend_requests SET status = $1 WHERE id = $2 RETURNING *",
    [status, id]
  );
  return result.rows[0];
};

module.exports = {
  getFriendsByUserId,
  getFriendRequestsForUser,
  createFriendRequest,
  updateFriendRequestStatus
};
