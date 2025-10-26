-- Migration: Add password reset code fields to customers table
-- Date: 2024-10-26

-- Add reset code fields to customers table
ALTER TABLE customers 
ADD COLUMN reset_code VARCHAR(6) NULL DEFAULT NULL,
ADD COLUMN reset_code_expires DATETIME NULL DEFAULT NULL;

-- Add index for faster code lookups
CREATE INDEX idx_reset_code ON customers(reset_code);

-- Verify the changes
DESCRIBE customers;