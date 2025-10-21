-- Sample SQL commands for Cloudinary-based product images
-- Execute these commands in your database to add images for existing products

-- First, ensure the product_image_uploads table has the public_id column
CREATE TABLE IF NOT EXISTS product_image_uploads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  public_id VARCHAR(255) DEFAULT NULL,
  is_primary BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_product_id (product_id),
  INDEX idx_primary (product_id, is_primary),
  INDEX idx_public_id (public_id)
);

-- NOTE: With Cloudinary integration, images should be uploaded via API endpoints
-- The following are examples of how Cloudinary URLs would be stored:

-- Example Cloudinary URLs (these are just examples - use actual uploaded images)
-- INSERT INTO product_image_uploads (product_id, image_path, public_id, is_primary) VALUES 
-- (13, 'https://res.cloudinary.com/dgcautrc4/image/upload/v1234567890/redragon-products/redragon-k552-keyboard.jpg', 'redragon-products/redragon-k552-keyboard', 1);

-- Recommended: Use the image upload API endpoints instead of manual SQL inserts
-- POST /api/images/upload/single/:productId (for single image)
-- POST /api/images/upload/multiple/:productId (for multiple images)

-- Example of adding multiple images for one product (if you have more images)
-- INSERT INTO product_image_uploads (product_id, image_path, is_primary) VALUES 
-- (13, '/uploads/products/redragon-k552-keyboard-side.jpg', 0),
-- (13, '/uploads/products/redragon-k552-keyboard-back.jpg', 0);

-- Check if images were added successfully
SELECT p.name, pi.image_path, pi.is_primary 
FROM products p 
JOIN product_image_uploads pi ON p.id = pi.product_id 
ORDER BY p.id, pi.is_primary DESC;