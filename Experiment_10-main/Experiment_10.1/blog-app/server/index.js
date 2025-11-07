import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.log(err));

// ✅ User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model("User", userSchema);

// ✅ Register Route
app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    res.json({ message: "User registered successfully ✅" });
  } catch (err) {
    res.status(400).json({ message: "Email already exists ❌" });
  }
});

// ✅ Login Route
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found ❌" });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ message: "Wrong password ❌" });

  const token = jwt.sign({ id: user._id }, "secret123", { expiresIn: "1h" });

  res.json({
    message: "Login successful ✅",
    token
  });
});

// ✅ Default API test route
app.get("/", (req, res) => {
  res.send("✅ Blog backend running");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
