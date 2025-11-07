const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  res.json(req.user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

router.put("/me", auth, async (req, res) => {
  const { name, bio, avatarUrl } = req.body;
  const user = await User.findByIdAndUpdate(req.user._id, { name, bio, avatarUrl }, { new: true }).select("-passwordHash");
  res.json(user);
});

module.exports = router;
