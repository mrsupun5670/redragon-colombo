import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { featuredProducts } from '../../data/products';

const InfiniteScrollProducts = () => {
  const [products, setProducts] = useState(featuredProducts.slice(0, 8));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreProducts = () => {
    if (products.length >= featuredProducts.length) {
      setHasMore(false);
      return;
    }

    const nextPage = page + 1;
    const newProducts = featuredProducts.slice(0, 8 * nextPage);
    setProducts(newProducts);
    setPage(nextPage);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) {
        return;
      }
      fetchMoreProducts();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, products]);

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={fetchMoreProducts}
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold uppercase tracking-wider"
          >
            Load More
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default InfiniteScrollProducts;
