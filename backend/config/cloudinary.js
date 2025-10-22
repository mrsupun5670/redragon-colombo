const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary
const uploadToCloudinary = async (file, folder = 'redragon-products') => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: folder,
      resource_type: 'auto',
      transformation: [
        { width: 800, height: 800, crop: 'fill', gravity: 'center' },
        { quality: 'auto:good' },
        { format: 'auto' },
        { fetch_format: 'auto' }
      ]
    });
    
    // Ensure we have a valid URL before returning
    const imageUrl = result.secure_url || result.url;
    
    if (!imageUrl) {
      console.error('Cloudinary upload failed - no URL returned');
      console.error('Result:', result);
      throw new Error('Image upload failed - no URL returned');
    }
    
    return {
      url: imageUrl,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Image upload failed');
  }
};

// Function to delete image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('Image deletion failed');
  }
};

// Function to upload multiple images
const uploadMultipleToCloudinary = async (files, folder = 'redragon-products') => {
  try {
    const uploadPromises = files.map(file => uploadToCloudinary(file, folder));
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Multiple upload error:', error);
    throw new Error('Multiple image upload failed');
  }
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  deleteFromCloudinary,
  uploadMultipleToCloudinary
};