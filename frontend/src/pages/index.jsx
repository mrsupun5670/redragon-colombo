import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  Cpu,
  HardDrive,
  Award,
  Shield,
  Clock,
  Phone,
  MapPin,
  TrendingUp,
} from "lucide-react";
import Navbar from "../components/Navbar";
import FullScreenCarousel from "../components/FullScreenCarousel";
import ParticleEffect from "../components/ParticleEffect";
import FuturisticProductCard from "../components/FuturisticProductCard";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

const Home = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Specialized Gaming Categories with Real Images
  const categories = [
    {
      id: 1,
      name: "Keyboards",
      icon: Keyboard,
      count: 48,
      description: "Mechanical & Membrane",
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    },
    {
      id: 2,
      name: "Gaming Mice",
      icon: Mouse,
      count: 42,
      description: "Wireless & Wired",
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop",
    },
    {
      id: 3,
      name: "Headsets",
      icon: Headphones,
      count: 35,
      description: "7.1 Surround Sound",
      image:
        "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop",
    },
    {
      id: 4,
      name: "Monitors",
      icon: Monitor,
      count: 28,
      description: "144Hz & 240Hz",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
    },
    {
      id: 5,
      name: "Components",
      icon: Cpu,
      count: 64,
      description: "CPU, GPU, RAM",
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop",
    },
    {
      id: 6,
      name: "Storage",
      icon: HardDrive,
      count: 52,
      description: "SSD & HDD",
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
    },
  ];

  // Featured Products
  const featuredProducts = [
    {
      id: 1,
      name: "Redragon K617 Fizz 60% Wireless RGB Mechanical Gaming Keyboard",
      price: 12500,
      image:
        "https://redragonshop.com/cdn/shop/products/k617fizz-1_1200x1200.jpg",
      rating: 5,
      reviews: 892,
      inStock: true,
      warranty: "1 Year",
      category: "Keyboards",
    },
    {
      id: 2,
      name: "Redragon M913 Impact Elite Wireless RGB Gaming Mouse - 16000 DPI",
      price: 8900,
      image: "https://redragonshop.com/cdn/shop/products/m913-1_1200x1200.jpg",
      rating: 5,
      reviews: 1245,
      inStock: true,
      warranty: "1 Year",
      category: "Mice",
    },
    {
      id: 3,
      name: "Redragon H848 Bluetooth Wireless Gaming Headset with Microphone",
      price: 7500,
      image: "https://redragonshop.com/cdn/shop/products/h848-1_1200x1200.jpg",
      rating: 4,
      reviews: 675,
      inStock: true,
      warranty: "1 Year",
      category: "Headsets",
    },
    {
      id: 4,
      name: "Redragon K552 RGB Mechanical Gaming Keyboard - Red Switches",
      price: 9800,
      image: "https://redragonshop.com/cdn/shop/products/k552-2_1200x1200.jpg",
      rating: 5,
      reviews: 4567,
      inStock: true,
      warranty: "1 Year",
      category: "Keyboards",
    },
    {
      id: 5,
      name: "Redragon M719 Invader RGB Gaming Mouse",
      price: 4500,
      image: "https://redragonshop.com/cdn/shop/products/m719-1_1200x1200.jpg",
      rating: 4,
      reviews: 1789,
      inStock: true,
      warranty: "1 Year",
      category: "Mice",
    },
    {
      id: 6,
      name: "Redragon P025 RGB Large Gaming Mouse Pad",
      price: 3200,
      image: "https://redragonshop.com/cdn/shop/products/p025-1_1200x1200.jpg",
      rating: 5,
      reviews: 2034,
      inStock: true,
      warranty: "1 Year",
      category: "Accessories",
    },
  ];

  // Best Sellers
  const bestSellers = [
    {
      id: 7,
      name: "Redragon K552 Kumara Mechanical Gaming Keyboard",
      price: 8500,
      image: "https://redragonshop.com/cdn/shop/products/k552-1_1200x1200.jpg",
      rating: 5,
      soldCount: "25,000+",
      tag: "BESTSELLER",
      inStock: true,
    },
    {
      id: 8,
      name: "Redragon M711 Cobra RGB Gaming Mouse",
      price: 4200,
      image: "https://redragonshop.com/cdn/shop/products/m711-1_1200x1200.jpg",
      rating: 5,
      soldCount: "18,900+",
      tag: "POPULAR",
      inStock: true,
    },
    {
      id: 9,
      name: "Redragon H510 Zeus Wired Gaming Headset",
      price: 6900,
      image: "https://redragonshop.com/cdn/shop/products/h510-1_1200x1200.jpg",
      rating: 5,
      soldCount: "14,500+",
      tag: "TOP RATED",
      inStock: true,
    },
    {
      id: 10,
      name: "Redragon P016 Flick XL Gaming Mouse Pad",
      price: 1800,
      image: "https://redragonshop.com/cdn/shop/products/p016-1_1200x1200.jpg",
      rating: 4,
      soldCount: "32,000+",
      tag: "MOST SOLD",
      inStock: true,
    },
  ];

  // Auto-scroll effect for featured products
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const scrollContainer = document.getElementById("featured-scroll");
    if (!scrollContainer) return;

    const scrollInterval = setInterval(() => {
      setScrollPosition((prev) => {
        const newPosition = prev + 1;
        const maxScroll =
          scrollContainer.scrollWidth - scrollContainer.clientWidth;

        if (newPosition >= maxScroll) {
          return 0;
        }
        return newPosition;
      });
    }, 30);

    return () => clearInterval(scrollInterval);
  }, []);

  useEffect(() => {
    const scrollContainer = document.getElementById("featured-scroll");
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      {/* Particle Effect */}
      <ParticleEffect />

      {/* Navbar */}
      <Navbar />

      {/* Full Screen Carousel */}
      <FullScreenCarousel />

      {/* Main Content */}
      <div className="bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 border-y-2 border-red-700 py-8 shadow-xl">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "1 Year Warranty",
                  desc: "On all products",
                },
                {
                  icon: TrendingUp,
                  title: "Genuine Products",
                  desc: "100% Authentic",
                },
                {
                  icon: Clock,
                  title: "Fast Delivery",
                  desc: "Islandwide shipping",
                },
                {
                  icon: Phone,
                  title: "24/7 Support",
                  desc: "Expert assistance",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-10 h-10 mx-auto mb-3 text-white" />
                  </motion.div>
                  <h3 className="font-black text-sm mb-1 text-white uppercase tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-xs text-white/90">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Categories */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-gray-900 mb-4 uppercase tracking-tighter"
            >
              <span className="text-red-600">●</span> SHOP BY CATEGORY
            </motion.h2>
            <p className="text-gray-600 text-sm font-semibold">
              Professional gaming peripherals and computer components
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, i) => (
              <motion.a
                key={category.id}
                href={`/category/${category.name.toLowerCase()}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -10, scale: 1.05 }}
                onHoverStart={() => setHoveredCategory(category.id)}
                onHoverEnd={() => setHoveredCategory(null)}
                className="bg-white border-2 border-gray-200 hover:border-red-500 rounded-2xl overflow-hidden group transition-all duration-300 relative shadow-lg hover:shadow-2xl"
              >
                <div className="aspect-square bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
                  {hoveredCategory === category.id ? (
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <category.icon className="w-16 h-16 text-gray-400 group-hover:text-red-500 transition-colors" />
                    </div>
                  )}
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-4 text-center bg-white">
                  <h3 className="font-black text-gray-900 mb-1 group-hover:text-red-500 transition-colors uppercase text-sm">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1">
                    {category.description}
                  </p>
                  <p className="text-xs text-gray-500 font-semibold">
                    {category.count} Products
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Featured Products - Auto Scrolling with Enhanced Design */}
        <div className="relative bg-gradient-to-br from-red-50 via-white to-orange-50 py-20 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 mb-12 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="inline-block mb-4"
                >
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                    ⚡ Trending Now
                  </span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-black text-gray-900 mb-2 uppercase tracking-tighter"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                    FEATURED PRODUCTS
                  </span>
                </motion.h2>
                <p className="text-gray-600 text-sm font-semibold">
                  Latest arrivals from Redragon - Limited stock available
                </p>
              </div>
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05, x: 5 }}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-xl font-black uppercase text-sm tracking-wider shadow-lg hover:shadow-xl transition-all"
              >
                VIEW ALL
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Enhanced Auto-scrolling container with gradient edges */}
          <div className="relative">
            {/* Left gradient fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-red-50 to-transparent z-10 pointer-events-none" />

            {/* Right gradient fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-orange-50 to-transparent z-10 pointer-events-none" />

            {/* Scrolling container */}
            <div
              id="featured-scroll"
              className="flex gap-8 px-4 overflow-x-hidden py-4"
              style={{ scrollBehavior: "smooth" }}
            >
              {[...featuredProducts, ...featuredProducts].map((product, i) => (
                <motion.div
                  key={`${product.id}-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-shrink-0 w-80"
                >
                  <FuturisticProductCard product={product} showCategory />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="flex justify-center mt-8">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-2 text-gray-500 text-sm"
            >
              <span className="font-semibold">Auto-scrolling</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Best Sellers */}
        <div className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-12">
              <Award className="w-12 h-12 text-red-600" />
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter"
                >
                  <span className="text-red-600">●</span> BEST SELLERS
                </motion.h2>
                <p className="text-gray-600 text-sm font-semibold">
                  Most popular products in Sri Lanka
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <FuturisticProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 py-20 border-y-4 border-red-500">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black mb-12 text-white uppercase tracking-tight"
            >
              NO.1 GAMING PERIPHERALS STORE IN SRI LANKA
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { number: "50,000+", label: "Products Sold" },
                { number: "5,000+", label: "Happy Customers" },
                { number: "100%", label: "Genuine Products" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-white/10 blur-xl" />
                  <div className="relative">
                    <div className="text-6xl md:text-7xl font-black mb-3 text-white font-mono">
                      {stat.number}
                    </div>
                    <div className="text-sm font-black uppercase tracking-widest text-red-100">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
};

export default Home;
