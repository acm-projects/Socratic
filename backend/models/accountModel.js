const db = require('../db');

const getAccountsByUserId = async (userId) => {
  const result = await db.query(
    'SELECT * FROM "Account" WHERE "userId" = $1 OR "providerAccountId" = $1',
    [userId]
  );
  return result.rows;
};

const getAccountByProvider = async (provider, providerAccountId) => {
  const result = await db.query(
    'SELECT * FROM "Account" WHERE provider = $1 AND "providerAccountId" = $2',
    [provider, providerAccountId]
  );
  return result.rows[0];
};

const createAccount = async (data) => {
  const { userId, provider, providerAccountId, access_token, refresh_token, type } = data;
  const result = await db.query(
    'INSERT INTO "Account" ("userId", provider, "providerAccountId", access_token, refresh_token, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [userId, provider, providerAccountId, access_token, refresh_token, type]
  );
  return result.rows[0];
};

const updateAccountTokens = async (provider, providerAccountId, access_token, refresh_token) => {
  const result = await db.query(
    'UPDATE "Account" SET access_token = $1, refresh_token = $2 WHERE provider = $3 AND "providerAccountId" = $4 RETURNING *',
    [access_token, refresh_token, provider, providerAccountId]
  );
  return result.rows[0];
};

const deleteAccount = async (provider, providerAccountId) => {
  await db.query(
    'DELETE FROM "Account" WHERE provider = $1 AND "providerAccountId" = $2',
    [provider, providerAccountId]
  );
};

module.exports = {
  getAccountsByUserId,
  getAccountByProvider,
  createAccount,
  updateAccountTokens,
  deleteAccount
};
