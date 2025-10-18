import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import OrderList from '../components/features/admin/orders/OrderList';

const OrderManagement = () => {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">Order Management</h1>
        <OrderList />
      </div>
    </AdminLayout>
  );
};

export default OrderManagement;
