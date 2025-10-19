-- Add password_hash column to customers table for authentication
ALTER TABLE `customers` 
ADD COLUMN `password_hash` VARCHAR(255) NOT NULL AFTER `email`;

-- Add index for better performance on authentication queries
ALTER TABLE `customers` 
ADD INDEX `idx_customer_credentials` (`email`, `password_hash`);