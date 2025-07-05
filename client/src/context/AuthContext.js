import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
      // You can add a call here to a `/api/auth/me` endpoint to get user data on load
      setAuth({ token, isAuthenticated: true, loading: false });
    } else {
      setAuth({ token: null, isAuthenticated: false, loading: false });
    }
  }, []);

  const login = async (formData) => {
    const res = await axios.post("/api/auth/login", formData);
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["x-auth-token"] = res.data.token;
    setAuth({ token: res.data.token, isAuthenticated: true, loading: false });
  };

  const register = async (formData) => {
    const res = await axios.post("/api/auth/register", formData);
    localStorage.setItem("token", res.data.token);
    axios.defaults.headers.common["x-auth-token"] = res.data.token;
    setAuth({ token: res.data.token, isAuthenticated: true, loading: false });
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    setAuth({ token: null, isAuthenticated: false, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
