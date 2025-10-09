const express = require('express');
const Account = require('../models/Account');
const authenticateJWT = require('../middleware/authenticateJWT');
const router = express.Router();

router.post('/transfer', authenticateJWT, async (req, res) => {
  const { toUsername, amount } = req.body;
  const sender = await Account.findById(req.user.id);
  const receiver = await Account.findOne({ username: toUsername });

  if (!receiver) return res.status(404).json({ message: 'Receiver not found' });
  if (sender.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });

  sender.balance -= amount;
  receiver.balance += amount;

  await sender.save();
  await receiver.save();

  res.json({ message: `Transferred $${amount} to ${toUsername}`, senderBalance: sender.balance });
});

module.exports = router;