# Cloudinary Integration Setup

## Overview
The application now uses Cloudinary for image storage instead of local file uploads. All product images are uploaded to Cloudinary and the URLs are stored in the database.

## Environment Variables Required
Add these to your `.env` file:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Database Migration
Run the following SQL to add the public_id column for Cloudinary integration:

```sql
ALTER TABLE product_image_uploads 
ADD COLUMN public_id VARCHAR(255) DEFAULT NULL AFTER image_path;

CREATE INDEX idx_product_images_public_id ON product_image_uploads(public_id);
```

## API Changes

### Image Upload Endpoints
- `POST /api/images/upload/single/:productId` - Upload single image
- `POST /api/images/upload/multiple/:productId` - Upload multiple images

### Response Format
```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "https://res.cloudinary.com/...",
    "public_id": "redragon-products/...",
    "width": 800,
    "height": 600,
    "format": "jpg"
  }
}
```

### Image Retrieval
- `GET /api/images/product/:productId` - Get all images for a product
- Images now return direct Cloudinary URLs

### Image Deletion
- `DELETE /api/images/:imageId` - Delete image (removes from both database and Cloudinary)

## Features
- **Automatic optimization**: Images are automatically optimized for web
- **Format conversion**: Automatic format selection (WebP when supported)
- **Size limits**: 800x800px max dimensions
- **Folder organization**: All images stored in `redragon-products` folder
- **Backup safety**: Database deletion continues even if Cloudinary deletion fails

## Migration from Local Storage
Existing local images will continue to work, but new uploads will use Cloudinary. To fully migrate:
1. Upload existing product images through the admin panel
2. Update database to use new Cloudinary URLs
3. Remove old local files from `uploads/` directory