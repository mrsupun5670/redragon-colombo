# Product Image Upload System

## Overview
This system allows you to store product images locally in the backend and serve them to the frontend. Images are stored in the `uploads/products/` directory and their paths are saved in the `product_images` table.

## Directory Structure
```
backend/
├── uploads/
│   └── products/           # All product images stored here
│       ├── redragon-k552-keyboard.jpg
│       ├── redragon-m652-mouse.jpg
│       └── ...
├── routes/
│   └── images.js          # Image upload and management routes
├── models/
│   └── ProductImage.js    # Product image database model
└── middleware/
    └── upload.js          # Multer configuration for file uploads
```

## Image Path Examples
When you store images manually, use these path formats in the database:

### ✅ Correct Image Paths
```sql
-- Always start with /uploads/products/
INSERT INTO product_images (product_id, image_path, is_primary) VALUES 
(13, '/uploads/products/redragon-k552-keyboard.jpg', 1);
```

### ❌ Incorrect Image Paths
```sql
-- Don't use these formats:
(13, 'redragon-k552-keyboard.jpg', 1);           -- Missing path prefix
(13, 'uploads/products/keyboard.jpg', 1);        -- Missing leading slash
(13, '/backend/uploads/products/keyboard.jpg', 1); -- Including backend folder
```

## Manual Image Setup Process

### 1. Add Images to Uploads Folder
Place your images in: `/backend/uploads/products/`

Example files:
- `redragon-k552-keyboard.jpg`
- `redragon-m652-mouse.jpg` 
- `dell-xps-laptop.jpg`

### 2. Insert Database Records
```sql
-- For each product, add image records
INSERT INTO product_images (product_id, image_path, is_primary, created_at) VALUES 
(13, '/uploads/products/redragon-k552-keyboard.jpg', 1, NOW()),
(14, '/uploads/products/redragon-m652-mouse.jpg', 1, NOW()),
(15, '/uploads/products/redragon-h510-headset.jpg', 1, NOW());
```

### 3. Verify Images Work
Visit: `http://localhost:5001/uploads/products/your-image.jpg`

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