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
  TrendingUp,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import FullScreenCarousel from "../components/FullScreenCarousel";
import GamingParticles from "../components/GamingParticles";
import FuturisticProductCard from "../components/FuturisticProductCard";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import DevelopmentWatermark from "../components/DevelopmentWatermark";
import { featuredProducts, bestSellers } from "../data/products";

const Home = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: "Keyboards",
      icon: Keyboard,
      count: 48,
      description: "Mechanical & Membrane",
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
      color: "#ff0040",
    },
    {
      id: 2,
      name: "Gaming Mice",
      icon: Mouse,
      count: 42,
      description: "Wireless & Wired",
      image:
        "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=400&fit=crop",
      color: "#00f0ff",
    },
    {
      id: 3,
      name: "Headsets",
      icon: Headphones,
      count: 35,
      description: "7.1 Surround Sound",
      image:
        "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop",
      color: "#8b00ff",
    },
    {
      id: 4,
      name: "Monitors",
      icon: Monitor,
      count: 28,
      description: "144Hz & 240Hz",
      image:
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
      color: "#00ff41",
    },
    {
      id: 5,
      name: "Components",
      icon: Cpu,
      count: 64,
      description: "CPU, GPU, RAM",
      image:
        "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=400&fit=crop",
      color: "#ff006e",
    },
    {
      id: 6,
      name: "Storage",
      icon: HardDrive,
      count: 52,
      description: "SSD & HDD",
      image:
        "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop",
      color: "#0080ff",
    },
  ];

  // Auto-scroll effect for featured products with stopping intervals
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolling, setIsScrolling] = useState(true);

  useEffect(() => {
    const scrollContainer = document.getElementById("featured-scroll");
    if (!scrollContainer) return;

    const pausePlayInterval = setInterval(() => {
      setIsScrolling(prev => !prev);
    }, isScrolling ? 3000 : 2000);

    let scrollInterval;
    if (isScrolling) {
      scrollInterval = setInterval(() => {
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
    }

    return () => {
      clearInterval(pausePlayInterval);
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isScrolling]);

  useEffect(() => {
    const scrollContainer = document.getElementById("featured-scroll");
    if (scrollContainer) {
      scrollContainer.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  return (
    <div className="min-h-screen bg-dark-900 relative">
      {/* Gaming Particles Background */}
      <GamingParticles />

      {/* Cyber Grid Pattern */}
      <div className="cyber-grid fixed inset-0 opacity-30" />

      {/* Development Watermark */}
      <DevelopmentWatermark />

      {/* Navbar */}
      <Navbar />

      {/* Full Screen Carousel */}
      <FullScreenCarousel />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Why Choose Us - Gaming Style */}
        <div className="relative bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 border-y-2 neon-border py-8 shadow-2xl overflow-hidden">
          {/* Animated Background Lines */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
                style={{ top: `${20 * i}%`, left: 0, right: 0 }}
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: "1 Year Warranty",
                  desc: "On all products",
                  color: "#00f0ff",
                },
                {
                  icon: TrendingUp,
                  title: "Genuine Products",
                  desc: "100% Authentic",
                  color: "#ff006e",
                },
                {
                  icon: Clock,
                  title: "Fast Delivery",
                  desc: "Islandwide shipping",
                  color: "#8b00ff",
                },
                {
                  icon: Phone,
                  title: "24/7 Support",
                  desc: "Expert assistance",
                  color: "#00ff41",
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
                    className="inline-flex w-16 h-16 rounded-xl items-center justify-center mb-3 relative"
                    style={{
                      background: `linear-gradient(135deg, ${item.color}20, ${item.color}40)`,
                      boxShadow: `0 0 30px ${item.color}40`,
                    }}
                  >
                    <item.icon className="w-8 h-8" style={{ color: item.color }} />
                  </motion.div>
                  <h3 className="font-black text-sm mb-1 text-white uppercase tracking-wider neon-pulse">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Categories - Gaming Style */}
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="rgb-text text-4xl md:text-6xl font-black uppercase tracking-tighter">
                ● SHOP BY CATEGORY
              </span>
            </motion.div>
            <p className="text-gray-400 text-sm font-semibold">
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
                className="bg-dark-800 border-2 rounded-2xl overflow-hidden group transition-all duration-300 relative"
                style={{
                  borderColor: hoveredCategory === category.id ? category.color : '#252525',
                  boxShadow: hoveredCategory === category.id ? `0 0 30px ${category.color}40` : 'none',
                }}
              >
                <div className="aspect-square bg-gradient-to-br from-dark-700 to-dark-900 relative overflow-hidden">
                  {hoveredCategory === category.id ? (
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover opacity-60"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.6 }}
                      transition={{ duration: 0.3 }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <category.icon className="w-16 h-16 text-gray-600 group-hover:neon-pulse transition-all" style={{ color: category.color }} />
                    </div>
                  )}
                  {/* Animated corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: category.color }} />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: category.color }} />
                </div>

                <div className="p-4 text-center bg-dark-800">
                  <h3 className="font-black text-white mb-1 uppercase text-sm" style={{ color: hoveredCategory === category.id ? category.color : '#ffffff' }}>
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">
                    {category.description}
                  </p>
                  <p className="text-xs text-gray-600 font-semibold">
                    {category.count} Products
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Featured Products - RGB Gaming Style */}
        <div className="relative bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 py-20 overflow-hidden border-y-2 neon-border">
          {/* Animated background circles */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-0 left-0 w-96 h-96 rounded-full"
              style={{ background: 'radial-gradient(circle, #ff004080, transparent)' }}
            />
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity }}
              className="absolute bottom-0 right-0 w-96 h-96 rounded-full"
              style={{ background: 'radial-gradient(circle, #00f0ff80, transparent)' }}
            />
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
                  <span className="bg-gradient-to-r from-neon-red to-neon-pink text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider neon-pulse">
                    ⚡ Trending Now
                  </span>
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-black mb-2 uppercase tracking-tighter rgb-text"
                >
                  FEATURED PRODUCTS
                </motion.h2>
                <p className="text-gray-400 text-sm font-semibold">
                  Latest arrivals from Redragon - Limited stock available
                </p>
              </div>
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05, x: 5 }}
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-neon-red to-neon-pink hover:from-neon-pink hover:to-neon-purple text-white px-6 py-3 rounded-xl font-black uppercase text-sm tracking-wider shadow-lg neon-pulse"
              >
                VIEW ALL
                <Zap className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Enhanced Auto-scrolling container */}
          <div className="relative">
            {/* Left gradient fade */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-dark-900 to-transparent z-10 pointer-events-none" />

            {/* Right gradient fade */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none" />

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
              className="flex items-center gap-2 text-neon-cyan text-sm neon-pulse"
            >
              <span className="font-semibold">Auto-scrolling</span>
              <Zap className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Best Sellers - Gaming Style */}
        <div className="relative bg-dark-900 py-20 overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 rgb-glow"
                style={{ background: 'linear-gradient(135deg, #ff0040, #8b00ff)' }}
              >
                <Award className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-black mb-3 uppercase tracking-tighter rgb-text"
              >
                BEST SELLERS
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 font-semibold max-w-2xl mx-auto"
              >
                Top-rated products loved by thousands of gamers across Sri Lanka
              </motion.p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {bestSellers.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.15,
                    duration: 0.5,
                  }}
                  className="h-full"
                >
                  <FuturisticProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex justify-center mt-12"
            >
              <motion.a
                href="/products"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 bg-gradient-to-r from-neon-red via-neon-pink to-neon-purple text-white rounded-full font-black uppercase tracking-wider shadow-xl rgb-glow overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  View All Products
                  <Zap className="w-5 h-5" />
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Trust Indicators - Gaming Style */}
        <div className="relative bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800 py-20 border-y-2 neon-border overflow-hidden">
          {/* Animated Scanlines */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-px bg-neon-cyan"
                style={{ top: `${5 * i}%` }}
              />
            ))}
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-black mb-12 rgb-text uppercase tracking-tight"
            >
              NO.1 GAMING PERIPHERALS STORE IN SRI LANKA
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { number: "50,000+", label: "Products Sold", color: "#ff0040" },
                { number: "5,000+", label: "Happy Customers", color: "#00f0ff" },
                { number: "100%", label: "Genuine Products", color: "#8b00ff" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="text-6xl md:text-7xl font-black mb-3 font-mono neon-pulse" style={{ color: stat.color, textShadow: `0 0 30px ${stat.color}` }}>
                    {stat.number}
                  </div>
                  <div className="text-sm font-black uppercase tracking-widest text-gray-400">
                    {stat.label}
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
