const express = require('express');
const jwt = require('jsonwebtoken');
const Account = require('../models/Account');
const router = express.Router();
const SECRET_KEY = 'yourSecretKey';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await Account.findOne({ username, password });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

module.exports = router;