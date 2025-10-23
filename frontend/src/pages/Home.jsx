import React, { useState, useEffect } from 'react';
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
import { productAPI, categoryAPI, brandAPI } from '../services/api';
import { motion } from 'framer-motion';

// These will be fetched from the database

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [redragonProducts, setRedragonProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all data concurrently
        const [featuredRes, newArrivalsRes, redragonRes, categoriesRes, brandsRes] = await Promise.all([
          productAPI.getFeatured(),
          productAPI.getNewArrivals(),
          productAPI.getRedragonProducts(),
          categoryAPI.getMainCategories(),
          brandAPI.getAll()
        ]);

        setFeaturedProducts(featuredRes.data.data || []);
        setNewArrivals(newArrivalsRes.data.data || []);
        setRedragonProducts(redragonRes.data.data || []);
        
        // Transform categories data to match expected format
        const categoryData = categoriesRes.data.data || [];
        const transformedCategories = categoryData.map(category => ({
          name: category.name,
          image: category.icon || '/image_not_there.avif' // fallback image
        }));
        setCategories(transformedCategories);
        
        // Transform brands data to match expected format  
        const brandData = brandsRes.data.data || [];
        const transformedBrands = brandData.map(brand => ({
          name: brand.name,
          logo: brand.logo || '/image_not_there.avif'// fallback logo
        }));
        setBrands(transformedBrands);
        
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('Navbar:', Navbar);
  
  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-xl">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-500 hover:bg-red-600 px-6 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
          {categories.length > 0 ? (
            <AutoScrollCategories categories={categories} />
          ) : (
            <p className="text-center text-gray-400">No categories available at the moment.</p>
          )}
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-8 uppercase">New Arrivals</h2>
          {newArrivals.length > 0 ? (
            <AutoScrollProducts products={newArrivals} bg_color="from-gray-900" />
          ) : (
            <p className="text-center text-gray-400">No new arrivals available at the moment.</p>
          )}
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
          {redragonProducts.length > 0 ? (
            <AutoScrollProducts products={redragonProducts} bg_color="from-gray-800" />
          ) : (
            <p className="text-center text-gray-400">No Redragon products available at the moment.</p>
          )}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          {console.log(featuredProducts) }
          <h2 className="text-3xl font-bold text-white text-center mb-8 uppercase">Featured Products</h2>
          {featuredProducts.length > 0 ? (
            <AutoScrollProducts products={featuredProducts} bg_color="from-gray-900" />
            
          ) : (
            <p className="text-center text-gray-400">No featured products available at the moment.</p>
          )}
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
          {brands.length > 0 ? (
            <AutoScrollBrands brands={brands} />
          ) : (
            <p className="text-center text-gray-400">No brands available at the moment.</p>
          )}
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