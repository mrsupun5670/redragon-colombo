import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminRouteGuard = ({ children }) => {
  const { admin, loading } = useAdminAuth();
  const navigate = useNavigate();

  // Immediate check for admin token - don't even render if admin
  const adminToken = localStorage.getItem('adminToken');
  
  // Immediate check on component mount for localStorage admin token
  useEffect(() => {
    // If there's an admin token in localStorage, immediately redirect
    if (adminToken) {
      console.log('Admin token found in localStorage, redirecting to admin panel...');
      navigate('/admin', { replace: true });
      return;
    }
    
    // If admin is authenticated through context, redirect
    if (!loading && admin) {
      console.log('Admin detected via context, redirecting to admin panel...');
      navigate('/admin', { replace: true });
    }
  }, [admin, loading, navigate, adminToken]);

  // If admin token exists, don't render anything - just redirect
  if (adminToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mr-3"></div>
            <span className="text-gray-700 font-medium">Redirecting to admin panel...</span>
          </div>
        </div>
      </div>
    );
  }

  // If loading, show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mr-3"></div>
            <span className="text-gray-700 font-medium">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // If admin is authenticated, don't render the customer component
  if (admin) {
    return null; // This will trigger the useEffect redirect above
  }

  // If not admin or not authenticated, render the customer component
  return children;
};

export default AdminRouteGuard;