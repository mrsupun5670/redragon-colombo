/**
 * Utility functions for handling product images with consistent sizing
 */

/**
 * Get optimized product image URL with consistent dimensions
 * @param {Object} product - Product object
 * @param {string} size - Size preset: 'thumbnail' (300x300), 'card' (400x400), 'large' (800x800)
 * @returns {string} Optimized image URL
 */
export const getOptimizedImageUrl = (product, size = 'card') => {
  const sizePresets = {
    thumbnail: { width: 300, height: 300 },
    card: { width: 400, height: 400 },
    large: { width: 800, height: 800 },
    hero: { width: 1200, height: 1200 }
  };

  const { width, height } = sizePresets[size] || sizePresets.card;

  if (product.primary_image) {
    // If it's a Cloudinary URL, add transformation for consistent sizing
    if (product.primary_image.startsWith('https://res.cloudinary.com/')) {
      // Extract the base URL and add transformations
      const baseUrl = product.primary_image.split('/upload/')[0];
      const imagePath = product.primary_image.split('/upload/')[1];
      return `${baseUrl}/upload/w_${width},h_${height},c_fill,f_auto,q_auto,g_center/${imagePath}`;
    }
    return product.primary_image;
  }

  // Fallback for missing images
  return "/image_not_there.avif";
};

/**
 * Handle image loading errors
 * @param {Event} e - Error event
 */
export const handleImageError = (e) => {
  e.target.src = '/image_not_there.avif';
};

/**
 * Get image aspect ratio style
 * @param {string} ratio - Aspect ratio (e.g., '1/1', '16/9', '4/3')
 * @returns {Object} Style object
 */
export const getAspectRatioStyle = (ratio = '1/1') => ({
  aspectRatio: ratio
});

/**
 * Cloudinary transformation presets for different use cases
 */
export const CLOUDINARY_PRESETS = {
  // Product listing cards
  product_card: 'w_400,h_400,c_fill,f_auto,q_auto,g_center',
  
  // Thumbnail for admin panels
  thumbnail: 'w_200,h_200,c_fill,f_auto,q_auto,g_center',
  
  // Large product view
  product_large: 'w_800,h_800,c_fill,f_auto,q_auto,g_center',
  
  // Hero banners
  hero: 'w_1200,h_600,c_fill,f_auto,q_auto,g_center',
  
  // Mobile optimized
  mobile: 'w_300,h_300,c_fill,f_auto,q_auto,g_center'
};

/**
 * Apply Cloudinary transformation to an image URL
 * @param {string} imageUrl - Original Cloudinary URL
 * @param {string} preset - Transformation preset key
 * @returns {string} Transformed image URL
 */
export const applyCloudinaryTransformation = (imageUrl, preset) => {
  if (!imageUrl || !imageUrl.startsWith('https://res.cloudinary.com/')) {
    return imageUrl;
  }

  const transformation = CLOUDINARY_PRESETS[preset];
  if (!transformation) {
    return imageUrl;
  }

  const baseUrl = imageUrl.split('/upload/')[0];
  const imagePath = imageUrl.split('/upload/')[1];
  return `${baseUrl}/upload/${transformation}/${imagePath}`;
};