const express = require('express');
const router = express.Router();
const accountModel = require('../models/accountModel');

router.get('/user/:userId', async (req, res, next) => {
  try {
    const accounts = await accountModel.getAccountsByUserId(req.params.userId);
    res.json(accounts);
  } catch (error) { next(error); }
});

router.get('/:provider/:providerAccountId', async (req, res, next) => {
  try {
    const account = await accountModel.getAccountByProvider(req.params.provider, req.params.providerAccountId);
    res.json(account);
  } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  try {
    const newAccount = await accountModel.createAccount(req.body);
    res.json(newAccount);
  } catch (error) { next(error); }
});

router.put('/:provider/:providerAccountId', async (req, res, next) => {
  try {
    const { access_token, refresh_token } = req.body;
    const updatedAccount = await accountModel.updateAccountTokens(
      req.params.provider,
      req.params.providerAccountId,
      access_token,
      refresh_token
    );
    res.json(updatedAccount);
  } catch (error) { next(error); }
});

router.delete('/:provider/:providerAccountId', async (req, res, next) => {
  try {
    await accountModel.deleteAccount(req.params.provider, req.params.providerAccountId);
    res.json({ message: "Account unlinked" });
  } catch (error) { next(error); }
});

module.exports = router;
