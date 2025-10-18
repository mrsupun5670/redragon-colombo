import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import SalesCharts from '../components/features/admin/sales/SalesCharts';

const SalesAnalytics = () => {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">Sales Analytics</h1>
        <SalesCharts />
      </div>
    </AdminLayout>
  );
};

export default SalesAnalytics;
