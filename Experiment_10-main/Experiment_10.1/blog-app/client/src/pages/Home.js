import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthProvider";

export default function Home(){
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(()=> {
    API.get("/posts").then(res => setPosts(res.data));
  }, []);

  return (
    <div>
      <h2>Blog</h2>
      {user && <Link to="/create">Create Post</Link>}
      {posts.map(p => (
        <div key={p._id} style={{border:"1px solid #ddd", margin:10, padding:10}}>
          <Link to={`/post/${p._id}`}><h3>{p.title}</h3></Link>
          <small>By {p.author?.name} • {new Date(p.createdAt).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}
