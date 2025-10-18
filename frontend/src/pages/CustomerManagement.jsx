import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import CustomerList from '../components/features/admin/customers/CustomerList';

const CustomerManagement = () => {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">Customer Management</h1>
        <CustomerList />
      </div>
    </AdminLayout>
  );
};

export default CustomerManagement;
