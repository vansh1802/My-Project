const express = require("express");
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const router = express.Router();

// Create post
router.post("/", auth, async (req, res) => {
  const { title, body, tags } = req.body;
  const post = await Post.create({ author: req.user._id, title, body, tags });
  res.json(post);
});

// Get all posts (with author info)
router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "name avatarUrl").sort({ createdAt: -1 });
  res.json(posts);
});

// Get post by id
router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "name avatarUrl");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

// Update post (only owner)
router.put("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if(!post) return res.status(404).json({message:"Not found"});
  if(post.author.toString() !== req.user._id.toString()) return res.status(403).json({message:"Forbidden"});
  const { title, body, tags } = req.body;
  post.title = title; post.body = body; post.tags = tags;
  await post.save();
  res.json(post);
});

// Delete
router.delete("/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if(!post) return res.status(404).json({message:"Not found"});
  if(post.author.toString() !== req.user._id.toString()) return res.status(403).json({message:"Forbidden"});
  await post.remove();
  res.json({ message: "Deleted" });
});

module.exports = router;
