import React, { createContext, useState, useEffect } from "react";
import API, { setAuthToken } from "../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if(token) {
      setAuthToken(token);
      // fetch current user
      API.get("/users/me").then(res => setUser(res.data)).catch(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        setAuthToken(null);
      });
    }
  }, [token]);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    setAuthToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setAuthToken(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
