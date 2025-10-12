/**
 * HERO COMPONENT - Homepage Banner Section
 *
 * PURPOSE:
 *   - Large eye-catching banner at top of homepage
 *   - Showcase main promotions, sales, featured products
 *   - Call-to-action buttons (Shop Now, View Products)
 *
 * WHAT TO INCLUDE:
 *   - Hero title/headline
 *   - Subtitle/description
 *   - Call-to-action buttons
 *   - Background image/gradient
 *   - Optional: Image slider for multiple promos
 *
 * STYLING:
 *   - Background: Red gradient or gaming-themed image
 *   - Height: 500-600px on desktop, 400px on mobile
 *   - Text: Large, bold, white text
 *   - Buttons: Red with hover effects
 *
 * FUTURE FEATURES:
 *   - Auto-rotating slider
 *   - Admin-configurable banner images
 *   - Click tracking
 *
 * RELATED FILES:
 *   - Banner images: /public/images/banners/
 *   - Button component: src/components/Button.js
 */

import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-dark-900 via-redragon-900 to-dark-900 text-white">
      {/* Background Pattern/Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          {/* Badge/Label */}
          <div className="inline-block mb-4">
            <span className="bg-redragon-600 text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
              Premium Gaming Gear
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Unleash Your
            <span className="text-redragon-500"> Gaming Potential</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            Explore premium Redragon gaming peripherals - keyboards, mice, headsets, and more.
            Elevate your gaming experience with professional-grade equipment.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/products"
              className="inline-block bg-redragon-600 hover:bg-redragon-700 text-white font-semibold px-8 py-4 rounded-lg shadow-red transition duration-300 text-center"
            >
              Shop Now
            </a>
            <a
              href="/categories"
              className="inline-block bg-transparent border-2 border-white hover:bg-white hover:text-dark-900 text-white font-semibold px-8 py-4 rounded-lg transition duration-300 text-center"
            >
              Browse Categories
            </a>
          </div>

          {/* Features/USPs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-redragon-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">Free Shipping</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-redragon-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">1 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-redragon-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-300">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Decorative Wave (Optional) */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto fill-gray-50">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
