const express = require('express');
const Account = require('../models/Account');
const router = express.Router();

router.post('/create-users', async (req, res) => {
 const users = [
  { username: 'Alice', password: 'alice123', balance: 1000 },
  { username: 'Bob', password: 'bob456', balance: 500 }
];
  try {
    const createdUsers = await Account.insertMany(users);
    res.status(201).json({ message: 'Users created', users: createdUsers });
  } catch (err) {
    res.status(500).json({ message: 'Error creating users', error: err.message });
  }
});

module.exports = router;