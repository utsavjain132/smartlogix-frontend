import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // If user has token but wrong role, redirect to their correct dashboard or home
    if (role === 'BUSINESS') return <Navigate to="/business-dashboard" replace />;
    if (role === 'TRUCKER') return <Navigate to="/trucker-dashboard" replace />;
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;