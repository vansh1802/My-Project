import express from "express";
const router = express.Router();

// Temporary user storage (in memory)
let users = [];

// Register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const userExists = users.find((u) => u.email === email);
  if (userExists) return res.status(400).json({ message: "User already exists" });

  const user = { name, email, password };
  users.push(user);

  res.json({ message: "Registration successful ✅", user });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ message: "Invalid credentials ❌" });

  res.json({ message: "Login successful ✅", token: "fake-token-123" });
});

export default router;
