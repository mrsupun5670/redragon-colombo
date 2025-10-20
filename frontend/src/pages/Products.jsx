import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  SlidersHorizontal,
  Filter,
  ChevronDown,
  Grid as GridIcon,
  List as ListIcon,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ParticleEffect from "../components/common/ParticleEffect";
import { allProducts } from "../data/products";

const Products = () => {
  const navigate = useNavigate();

  // State management
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [sortBy, setSortBy] = useState("featured");

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [redragonOnly, setRedragonOnly] = useState(false);

  // Expandable filter sections - all open by default
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [subCategoryOpen, setSubCategoryOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const [colorOpen, setColorOpen] = useState(true);

  // Extract unique filter options from products
  const filterOptions = useMemo(() => {
    const categories = [...new Set(allProducts.map((p) => p.category))];
    const subCategories = [
      ...new Set(allProducts.map((p) => p.subCategory).filter(Boolean)),
    ];
    const brands = [
      ...new Set(allProducts.map((p) => p.brand).filter(Boolean)),
    ].sort();
    const colors = [...new Set(allProducts.flatMap((p) => p.colors || []))];

    return { categories, subCategories, brands, colors };
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      // SubCategory filter
      const matchesSubCategory =
        selectedSubCategories.length === 0 ||
        selectedSubCategories.includes(product.subCategory);

      // Brand filter
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      // Color filter
      const matchesColor =
        selectedColors.length === 0 ||
        selectedColors.some((color) => product.colors?.includes(color));

      // Price filter
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      // Stock filter
      const matchesStock = !inStockOnly || product.inStock;

      const matchesRedragon = !redragonOnly || product.brand === "Redragon";

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubCategory &&
        matchesBrand &&
        matchesColor &&
        matchesPrice &&
        matchesStock &&
        matchesRedragon
      );
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [
    searchQuery,
    selectedCategories,
    selectedSubCategories,
    selectedBrands,
    selectedColors,
    priceRange,
    inStockOnly,
    sortBy,
  ]);

  // Filter handlers
  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleSubCategory = (subCategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((sc) => sc !== subCategory)
        : [...prev, subCategory]
    );
  };

  const toggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 25000]);
    setInStockOnly(false);
    setRedragonOnly(false);
    setSearchQuery("");
  };

  const activeFilterCount =
    selectedCategories.length +
    selectedSubCategories.length +
    selectedBrands.length +
    selectedColors.length +
    (inStockOnly ? 1 : 0) +
    (redragonOnly ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <ParticleEffect />
      <Navbar />

      {/* Page Header */}
      <div className="relative bg-gradient-to-r from-red-500 to-red-700 pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
              Gaming Products
            </h1>
            <p className="text-xl text-white/90 font-semibold">
              {filteredProducts.length} Products Available
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="lg:w-80 flex-shrink-0"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                  {/* Filter Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5 text-red-500" />
                      <h2 className="text-xl font-black text-gray-900 uppercase">
                        Filters
                      </h2>
                      {activeFilterCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {activeFilterCount}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Clear All Filters */}
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="w-full mb-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}

                  {/* Redragon Only Filter */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={redragonOnly}
                        onChange={(e) => setRedragonOnly(e.target.checked)}
                        className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="ml-3 font-black text-red-800 group-hover:text-red-600 transition-colors uppercase text-sm tracking-wider">
                        Show Redragon Only
                      </span>
                    </label>
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full px-4 py-2 pl-10 bg-white border-2 border-gray-400 focus:border-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                      />
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">
                      Price Range
                    </label>
                    <div className="space-y-3">
                      <input
                        type="range"
                        min="0"
                        max="25000"
                        step="500"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm font-semibold text-gray-600">
                        <span>Rs. {priceRange[0].toLocaleString()}</span>
                        <span>Rs. {priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <button
                      onClick={() => setCategoryOpen(!categoryOpen)}
                      className="flex items-center justify-between w-full text-sm font-bold text-gray-700 mb-2 uppercase hover:text-red-500 transition-colors"
                    >
                      <span>Category</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          categoryOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {categoryOpen && (
                      <div className="space-y-2">
                        {filterOptions.categories.map((category) => (
                          <label
                            key={category}
                            className="flex items-center cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                            />
                            <span className="ml-2 text-gray-700 group-hover:text-red-500 transition-colors">
                              {category}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SubCategory Filter */}
                  {filterOptions.subCategories.length > 0 && (
                    <div className="mb-6">
                      <button
                        onClick={() => setSubCategoryOpen(!subCategoryOpen)}
                        className="flex items-center justify-between w-full text-sm font-bold text-gray-700 mb-2 uppercase hover:text-red-500 transition-colors"
                      >
                        <span>Sub-Category</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            subCategoryOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {subCategoryOpen && (
                        <div className="space-y-2">
                          {filterOptions.subCategories.map((subCategory) => (
                            <label
                              key={subCategory}
                              className="flex items-center cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                checked={selectedSubCategories.includes(
                                  subCategory
                                )}
                                onChange={() => toggleSubCategory(subCategory)}
                                className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                              />
                              <span className="ml-2 text-sm text-gray-700 group-hover:text-red-500 transition-colors">
                                {subCategory}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Brand Filter */}
                  {filterOptions.brands.length > 0 && (
                    <div className="mb-6">
                      <button
                        onClick={() => setBrandOpen(!brandOpen)}
                        className="flex items-center justify-between w-full text-sm font-bold text-gray-700 mb-2 uppercase hover:text-red-500 transition-colors"
                      >
                        <span>Brand</span>
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            brandOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {brandOpen && (
                        <div className="space-y-2">
                          {filterOptions.brands.map((brand) => (
                            <label
                              key={brand}
                              className="flex items-center cursor-pointer group"
                            >
                              <input
                                type="checkbox"
                                checked={selectedBrands.includes(brand)}
                                onChange={() => toggleBrand(brand)}
                                className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                              />
                              <span className="ml-2 text-gray-700 group-hover:text-red-500 transition-colors font-semibold">
                                {brand}
                              </span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Color Filter */}
                  <div className="mb-6">
                    <button
                      onClick={() => setColorOpen(!colorOpen)}
                      className="flex items-center justify-between w-full text-sm font-bold text-gray-700 mb-2 uppercase hover:text-red-500 transition-colors"
                    >
                      <span>Color</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          colorOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {colorOpen && (
                      <div className="flex flex-wrap gap-2">
                        {filterOptions.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => toggleColor(color)}
                            className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                              selectedColors.includes(color)
                                ? "bg-red-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* In Stock Only */}
                  <div className="mb-4">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="ml-2 font-bold text-gray-700 group-hover:text-red-500 transition-colors uppercase text-sm">
                        In Stock Only
                      </span>
                    </label>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* Filter Toggle (Mobile) */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort By */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-700">
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-gray-50 border-2 border-gray-200 rounded-lg font-semibold text-sm focus:border-red-500 focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <GridIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <ListIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-2xl shadow-lg"
              >
                <div className="inline-flex w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full items-center justify-center mb-6">
                  <Search className="w-16 h-16 text-gray-400" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-3">
                  No products found
                </h2>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-8 py-3 rounded-xl font-black uppercase shadow-lg transition-all"
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : viewMode === "grid" ? (
              <motion.div
                layout
                className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group cursor-pointer"
                    >
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold text-red-500 mb-1">
                          {product.brand}
                        </p>
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-2 leading-tight">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-black text-red-500">
                            Rs. {product.price.toLocaleString()}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500 text-sm">★</span>
                            <span className="text-xs font-semibold text-gray-600">
                              {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div layout className="space-y-3">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden flex group cursor-pointer"
                    >
                      <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="text-xs font-bold text-red-500 mb-1">
                                {product.brand}
                              </p>
                              <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-2">
                                {product.name}
                              </h3>
                              <p className="text-xs text-gray-600 line-clamp-1">
                                {product.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 ml-3">
                              <span className="text-yellow-500 text-sm">★</span>
                              <span className="text-xs font-semibold text-gray-600">
                                {product.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-black text-red-500">
                            Rs. {product.price.toLocaleString()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Products;
