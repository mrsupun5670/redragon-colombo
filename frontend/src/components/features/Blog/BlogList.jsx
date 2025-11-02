import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, Search } from 'lucide-react';
import SEOHead from '../../common/SEOHead';

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample blog posts - replace with API call later
  const blogPosts = [
    {
      id: 1,
      title: "Best Gaming Keyboards 2024 - Complete Guide",
      excerpt: "Explore the top gaming mechanical keyboards available in Sri Lanka. Learn about switches, keycaps, and what makes a great gaming keyboard.",
      content: "Gaming keyboards are essential for any serious gamer. In 2024, mechanical keyboards have become the standard for gaming. Redragon offers some of the best mechanical keyboards with features like programmable keys, RGB lighting, and durable switches.",
      category: "gaming-guides",
      author: "Redragon Team",
      date: new Date('2024-11-02'),
      image: "/images/logo/redragon_logo.png",
      tags: ["mechanical-keyboards", "gaming-gear", "guides"],
      slug: "best-gaming-keyboards-2024"
    },
    {
      id: 2,
      title: "Gaming Mouse Guide - DPI, Sensitivity and Ergonomics",
      excerpt: "Understanding DPI, polling rate, and ergonomic design. Find the perfect gaming mouse for your gaming style.",
      content: "A good gaming mouse can significantly improve your gaming performance. This guide covers everything you need to know about gaming mice - from DPI settings to ergonomic design.",
      category: "gaming-guides",
      author: "Redragon Team",
      date: new Date('2024-10-28'),
      image: "/images/logo/redragon_logo.png",
      tags: ["gaming-mouse", "peripherals", "tips"],
      slug: "gaming-mouse-guide"
    },
    {
      id: 3,
      title: "Redragon Gaming Peripherals Review - Quality & Performance",
      excerpt: "Detailed review of Redragon gaming keyboards, mice, and headsets. Why Redragon is the best choice for gaming in Sri Lanka.",
      content: "Redragon has established itself as a premium gaming peripheral manufacturer. Their products combine quality, performance, and affordability. This review covers their keyboard switches, mouse sensors, and audio quality.",
      category: "reviews",
      author: "Redragon Team",
      date: new Date('2024-10-20'),
      image: "/images/logo/redragon_logo.png",
      tags: ["redragon", "reviews", "quality"],
      slug: "redragon-peripherals-review"
    },
    {
      id: 4,
      title: "How to Choose the Right Gaming Headset for Competitive Gaming",
      excerpt: "Audio is crucial in competitive gaming. Learn how to choose a headset with good soundstage, mic quality, and comfort.",
      content: "In competitive gaming, audio cues can be the difference between winning and losing. A good gaming headset should have clear audio, noise cancellation, and a comfortable fit for long gaming sessions.",
      category: "gaming-guides",
      author: "Redragon Team",
      date: new Date('2024-10-15'),
      image: "/images/logo/redragon_logo.png",
      tags: ["headsets", "audio", "competitive-gaming"],
      slug: "gaming-headset-guide"
    },
    {
      id: 5,
      title: "Gaming Community in Colombo - Where to Find Players",
      excerpt: "Discover the gaming community in Colombo, Sri Lanka. Local esports teams, gaming cafes, and tournaments.",
      content: "Sri Lanka has a vibrant gaming community. Colombo is home to numerous gaming cafes, esports teams, and gaming events. Whether you're casual or competitive, there's a place for you in the local gaming scene.",
      category: "community",
      author: "Redragon Team",
      date: new Date('2024-10-10'),
      image: "/images/logo/redragon_logo.png",
      tags: ["community", "esports", "colombo"],
      slug: "gaming-community-colombo"
    },
    {
      id: 6,
      title: "Maintaining Your Gaming Peripherals - Care Tips & Tricks",
      excerpt: "How to keep your gaming keyboard, mouse, and headset in perfect condition. Maintenance tips that extend product life.",
      content: "Proper maintenance of your gaming peripherals ensures they last longer and perform better. Learn how to clean your keyboard switches, mouse sensor, and headset.",
      category: "tips",
      author: "Redragon Team",
      date: new Date('2024-10-05'),
      image: "/images/logo/redragon_logo.png",
      tags: ["maintenance", "care", "tips"],
      slug: "gaming-peripherals-maintenance"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'gaming-guides', name: 'Gaming Guides' },
    { id: 'reviews', name: 'Reviews' },
    { id: 'community', name: 'Community' },
    { id: 'tips', name: 'Tips & Tricks' }
  ];

  // Filter posts
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <SEOHead
        title="Gaming Blog - Redragon Colombo"
        description="Gaming guides, reviews, and tips. Learn about mechanical keyboards, gaming mice, headsets, and the gaming community in Sri Lanka."
        keywords="gaming blog, mechanical keyboard guide, gaming mouse tips, esports, colombo gaming"
        url="/blog"
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Gaming Blog
            </h1>
            <p className="text-lg text-gray-600">
              Tips, guides, and insights about gaming peripherals and the gaming community in Sri Lanka
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 space-y-6"
          >
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-red-500 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-red-500'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-24 w-24 object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Category Tag */}
                    <div className="mb-2">
                      <Tag className="w-4 h-4 text-red-500 inline mr-2" />
                      <span className="text-sm font-semibold text-red-500 capitalize">
                        {post.category.replace('-', ' ')}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>

                    {/* Read More Button */}
                    <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors">
                      Read More
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No blog posts found. Try adjusting your search or filters.</p>
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogList;
