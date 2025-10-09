// Middleware to validate request body before transfer
const validateTransfer = (req, res, next) => {
  const { sender, receiver, amount } = req.body;

  if (!sender || !receiver || !amount) {
    return res.status(400).json({ error: 'Sender, receiver, and amount are required' });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: 'Transfer amount must be greater than zero' });
  }

  next();
};

module.exports = validateTransfer;
