import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Cpu, Mouse, Keyboard, Headset, Mic, Webcam, Monitor } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleEffect from '../components/common/ParticleEffect';
import { categoryAPI } from '../services/api';

const categoryVisuals = {
  'Keyboards': { icon: Keyboard, color: 'from-red-500 to-orange-500' },
  'Mice': { icon: Mouse, color: 'from-blue-500 to-cyan-500' },
  'Headsets': { icon: Headset, color: 'from-purple-500 to-pink-500' },
  'Microphones': { icon: Mic, color: 'from-green-500 to-teal-500' },
  'Webcams': { icon: Webcam, color: 'from-yellow-500 to-amber-500' },
  'Monitors': { icon: Monitor, color: 'from-indigo-500 to-violet-500' },
  'PC Builds': { icon: Cpu, color: 'from-rose-500 to-fuchsia-500' },
  'Accessories': { icon: Gamepad2, color: 'from-sky-500 to-lime-500' },
};

const defaultVisuals = { icon: Gamepad2, color: 'from-gray-500 to-gray-700' };

const bgColors = [
  'bg-gray-800',
  'bg-red-800',
  'bg-blue-800',
  'bg-green-800',
  'bg-purple-800',
  'bg-indigo-800',
  'bg-yellow-800',
  'bg-pink-800',
];

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getMainCategories();
        setCategories(response.data.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <ParticleEffect />
      <Navbar />

      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-gray-800 to-black pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-red-500 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
              Product Categories
            </h1>
            <p className="text-xl text-white/90 font-semibold">
              Explore our wide range of gaming gear.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const visuals = categoryVisuals[category.name] || defaultVisuals;
            const Icon = visuals.icon;
            const bgColor = bgColors[index % bgColors.length];

            return (
              <motion.a
                key={category.id}
                href={`/products?category=${category.name}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={category.image || 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80'}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${visuals.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-white drop-shadow-lg" />
                  </div>
                </div>
                <div className={`p-6 ${bgColor}`}>
                  <h3 className="text-2xl font-black text-white text-center uppercase">{category.name}</h3>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoriesPage;