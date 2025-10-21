# Product Image Upload System

## Overview
This system uses Cloudinary for cloud-based image storage and management. Images are uploaded to Cloudinary and their URLs are saved in the `product_image_uploads` table. This provides better performance, automatic optimization, and CDN delivery.

## Configuration Structure
```
backend/
├── config/
│   └── cloudinary.js      # Cloudinary configuration and upload functions
├── routes/
│   └── images.js          # Image upload and management routes
├── models/
│   └── ProductImage.js    # Product image database model
└── middleware/
    └── upload.js          # Multer configuration for memory storage
```

## Cloudinary URL Examples
Images are now stored on Cloudinary and return full URLs:

### ✅ Cloudinary URLs (Automatic)
```sql
-- Cloudinary URLs are automatically generated during upload
INSERT INTO product_image_uploads (product_id, image_path, public_id, is_primary) VALUES 
(13, 'https://res.cloudinary.com/dgcautrc4/image/upload/v1234567890/redragon-products/keyboard.jpg', 'redragon-products/keyboard', 1);
```

### Environment Variables Required
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Image Upload Process

### 1. Upload via API
Use the image upload endpoints to upload images directly to Cloudinary:

### 2. Automatic Database Storage
The system automatically saves Cloudinary URLs and public_ids to the database

### 3. Verify Images Work
Images are served directly from Cloudinary CDN with automatic optimization

## API Endpoints

### Upload Images (Admin Only)
```bash
# Single image upload
POST /api/images/upload/single/:productId
Content-Type: multipart/form-data
Body: image file with field name "image"

# Multiple images upload  
POST /api/images/upload/multiple/:productId
Content-Type: multipart/form-data
Body: image files with field name "images"
```

### Get Product Images
```bash
# Get all images for a product
GET /api/images/product/:productId
```

### Manage Images (Admin Only)
```bash
# Set image as primary
PUT /api/images/set-primary/:imageId
Body: { "productId": 123 }

# Delete image
DELETE /api/images/:imageId
```

## Image Specifications
- **Supported formats**: JPG, JPEG, PNG, GIF, WebP
- **Maximum file size**: 5MB per image
- **Maximum files per upload**: 5 images
- **Recommended dimensions**: 800x600px or higher

## How It Works in Frontend

The ProductCard component automatically:
1. Checks for `product.primary_image` from database
2. Constructs full URL: `http://localhost:5001/uploads/products/filename.jpg`
3. Falls back to default image if none found

## Database Schema
```sql
product_images table:
- id (Primary Key)
- product_id (Foreign Key to products.id)
- image_path (VARCHAR 255) - Always starts with '/uploads/products/'
- is_primary (BOOLEAN) - Only one primary image per product
- created_at (TIMESTAMP)
```

## Sample Images Included
I've downloaded sample images for testing:
- `redragon-k552-keyboard.jpg` - For Redragon keyboard
- `redragon-m652-mouse.jpg` - For Redragon mouse  
- `redragon-h510-headset.jpg` - For Redragon headset
- `dell-xps-laptop.jpg` - For Dell laptop

Execute the SQL in `sample_product_images.sql` to link these images to your products.