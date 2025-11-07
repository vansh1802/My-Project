import express from "express";
const router = express.Router();

// Temporary in-memory users (later you will replace with MongoDB)
let users = [];

// Register route
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const exists = users.find((u) => u.email === email);
  if (exists) return res.status(400).json({ message: "User already exists" });

  const user = { name, email, password };
  users.push(user);

  res.json({ message: "Registration successful ✅", user });
});

// Login route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful ✅", token: "fake-token-123" });
});

export default router;
