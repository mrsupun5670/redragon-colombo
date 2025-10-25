import React from 'react';
import { Navigate } from 'react-router-dom';
import { userUtils } from '../../services/api';

const AdminGuestRoute = ({ children }) => {
  const isAdmin = userUtils.isAdmin();
  
  // If admin is authenticated, redirect to admin dashboard
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }
  
  // If admin is not authenticated, show the admin login page
  return children;
};

export default AdminGuestRoute;