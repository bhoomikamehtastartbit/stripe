import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('customerId') && !!localStorage.getItem('email');

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
