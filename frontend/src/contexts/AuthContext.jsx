// src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        api.defaults.headers.common['x-access-token'] = token;
        const userData = JSON.parse(localStorage.getItem('user'));
        setAuth(userData);
      } catch (error) {
        console.error('Erreur lors du chargement de l\'utilisateur', error);
        logout();
      }
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['x-access-token'];
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
