import React from 'react';
import AdminLoginForm from '../components/features/admin/AdminLoginForm';

const AdminLogin = ({ error }) => {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <AdminLoginForm error={error} />
    </div>
  );
};

export default AdminLogin;
