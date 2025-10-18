import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import FullScreenCarousel from '../components/features/home/FullScreenCarousel';
import ProductCarousel from '../components/features/home/ProductCarousel';
import AutoScrollCategories from '../components/features/home/AutoScrollCategories';
import AutoScrollBrands from '../components/features/home/AutoScrollBrands';
import AutoScrollProducts from '../components/features/home/AutoScrollProducts';
import YouTubeEmbed from '../components/common/YouTubeEmbed';
import GoogleReviewsWidget from '../components/common/GoogleReviewsWidget';
import { featuredProducts } from '../data/products';
import { motion } from 'framer-motion';

const categories = [
  { name: 'Keyboards', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80' },
  { name: 'Mice', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&q=80' },
  { name: 'Headsets', image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&q=80' },
  { name: 'Monitors', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&q=80' },
  { name: 'PC Computers', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&q=80' },
  { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80' },
  { name: 'Gaming Chairs', image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80' },
  { name: 'Webcams', image: 'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=400&q=80' },
  { name: 'Microphones', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&q=80' },
  { name: 'Speakers', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&q=80' },
  { name: 'Mouse Pads', image: 'https://images.unsplash.com/photo-1625225233840-695456021cde?w=400&q=80' },
  { name: 'Controllers', image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&q=80' },
];

const brands = [
  {
    name: 'Redragon',
    logo: 'https://logos-world.net/wp-content/uploads/2023/02/Redragon-Logo.png',
  },
  {
    name: 'MSI',
    logo: 'https://logos-world.net/wp-content/uploads/2020/07/MSI-Logo.png',
  },
  {
    name: 'Dell',
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Dell-Logo.png',
  },
  {
    name: 'HP',
    logo: 'https://logos-world.net/wp-content/uploads/2020/09/HP-Logo.png',
  },
  {
    name: 'Kingston',
    logo: 'https://logos-world.net/wp-content/uploads/2021/02/Kingston-Technology-Logo.png',
  },
  {
    name: 'ADATA',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/ADATA_Technology_logo.svg/2560px-ADATA_Technology_logo.svg.png',
  },
  {
    name: 'Prolink',
    logo: 'https://www.prolink2u.com/images/logo.png',
  },
  {
    name: 'ASUS',
    logo: 'https://logos-world.net/wp-content/uploads/2020/07/Asus-Logo.png',
  },
  {
    name: 'Logitech',
    logo: 'https://logos-world.net/wp-.com/uploads/2020/12/Logitech-Logo.png',
  },
  {
    name: 'Razer',
    logo: 'https://logos-world.net/wp-content/uploads/2020/05/Razer-Logo.png',
  },
  {
    name: 'Corsair',
    logo: 'https://logos-world.net/wp-content/uploads/2021/03/Corsair-Logo.png',
  },
  {
    name: 'SteelSeries',
    logo: 'https://logos-world.net/wp-content/uploads/2022/04/SteelSeries-Logo.png',
  },
];

const redragonProducts = featuredProducts.filter(p => p.brand === 'Redragon');

const HomePage = () => {
  console.log('Navbar:', Navbar);
  return (
    <div className="bg-gray-900 text-white">
      <Navbar />
      <WhatsAppButton />
      <FullScreenCarousel />

      {/* Shop by Category Section - Auto Scrolling */}
      <div className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 uppercase tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "linear-gradient(to right, #ef4444, #f97316, #ef4444)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Shop by Category
          </motion.h2>
          <AutoScrollCategories categories={categories} />
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-8 uppercase">New Arrivals</h2>
          <AutoScrollProducts products={featuredProducts} bg_color="from-gray-900" />
        </div>
      </div>

      {/* Exclusive Redragon Section */}
      <div className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
                    <motion.h2
            className="text-3xl font-bold text-center mb-8 uppercase"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "linear-gradient(to right, #ef4444, #f97316, #facc15)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Exclusive Redragon
          </motion.h2>
          <AutoScrollProducts products={redragonProducts} bg_color="from-gray-800" />
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-8 uppercase">Featured Products</h2>
          <AutoScrollProducts products={featuredProducts.slice(4, 14)} bg_color="from-gray-900" />
        </div>
      </div>

      {/* Shop by Brand Section - Auto Scrolling */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-8 uppercase tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              background: "linear-gradient(to right, #3b82f6, #8b5cf6, #3b82f6)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Shop by Brand
          </motion.h2>
          <AutoScrollBrands brands={brands} />
        </div>
      </div>

      {/* Community Reviews Section */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-8 uppercase">Community Reviews</h2>
          <div className="flex justify-center">
            <GoogleReviewsWidget />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;