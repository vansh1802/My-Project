import express from "express";
import auth from "../middleware/auth.js";
import { Post, User } from "../models/index.js";
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// create post (text + optional imageUrl)
router.post("/", auth, async (req, res) => {
  const { content, imageUrl } = req.body;
  const post = await Post.create({ content, imageUrl, userId: req.user.id });
  res.json(post);
});

// feed
router.get("/", async (req, res) => {
  const posts = await Post.findAll({ order: [["createdAt","DESC"]], include: [{ model: User, attributes: ["id","name","avatarUrl"] }] });
  res.json(posts);
});

// presigned url for direct upload to S3
router.get("/s3-url", auth, async (req, res) => {
  const s3 = new AWS.S3({ region: process.env.AWS_REGION });
  const Key = `posts/${req.user.id}/${Date.now()}.jpg`; // adjust ext by frontend
  const params = {
    Bucket: process.env.S3_BUCKET,
    Key,
    Expires: 60,
    ContentType: "image/jpeg",
  };
  const url = await s3.getSignedUrlPromise("putObject", params);
  res.json({ url, key: Key, publicUrl: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${Key}` });
});

export default router;
