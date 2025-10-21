-- Create product_image_uploads table for storing uploaded product images
CREATE TABLE IF NOT EXISTS product_image_uploads (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  is_primary BOOLEAN DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_product_id (product_id),
  INDEX idx_primary (product_id, is_primary),
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);