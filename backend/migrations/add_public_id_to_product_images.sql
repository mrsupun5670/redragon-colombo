-- Add public_id column to product_image_uploads table for Cloudinary integration
ALTER TABLE product_image_uploads 
ADD COLUMN public_id VARCHAR(255) DEFAULT NULL AFTER image_path;

-- Add index for public_id for faster lookups
CREATE INDEX idx_product_images_public_id ON product_image_uploads(public_id);