import React from "react";
import AdminLayout from "../components/layout/AdminLayout";
import SalesCharts from "../components/features/admin/sales/SalesCharts";

const SalesAnalytics = () => {
  return (
    <AdminLayout>
      <div>
        <SalesCharts />
      </div>
    </AdminLayout>
  );
};

export default SalesAnalytics;
