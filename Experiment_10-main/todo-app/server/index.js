import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// ✅ Todo Schema
const TodoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean
});

const TodoModel = mongoose.model("Todo", TodoSchema);

// ✅ Create Todo
app.post("/todos", async (req, res) => {
  const todo = await TodoModel.create(req.body);
  res.json(todo);
});

// ✅ Get Todos
app.get("/todos", async (req, res) => {
  const todos = await TodoModel.find();
  res.json(todos);
});

// ✅ Update Todo
app.put("/todos/:id", async (req, res) => {
  const updated = await TodoModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// ✅ Delete Todo
app.delete("/todos/:id", async (req, res) => {
  await TodoModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo Deleted ✅" });
});

// ✅ Start Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));
