import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Cpu, Mouse, Keyboard, Headset, Mic, Webcam, Monitor } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ParticleEffect from '../components/common/ParticleEffect';

const categories = [
  { name: 'Keyboards', icon: Keyboard, color: 'from-red-500 to-orange-500', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80' },
  { name: 'Mice', icon: Mouse, color: 'from-blue-500 to-cyan-500', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80' },
  { name: 'Headsets', icon: Headset, color: 'from-purple-500 to-pink-500', image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80' },
  { name: 'Microphones', icon: Mic, color: 'from-green-500 to-teal-500', image: 'https://images.unsplash.com/photo-1590602847460-0d0dc27246f4?w=800&q=80' },
  { name: 'Webcams', icon: Webcam, color: 'from-yellow-500 to-amber-500', image: 'https://images.unsplash.com/photo-1617316379442-5023c88328e5?w=800&q=80' },
  { name: 'Monitors', icon: Monitor, color: 'from-indigo-500 to-violet-500', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80' },
  { name: 'PC Builds', icon: Cpu, color: 'from-rose-500 to-fuchsia-500', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80' },
  { name: 'Accessories', icon: Gamepad2, color: 'from-sky-500 to-lime-500', image: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80' },
];

const CategoriesPage = () => {
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
          {categories.map((category, index) => (
            <motion.a
              key={category.name}
              href={`/products?category=${category.name}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <category.icon className="w-16 h-16 text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-black text-gray-900 text-center uppercase">{category.name}</h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoriesPage;