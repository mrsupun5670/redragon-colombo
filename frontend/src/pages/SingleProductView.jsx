import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Check,
  X,
  Truck,
  Shield,
  RotateCcw,
  Share2,
  Home,
  ChevronRight as BreadcrumbArrow,
  Zap,
  Package,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import WhatsAppButton from "../components/common/WhatsAppButton";
import ParticleEffect from "../components/common/ParticleEffect";
import ErrorPopup from "../components/common/ErrorPopup";
import SuccessPopup from "../components/common/SuccessPopup";
import SEOHead from "../components/common/SEOHead";
import { productAPI, wishlistAPI, reviewAPI } from "../services/api";
import CartContext from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const SingleProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useContext(CartContext);
  const { isAuthenticated } = useAuth();

  // State management
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [showImageModal, setShowImageModal] = useState(false);
  const [success, setSuccess] = useState(null);
  const [popupError, setPopupError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productAPI.getById(id);

        if (response.data.success) {
          setProduct(response.data.data);
          // Set default color if available
          const colors = response.data.data.colors || [];
          if (colors.length > 0) {
            setSelectedColor(colors[0]);
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Check if product is in wishlist when product loads
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!product) return;

      if (isAuthenticated) {
        // Authenticated user - check database
        try {
          const response = await wishlistAPI.checkWishlistStatus(product.id);
          if (response.data.success) {
            setIsWishlisted(response.data.data.isInWishlist);
          }
        } catch (error) {
          console.error("Error checking wishlist status:", error);
        }
      } else {
        // Guest user - check localStorage
        const guestWishlist =
          JSON.parse(localStorage.getItem("guest_wishlist")) || [];
        const isInWishlist = guestWishlist.some(
          (item) => item.id === product.id
        );
        setIsWishlisted(isInWishlist);
      }
    };

    checkWishlistStatus();
  }, [product, isAuthenticated]);

  // Fetch product reviews
  useEffect(() => {
    const fetchReviews = async () => {
      if (!product || !product.id) return;

      try {
        setReviewsLoading(true);
        const response = await reviewAPI.getProductReviews(product.id);
        if (response.data.success) {
          setReviews(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [product]);

  // Product images from the API data (primary image and additional images)
  const productImages =
    product && product.images && product.images.length > 0
      ? product.images.map((img) => img.image_path)
      : product && product.primary_image
      ? [product.primary_image]
      : ["/image_not_there.avif"];

  // Similar products (for now we'll skip this, but could fetch from category)
  const similarProducts = [];

  // Handle image navigation
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productImages.length - 1 : prev - 1
    );
  };

  // Handle quantity
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle add to cart
  const handleAddToCart = async () => {
    if (product && product.stock_quantity > 0) {
      try {
        await addToCart(product, quantity);
        // Show success notification (you can add a toast here)
        setSuccess(`Added ${quantity} ${product.name} to cart!`);
      } catch (error) {
        console.error("Error adding to cart:", error);
        setPopupError("Failed to add item to cart. Please try again.");
      }
    }
  };

  // Handle buy now
  const handleBuyNow = async () => {
    if (product && product.stock_quantity > 0) {
      try {
        // Check if product is already in cart
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (!existingItem) {
          // Only add to cart if not already present
          await addToCart(product, quantity);
        }

        // Always navigate to cart regardless
        navigate("/cart");
      } catch (error) {
        console.error("Error adding to cart:", error);
        setPopupError("Failed to add item to cart. Please try again.");
      }
    }
  };

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out ${product?.name}`,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setSuccess("Link copied to clipboard!");
    }
  };

  // Handle add to wishlist
  const handleAddToWishlist = async () => {
    if (!isAuthenticated) {
      // Guest user - save to localStorage
      const guestWishlist =
        JSON.parse(localStorage.getItem("guest_wishlist")) || [];

      // Check if product already in wishlist
      const isAlreadyInWishlist = guestWishlist.some(
        (item) => item.id === product.id
      );

      if (isAlreadyInWishlist) {
        // Remove from wishlist
        const updatedWishlist = guestWishlist.filter(
          (item) => item.id !== product.id
        );
        localStorage.setItem("guest_wishlist", JSON.stringify(updatedWishlist));
        setIsWishlisted(false);
        setSuccess("Removed from wishlist!");
      } else {
        // Add to wishlist
        guestWishlist.push(product);
        localStorage.setItem("guest_wishlist", JSON.stringify(guestWishlist));
        setIsWishlisted(true);
        setSuccess("Added to wishlist!");
      }

      // Dispatch custom event to update navbar
      window.dispatchEvent(new Event("wishlistUpdated"));
    } else {
      // Authenticated user - use database
      try {
        if (isWishlisted) {
          // Remove from wishlist
          const response = await wishlistAPI.removeFromWishlist(product.id);
          if (response.data.success) {
            setIsWishlisted(false);
            setSuccess("Removed from wishlist!");
          } else {
            setPopupError("Failed to remove from wishlist");
          }
        } else {
          // Add to wishlist
          const response = await wishlistAPI.addToWishlist(product.id);
          if (response.data.success) {
            setIsWishlisted(true);
            setSuccess("Added to wishlist!");
          } else {
            setPopupError(response.data.message || "Failed to add to wishlist");
          }
        }

        // Dispatch custom event to update navbar
        window.dispatchEvent(new Event("wishlistUpdated"));
      } catch (error) {
        console.error("Error updating wishlist:", error);
        setPopupError("Failed to update wishlist. Please try again.");
      }
    }
  };

  // Auto-slide for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 768) {
        nextImage();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <Navbar />
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-xl">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-3xl font-black text-red-500 mb-4">
            {error || "Product Not Found"}
          </h2>
          <button
            onClick={() => navigate("/products")}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const productTitle = product
    ? `${product.name} - ${product.brand_name || "Redragon"} | Redragon Colombo`
    : "Product - Redragon Colombo";
  const productDescription = product
    ? `Buy ${product.name} in Sri Lanka. ${
        product.description || "Genuine Redragon gaming gear with warranty."
      } Price: Rs. ${product.sale_price || product.price}`
    : "Gaming product at Redragon Colombo";
  const productKeywords = product
    ? `${product.name}, ${product.brand_name || "Redragon"}, ${
        product.category_name || "gaming"
      }, sri lanka, buy online, gaming gear`
    : "redragon, gaming, sri lanka";
  const productImage = product?.images?.[0]
    ? `/uploads/products/${product.images[0]}`
    : "/images/logo/redragon_logo.png";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <SEOHead
        title={productTitle}
        description={productDescription}
        keywords={productKeywords}
        image={productImage}
        url={`/product/${id}`}
        type="product"
        product={product}
      />
      <ParticleEffect />
      <Navbar />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm overflow-x-auto scrollbar-hide">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors whitespace-nowrap"
            >
              <Home className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="font-semibold">Home</span>
            </button>
            <BreadcrumbArrow className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
            <button
              onClick={() => navigate("/products")}
              className="text-gray-600 hover:text-red-500 transition-colors font-semibold whitespace-nowrap"
            >
              Products
            </button>
            <BreadcrumbArrow className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
            <button
              onClick={() =>
                navigate(`/products?category=${product.main_category_name}`)
              }
              className="text-gray-600 hover:text-red-500 transition-colors font-semibold whitespace-nowrap"
            >
              {product.main_category_name}
            </button>
            <BreadcrumbArrow className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
            <span className="text-red-500 font-bold truncate max-w-[150px] sm:max-w-none">
              {product.name.split(" ").slice(0, 3).join(" ")}...
            </span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image with Mobile Slide Effect */}
            <motion.div
              className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden aspect-square"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stock Badge */}
              {product.stock_quantity <= 0 && (
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  Out of Stock
                </div>
              )}

              {/* Discount Badge */}
              {product.sale_price &&
                parseFloat(product.sale_price) < parseFloat(product.price) && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-black shadow-lg">
                    SALE
                  </div>
                )}

              {/* Main Image Slider */}
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={productImages[currentImageIndex]}
                    alt={product.name}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-contain p-4 sm:p-8 cursor-zoom-in"
                    onClick={() => setShowImageModal(true)}
                  />
                </AnimatePresence>

                {/* Navigation Arrows - Desktop */}
                <button
                  onClick={prevImage}
                  className="hidden md:flex absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                </button>
                <button
                  onClick={nextImage}
                  className="hidden md:flex absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                </button>

                {/* Slide Indicators - Mobile */}
                <div className="md:hidden absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {productImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex
                          ? "bg-red-500 w-6"
                          : "bg-white/60"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Thumbnail Gallery - Desktop/Tablet */}
            <div className="hidden sm:grid grid-cols-4 gap-2 sm:gap-4">
              {productImages.map((img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  whileHover={{ scale: 1.05 }}
                  className={`relative aspect-square bg-white rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex
                      ? "border-red-500 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-4 sm:space-y-6">
            {/* Brand */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-bold text-white bg-red-500 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase tracking-wider">
                {product.brand_name || product.brand}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-gray-600 flex items-center gap-1">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />1 Year Warranty
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      idx < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm sm:text-base font-bold text-gray-900">
                {product.rating}
              </span>
              <span className="text-xs sm:text-sm text-gray-500">
                ({product.reviews || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 border-red-200">
              <div className="flex items-baseline gap-3 sm:gap-4 mb-2">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-red-600">
                  Rs.{" "}
                  {parseFloat(
                    product.sale_price || product.price
                  ).toLocaleString()}
                </span>
                {product.sale_price &&
                  parseFloat(product.sale_price) <
                    parseFloat(product.price) && (
                    <span className="text-lg sm:text-xl text-gray-500 line-through">
                      Rs. {parseFloat(product.price).toLocaleString()}
                    </span>
                  )}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-semibold">
                Inclusive of all taxes • Free Shipping
              </p>
            </div>

            {/* Stock Information */}
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <div className="flex items-center gap-2">
                {product.stock_quantity > 0 ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-green-800 font-bold">
                      In Stock ({product.stock_quantity} available)
                    </span>
                  </>
                ) : (
                  <>
                    <X className="w-5 h-5 text-red-600" />
                    <span className="text-red-800 font-bold">Out of Stock</span>
                  </>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3 uppercase">
                Quantity
              </label>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center bg-white rounded-lg sm:rounded-xl border-2 border-gray-300 overflow-hidden">
                  <button
                    onClick={decreaseQuantity}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-gray-100 transition-colors border-r-2 border-gray-300"
                  >
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="w-12 sm:w-16 text-center font-bold text-base sm:text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-gray-100 transition-colors border-l-2 border-gray-300"
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                {product.stock_quantity > 0 && (
                  <span className="text-xs sm:text-sm text-green-600 font-bold flex items-center gap-1 sm:gap-2">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                    In Stock
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
              <motion.button
                onClick={handleAddToCart}
                disabled={product.stock_quantity <= 0}
                whileHover={{ scale: product.stock_quantity > 0 ? 1.02 : 1 }}
                whileTap={{ scale: product.stock_quantity > 0 ? 0.98 : 1 }}
                className={`flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all shadow-lg ${
                  product.stock_quantity > 0
                    ? "bg-white text-red-600 border-2 border-red-500 hover:bg-red-50"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                Add to Cart
              </motion.button>

              <motion.button
                onClick={handleBuyNow}
                disabled={product.stock_quantity <= 0}
                whileHover={{ scale: product.stock_quantity > 0 ? 1.02 : 1 }}
                whileTap={{ scale: product.stock_quantity > 0 ? 0.98 : 1 }}
                className={`flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg transition-all shadow-lg ${
                  product.stock_quantity > 0
                    ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                Buy Now
              </motion.button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center gap-3 sm:gap-4 pt-2">
              <motion.button
                onClick={handleAddToWishlist}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all border-2 ${
                  isWishlisted
                    ? "bg-red-50 text-red-600 border-red-300"
                    : "bg-white text-gray-700 border-gray-300 hover:border-red-300"
                }`}
              >
                <Heart
                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                    isWishlisted ? "fill-red-600" : ""
                  }`}
                />
                <span className="hidden sm:inline">
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </span>
                <span className="sm:hidden">Wishlist</span>
              </motion.button>

              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base transition-all"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Share</span>
              </motion.button>
            </div>

            {/* Features/Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
              <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    Island-wide Delivery
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    Easy returns
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl border border-gray-200">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-50 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">
                    Warranty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 mb-8 sm:mb-12">
          {/* Tab Navigation */}
          <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b-2 border-gray-200 overflow-x-auto scrollbar-hide">
            {[
              { id: "description", label: "Description" },
              { id: "specifications", label: "Specifications" },
              { id: "reviews", label: "Reviews" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 font-bold text-sm sm:text-base whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "text-red-600 border-b-4 border-red-600 -mb-0.5"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "description" && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                      Product Description
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                      {product.description ||
                        "Experience the ultimate gaming performance with this premium product. Designed for gamers who demand the best, it combines cutting-edge technology with exceptional build quality."}
                    </p>
                  </div>

                  {product.features && product.features.length > 0 && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Key Features
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {product.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-gray-700"
                          >
                            <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    {[
                      { label: "Brand", value: product.brand_name },
                      { label: "Category", value: product.main_category_name },
                      {
                        label: "Sub-Category",
                        value: product.sub_category_name,
                      },
                      { label: "SKU", value: product.sku },
                      {
                        label: "Weight",
                        value: product.weight ? `${product.weight}g` : "N/A",
                      },
                      {
                        label: "Stock Status",
                        value:
                          product.stock_quantity > 0
                            ? `In Stock (${product.stock_quantity})`
                            : "Out of Stock",
                      },
                    ].map((spec, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl"
                      >
                        <span className="text-xs sm:text-sm font-bold text-gray-600 uppercase">
                          {spec.label}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-gray-900">
                          {spec.value || "N/A"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        Customer Reviews
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, idx) => {
                            // Calculate average rating from reviews
                            const averageRating =
                              reviews.length > 0
                                ? reviews.reduce(
                                    (sum, review) =>
                                      sum + parseInt(review.rating),
                                    0
                                  ) / reviews.length
                                : 0;

                            return (
                              <Star
                                key={idx}
                                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                  idx < Math.floor(averageRating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            );
                          })}
                        </div>
                        <span className="text-base sm:text-lg font-bold text-gray-900">
                          {reviews.length > 0
                            ? (
                                reviews.reduce(
                                  (sum, review) =>
                                    sum + parseInt(review.rating),
                                  0
                                ) / reviews.length
                              ).toFixed(1)
                            : "0.0"}{" "}
                          out of 5
                        </span>
                        <span className="text-sm text-gray-500">
                          ({reviews.length}{" "}
                          {reviews.length === 1 ? "review" : "reviews"})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Reviews List or Empty State */}
                  {reviewsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </div>
                  ) : reviews.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 text-base mb-4">
                        No reviews yet
                      </p>
                      <p className="text-gray-400 text-sm">
                        Be the first to review this product!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {reviews.map((review) => {
                        // Format the date
                        const reviewDate = new Date(review.created_at);
                        const formattedDate = reviewDate.toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        );
                        const formattedTime = reviewDate.toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        );

                        return (
                          <div
                            key={review.id}
                            className="border border-gray-200 rounded-lg sm:rounded-xl p-4 sm:p-6 space-y-3 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-bold text-sm sm:text-base text-gray-900">
                                  {review.customer_name || "Anonymous Customer"}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500">
                                  Verified Purchase
                                </p>
                              </div>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, idx) => (
                                  <Star
                                    key={idx}
                                    className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                      idx < parseInt(review.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                              {review.review_text}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formattedDate} at {formattedTime}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mb-8 sm:mb-12">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 uppercase">
                Similar Products
              </h2>
              <button
                onClick={() => navigate("/products")}
                className="text-sm sm:text-base text-red-500 hover:text-red-600 font-bold flex items-center gap-1 sm:gap-2"
              >
                View All
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {similarProducts.map((similar) => (
                <motion.div
                  key={similar.id}
                  whileHover={{ y: -5 }}
                  onClick={() => {
                    navigate(`/product/${similar.id}`);
                    window.scrollTo(0, 0);
                  }}
                  className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden cursor-pointer group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={similar.image}
                      alt={similar.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {!similar.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-4">
                    <p className="text-xs font-bold text-red-500 mb-1">
                      {similar.brand}
                    </p>
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm line-clamp-2 mb-2 leading-tight">
                      {similar.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-base sm:text-lg font-black text-red-500">
                        Rs. {similar.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-xs sm:text-sm">
                          ★
                        </span>
                        <span className="text-xs font-semibold text-gray-600">
                          {similar.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Image Modal (Zoom) */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              onClick={() => setShowImageModal(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={productImages[currentImageIndex]}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <WhatsAppButton />
      <ErrorPopup message={popupError} onClose={() => setPopupError(null)} />
      <SuccessPopup message={success} onClose={() => setSuccess(null)} />
    </div>
  );
};

export default SingleProductView;
