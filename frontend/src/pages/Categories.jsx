/**
 * CATEGORIES PAGE
 *
 * PURPOSE:
 *   - Display all product categories in an organized grid
 *   - Show category cards with images, names, and product counts
 *   - Allow users to navigate to filtered product views
 *   - Showcase category-specific promotions
 *
 * FEATURES:
 *   - Hero section with animated background
 *   - Category cards with hover effects
 *   - Product count per category
 *   - Click to navigate to filtered products
 *   - Responsive grid layout
 *   - Popular categories highlight
 */

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Keyboard,
  Mouse,
  Headphones,
  Package,
  Grid,
  TrendingUp,
  Star,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ParticleEffect from "../components/ParticleEffect";
import { allProducts } from "../data/products";

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Calculate product counts per category
  const getCategoryData = () => {
    const categoryMap = {};

    allProducts.forEach((product) => {
      if (!categoryMap[product.category]) {
        categoryMap[product.category] = {
          name: product.category,
          count: 0,
          products: [],
        };
      }
      categoryMap[product.category].count++;
      categoryMap[product.category].products.push(product);
    });

    return Object.values(categoryMap);
  };

  const categoryData = getCategoryData();

  // Category icons and colors mapping
  const categoryConfig = {
    Keyboards: {
      icon: Keyboard,
      color: "from-red-500 to-red-600",
      hoverColor: "from-red-600 to-red-700",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
      description: "Mechanical & Wireless Gaming Keyboards",
    },
    Mice: {
      icon: Mouse,
      color: "from-blue-500 to-blue-600",
      hoverColor: "from-blue-600 to-blue-700",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80",
      description: "Precision Gaming Mice & Controllers",
    },
    Headsets: {
      icon: Headphones,
      color: "from-purple-500 to-purple-600",
      hoverColor: "from-purple-600 to-purple-700",
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80",
      description: "Immersive Gaming Headsets & Audio",
    },
    Accessories: {
      icon: Package,
      color: "from-green-500 to-green-600",
      hoverColor: "from-green-600 to-green-700",
      image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=800&q=80",
      description: "Mouse Pads, Cables & Gaming Accessories",
    },
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <ParticleEffect />
      <WhatsAppButton />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-blue-500/10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              EXPLORE CATEGORIES
              <Sparkles className="w-4 h-4" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
              Gaming Gear
              <span className="block bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                Categories
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-medium">
              Discover the perfect gaming equipment for your setup. From mechanical keyboards to precision mice.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
          >
            {[
              { icon: Grid, label: "Categories", value: categoryData.length },
              { icon: Package, label: "Products", value: allProducts.length },
              { icon: TrendingUp, label: "Brands", value: "4+" },
              { icon: Star, label: "Top Rated", value: "50+" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200 hover:border-red-500 transition-all"
              >
                <stat.icon className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-3xl font-black text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {categoryData.map((category, index) => {
              const config = categoryConfig[category.name] || categoryConfig.Accessories;
              const Icon = config.icon;
              const isHovered = hoveredCategory === category.name;

              return (
                <motion.div
                  key={category.name}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onHoverStart={() => setHoveredCategory(category.name)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  className="group relative"
                >
                  <a href={`/products?category=${category.name}`}>
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-gray-200 hover:border-red-500 transition-all duration-300 h-full">
                      {/* Background Image */}
                      <div className="relative h-64 overflow-hidden">
                        <motion.img
                          src={config.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                          animate={{
                            scale: isHovered ? 1.1 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${config.color} opacity-80 group-hover:opacity-90 transition-opacity`} />

                        {/* Icon */}
                        <motion.div
                          animate={{
                            rotate: isHovered ? 360 : 0,
                            scale: isHovered ? 1.2 : 1,
                          }}
                          transition={{ duration: 0.5 }}
                          className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-4 rounded-2xl border-2 border-white/40"
                        >
                          <Icon className="w-10 h-10 text-white" />
                        </motion.div>

                        {/* Product Count Badge */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2 + index * 0.1 }}
                          className="absolute top-6 left-6 bg-white text-gray-900 px-4 py-2 rounded-full font-black text-sm shadow-lg border-2 border-white/40"
                        >
                          {category.count} Products
                        </motion.div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-3xl font-black text-gray-900 group-hover:text-red-500 transition-colors">
                            {category.name}
                          </h3>
                          <motion.div
                            animate={{
                              x: isHovered ? 5 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ArrowRight className="w-6 h-6 text-red-500" />
                          </motion.div>
                        </div>

                        <p className="text-gray-600 font-medium mb-4">
                          {config.description}
                        </p>

                        {/* Features */}
                        <div className="flex items-center gap-2 flex-wrap mb-4">
                          {["Premium", "RGB", "Gaming"].map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-bold"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-full bg-gradient-to-r ${config.color} hover:${config.hoverColor} text-white py-3 rounded-xl font-bold shadow-lg transition-all border-2 border-white/20 flex items-center justify-center gap-2`}
                        >
                          <Zap className="w-5 h-5" />
                          Browse {category.name}
                        </motion.button>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Popular Picks Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Check out our most popular products across all categories
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <a href="/products">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-12 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all border-2 border-white/20 inline-flex items-center gap-3"
              >
                <Package className="w-6 h-6" />
                View All Products
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Why Shop by Category Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Why Shop by Category?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find exactly what you need, faster
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Grid,
                title: "Organized Selection",
                description: "Browse products by type for a streamlined shopping experience",
              },
              {
                icon: Zap,
                title: "Quick Navigation",
                description: "Jump directly to the category you need without scrolling",
              },
              {
                icon: Star,
                title: "Best in Class",
                description: "Each category features our top-rated and most popular items",
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-red-500 transition-all text-center"
              >
                <div className="bg-gradient-to-br from-red-500 to-red-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 font-medium">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Categories;
