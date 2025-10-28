import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CustomerProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If not loading and user is not authenticated, redirect to login
    if (!loading && !isAuthenticated) {
      // Save the attempted location to redirect back after login
      navigate('/login', { 
        state: { from: location.pathname },
        replace: true 
      });
    }
  }, [loading, isAuthenticated, navigate, location.pathname]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mr-3"></div>
            <span className="text-gray-700 font-medium">Verifying authentication...</span>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render the protected content
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mr-3"></div>
            <span className="text-gray-700 font-medium">Redirecting to login...</span>
          </div>
          <p className="text-gray-600 text-sm">Please log in to access this page</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected content
  return children;
};

export default CustomerProtectedRoute;