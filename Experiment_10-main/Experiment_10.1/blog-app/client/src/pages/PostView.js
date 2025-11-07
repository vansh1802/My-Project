import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { useParams } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";
import { io } from "socket.io-client";

export default function PostView(){
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(()=> {
    API.get(`/posts/${id}`).then(res => setPost(res.data));
    API.get(`/comments/${id}`).then(res => setComments(res.data));

    const s = io("http://localhost:5000", { withCredentials: true });
    setSocket(s);
    s.emit("joinPost", id);

    s.on("new-comment", (comment) => {
      setComments(prev => [...prev, comment]);
    });

    return () => {
      s.emit("leavePost", id);
      s.disconnect();
    };
  }, [id]);

  const submitComment = async (e) => {
    e.preventDefault();
    if(!text) return;
    await API.post(`/comments/${id}`, { content: text });
    setText("");
    // server emits and socket handler will append comment
  };

  if(!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>By {post.author?.name}</p>
      <div>{post.body}</div>

      <hr/>
      <h4>Comments</h4>
      {comments.map(c => (
        <div key={c._id} style={{borderTop:"1px solid #eee", padding:5}}>
          <b>{c.author?.name}</b> <small>{new Date(c.createdAt).toLocaleString()}</small>
          <div>{c.content}</div>
        </div>
      ))}

      {user ? (
        <form onSubmit={submitComment}>
          <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Write a comment" />
          <button type="submit">Comment</button>
        </form>
      ) : <div>Please login to comment.</div>}
    </div>
  );
}
