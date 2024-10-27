// src/components/Auth/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { auth } = useAuth();

  return auth ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
