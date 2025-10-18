import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, ShoppingCart, Users, BarChart2, Package, Settings as SettingsIcon, X } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  const navLinks = [
    { name: 'Dashboard', id: 'dashboard', icon: LayoutDashboard },
    { name: 'Products', id: 'products', icon: Package },
    { name: 'Orders', id: 'orders', icon: ShoppingCart },
    { name: 'Customers', id: 'customers', icon: Users },
    { name: 'Sales', id: 'sales', icon: BarChart2 },
    { name: 'Settings', id: 'settings', icon: SettingsIcon },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    // Close sidebar on mobile/tablet after selecting
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop for mobile and tablet */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -280 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed lg:sticky top-0 left-0 w-64 md:w-72 lg:w-64 bg-gray-950 flex flex-col shadow-2xl h-screen z-50 lg:translate-x-0"
        style={{ backgroundColor: '#0a0e1a' }}
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RD</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Admin Panel</h2>
          </div>

          {/* Close button for mobile/tablet */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 lg:p-6">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleTabClick(link.id)}
                  className={`w-full flex items-center p-3 md:p-4 rounded-lg transition-all duration-200 ${
                    activeTab === link.id
                      ? 'bg-red-500 bg-opacity-20 text-red-400 border-l-4 border-red-500 shadow-lg'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white border-l-4 border-transparent'
                  }`}
                >
                  <link.icon className="w-5 h-5 md:w-6 md:h-6 mr-3 flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium">{link.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 lg:p-6 border-t border-gray-800">
          <div className="text-xs md:text-sm text-gray-400 text-center">
            <p>Redragon Admin</p>
            <p className="mt-1">&copy; 2025 All Rights Reserved</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
