import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Home from "./pages/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";
import CreatePost from "./pages/CreatePost";
import PostView from "./pages/PostView";

function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav style={{display:"flex", gap:10, padding:10}}>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create" element={<CreatePost/>} />
          <Route path="/post/:id" element={<PostView/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
