import React from 'react';
import { Navigate } from 'react-router-dom';
import { userUtils } from '../../services/api';

const GuestRoute = ({ children }) => {
  const isAuthenticated = userUtils.isAuthenticated();
  
  // If user is authenticated, redirect to account page
  if (isAuthenticated) {
    return <Navigate to="/account" replace />;
  }
  
  // If user is not authenticated, show the login/register page
  return children;
};

export default GuestRoute;