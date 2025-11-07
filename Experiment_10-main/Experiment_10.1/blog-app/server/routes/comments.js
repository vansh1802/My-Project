const express = require("express");
const auth = require("../middleware/auth");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const router = express.Router();

// Add comment to a post
router.post("/:postId", auth, async (req, res) => {
  const { content } = req.body;
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const comment = await Comment.create({
    post: post._id,
    author: req.user._id,
    content
  });
  const populated = await comment.populate("author", "name avatarUrl").execPopulate();

  // Emit new-comment to socket room for this post
  const io = req.app.get("io");
  io.to(post._id.toString()).emit("new-comment", populated);

  res.json(populated);
});

// Get comments of a post
router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).populate("author", "name avatarUrl").sort({ createdAt: 1 });
  res.json(comments);
});

module.exports = router;
