"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create context and provide a default value
const AuthContext = createContext(null);

// Auth provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");

    // Check if both the token and the user data exist before parsing
    if (token && userJson) {
      try {
        const userData = JSON.parse(userJson);
        setUser(userData);
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        // Clear storage if data is corrupted
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);