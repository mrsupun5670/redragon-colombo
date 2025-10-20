-- Sample SQL commands to add product images manually
-- Execute these commands in your database to add images for existing products

-- First, create the product_image_uploads table if it doesn't exist
CREATE TABLE IF NOT EXISTS product_image_uploads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  is_primary BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_product_id (product_id),
  INDEX idx_primary (product_id, is_primary)
);

-- Add images for Redragon K552 Kumara Mechanical Keyboard (Product ID: 13)
INSERT INTO product_image_uploads (product_id, image_path, is_primary) VALUES 
(13, '/uploads/products/redragon-k552-keyboard.jpg', 1);

-- Add images for Redragon M652 Cobra Gaming Mouse (Product ID: 14)
INSERT INTO product_image_uploads (product_id, image_path, is_primary) VALUES 
(14, '/uploads/products/redragon-m652-mouse.jpg', 1);

-- Add images for Redragon H510 Gaming Headset (Product ID: 15)
INSERT INTO product_image_uploads (product_id, image_path, is_primary) VALUES 
(15, '/uploads/products/redragon-h510-headset.jpg', 1);

-- Add images for Dell XPS 15 9530 (Product ID: 1)
INSERT INTO product_image_uploads (product_id, image_path, is_primary) VALUES 
(1, '/uploads/products/dell-xps-laptop.jpg', 1);

-- Example of adding multiple images for one product (if you have more images)
-- INSERT INTO product_image_uploads (product_id, image_path, is_primary) VALUES 
-- (13, '/uploads/products/redragon-k552-keyboard-side.jpg', 0),
-- (13, '/uploads/products/redragon-k552-keyboard-back.jpg', 0);

-- Check if images were added successfully
SELECT p.name, pi.image_path, pi.is_primary 
FROM products p 
JOIN product_image_uploads pi ON p.id = pi.product_id 
ORDER BY p.id, pi.is_primary DESC;