const express = require('express');
const authenticateToken = require('../middleware/authenticateJWT');
const router = express.Router();

router.get('/public', (req, res) => {
  res.send('This is a public route. No authentication required.');
});

router.get('/protected', authenticateToken, (req, res) => {
  res.send('You have accessed a protected route with a valid Bearer token!');
});

module.exports = router;