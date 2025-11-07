import React,{useState, useContext} from "react";
import api,{setAuthToken} from "../api";
import { AuthContext } from "../AuthProvider"; // implement simple provider
export default function Login(){
  const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login",{ email, password });
      setAuthToken(res.data.token);
      // optionally set user in context
      alert("Logged in");
    } catch(e){ alert(e.response?.data?.message || e.message); }
  };
  return (<form onSubmit={submit}>
    <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
    <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
    <button>Login</button>
  </form>);
}
