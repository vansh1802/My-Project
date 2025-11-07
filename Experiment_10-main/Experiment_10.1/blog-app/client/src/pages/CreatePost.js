import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function CreatePost(){
  const [form, setForm] = useState({ title: "", body: "", tags: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const tags = form.tags.split(",").map(t=>t.trim()).filter(Boolean);
    const res = await API.post("/posts", { ...form, tags });
    nav(`/post/${res.data._id}`);
  };

  return (
    <form onSubmit={submit}>
      <h3>Create Post</h3>
      <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
      <textarea placeholder="Body" value={form.body} onChange={e=>setForm({...form, body:e.target.value})} />
      <input placeholder="tags (comma separated)" value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} />
      <button type="submit">Create</button>
    </form>
  );
}
