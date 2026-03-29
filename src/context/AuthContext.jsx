import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Try to load auth state from localStorage so it persists across refreshes
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('mrbeans_auth');
    return saved === 'true';
  });

  const login = (password) => {
    // Temporary hardcoded credential until Supabase Auth is added
    if (password === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('mrbeans_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('mrbeans_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
