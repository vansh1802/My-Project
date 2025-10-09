const express = require('express');
const Account = require('../models/Account');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();

router.get('/balance', authenticateJWT, async (req, res) => {
  const account = await Account.findById(req.user.id);
  res.json({ balance: account.balance });
});

router.post('/deposit', authenticateJWT, async (req, res) => {
  const { amount } = req.body;
  const account = await Account.findById(req.user.id);
  account.balance += amount;
  await account.save();
  res.json({ message: `Deposited $${amount}`, newBalance: account.balance });
});

router.post('/withdraw', authenticateJWT, async (req, res) => {
  const { amount } = req.body;
  const account = await Account.findById(req.user.id);
  if (account.balance < amount) {
    return res.status(400).json({ message: 'Insufficient balance' });
  }
  account.balance -= amount;
  await account.save();
  res.json({ message: `Withdraw $${amount}`, newBalance: account.balance });
});

module.exports = router;