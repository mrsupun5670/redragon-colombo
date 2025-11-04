import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLoginForm from '../features/admin/AdminLoginForm';

const AdminProtectedRoute = ({ children }) => {
  const { admin, loading, error } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-red-600 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mr-3"></div>
            <span className="text-gray-700 font-medium">Checking authentication...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!admin) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <AdminLoginForm error={error} />
      </div>
    );
  }

  return children;
};

export default AdminProtectedRoute;