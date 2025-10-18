import React from 'react';
import AdminSidebar from '../features/admin/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="bg-blue-100 text-gray-800 min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
