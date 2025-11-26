// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { setToken, getToken } from '../api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      // you can later load user info here if you store it in localStorage
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = { user, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
