"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Create context and provide a default value
const AuthContext = createContext(null);

// Auth provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // ✅ Add a token state
  const [token, setToken] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const userJson = localStorage.getItem("user");

    if (storedToken && userJson) {
      try {
        const userData = JSON.parse(userJson);
        setUser(userData);
        // ✅ Set the token from localStorage
        setToken(storedToken); 
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
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
    // ✅ Set the token in state
    setToken(token); 
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    // ✅ Clear the token from state
    setToken(null); 
  };

  return (
    // ✅ Include the token in the provider's value
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);