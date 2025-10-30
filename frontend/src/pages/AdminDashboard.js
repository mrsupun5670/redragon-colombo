import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import AdminSidebar from "../components/features/admin/AdminSidebar";
import Dashboard from "../components/features/admin/Dashboard";
import ProductList from "../components/features/admin/products/ProductList";
import AddProduct from "../components/features/admin/products/AddProduct";
import CategoriesTab from "../components/features/admin/products/CategoriesTab";
import BrandsTab from "../components/features/admin/products/BrandsTab";
import OrderList from "../components/features/admin/orders/OrderList";
import CustomerList from "../components/features/admin/customers/CustomerList";
import RefundList from "../components/features/admin/refunds/RefundList";
import DeliverySettings from "../components/features/admin/delivery/DeliverySettings";
import SalesCharts from "../components/features/admin/sales/SalesCharts";
import PromoList from "../components/features/admin/promotions/PromoList";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeProductsSubTab, setActiveProductsSubTab] = useState("list");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Open sidebar by default on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard setActiveTab={setActiveTab} />;
      case "products":
        return (
          <div>
            <h1 className="text-4xl font-bold mb-8">Product Management</h1>
            <div className="flex border-b border-blue-200">
              <button
                className={`px-6 py-3 text-lg font-medium ${
                  activeProductsSubTab === "list"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveProductsSubTab("list")}
              >
                Product List
              </button>
              <button
                className={`px-6 py-3 text-lg font-medium ${
                  activeProductsSubTab === "add"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveProductsSubTab("add")}
              >
                Add Product
              </button>
              <button
                className={`px-6 py-3 text-lg font-medium ${
                  activeProductsSubTab === "categories"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveProductsSubTab("categories")}
              >
                Categories
              </button>
              <button
                className={`px-6 py-3 text-lg font-medium ${
                  activeProductsSubTab === "brands"
                    ? "text-red-500 border-b-2 border-red-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveProductsSubTab("brands")}
              >
                Brands
              </button>
            </div>
            <div className="py-8">
              {activeProductsSubTab === "list" && <ProductList />}
              {activeProductsSubTab === "add" && <AddProduct />}
              {activeProductsSubTab === "categories" && <CategoriesTab />}
              {activeProductsSubTab === "brands" && <BrandsTab />}
            </div>
          </div>
        );
      case "orders":
        return (
          <div>
            <h1 className="text-4xl font-bold mb-8">Order Management</h1>
            <OrderList />
          </div>
        );
      case "customers":
        return (
          <div>
            <h1 className="text-4xl font-bold mb-8">Customer Management</h1>
            <CustomerList />
          </div>
        );
      case "promotions":
        return (
          <div>
            <h1 className="text-4xl font-bold mb-8">Promotion Management</h1>
            <PromoList />
          </div>
        );
      case "refunds":
        return (
          <div>
            <RefundList />
          </div>
        );
      case "delivery":
        return (
          <div>
            <DeliverySettings />
          </div>
        );
      case "sales":
        return (
          <div>
            <SalesCharts />
          </div>
        );
      default:
        return <Dashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="bg-blue-100 text-gray-800 min-h-screen h-screen flex overflow-hidden">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <main className="flex-1 w-full overflow-hidden flex flex-col">
        {/* Hamburger Menu Button for Mobile/Tablet */}
        <div className="lg:hidden sticky top-0 z-30 bg-white shadow-md p-3 md:p-4 flex items-center border-b border-gray-200">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 md:p-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 active:bg-red-700 transition-colors shadow-md"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <h1 className="ml-3 md:ml-4 text-lg md:text-xl font-bold text-gray-800">
            Admin Panel
          </h1>
        </div>

        {/* Content Area with Scroll */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 sm:p-5 md:p-6 lg:p-8">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
