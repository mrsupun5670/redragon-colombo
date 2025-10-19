-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 19, 2025 at 02:46 PM
-- Server version: 11.8.3-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u331468302_redragon`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `last_login` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `password_hash`, `is_active`, `last_login`) VALUES
(1, 'admin\r\n', 'admin@gmail.com', 'rghaw4g3y43g sfd3g34tg', 1, '2025-10-15 23:54:52');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `slug`, `logo_url`, `description`, `is_active`) VALUES
(1, 'Dell', 'dell', 'https://upload.wikimedia.org/wikipedia/commons/5/51/Dell_Logo.svg', 'Dell Inc. is an American multinational computer technology company.', 1),
(2, 'HP', 'hp', 'https://upload.wikimedia.org/wikipedia/commons/2/2f/HP_Logo_2008.svg', 'Hewlett-Packard produces laptops, desktops, printers, and accessories.', 1),
(3, 'Lenovo', 'lenovo', 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Lenovo_logo_2015.svg', 'Lenovo manufactures laptops, desktops, workstations, and accessories.', 1),
(4, 'Apple', 'apple', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', 'Apple Inc. designs and sells consumer electronics and software.', 1),
(5, 'Asus', 'asus', 'https://upload.wikimedia.org/wikipedia/commons/6/6a/ASUS_Logo.svg', 'ASUS is a Taiwanese multinational known for laptops and motherboards.', 1),
(6, 'Acer', 'acer', 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Acer_logo.svg', 'Acer produces laptops, desktops, monitors, and accessories.', 1),
(7, 'MSI', 'msi', 'https://upload.wikimedia.org/wikipedia/commons/1/1e/MSI_logo.svg', 'MSI specializes in gaming laptops, desktops, and PC components.', 1),
(8, 'Logitech', 'logitech', 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Logitech_logo_2015.svg', 'Logitech designs computer peripherals and accessories.', 1),
(9, 'Corsair', 'corsair', 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Corsair_Logo.svg', 'Corsair is known for high-performance gaming hardware and accessories.', 1),
(10, 'Kingston', 'kingston', 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Kingston_Logo.svg', 'Kingston manufactures memory products and storage devices.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `districts_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `hex_code` varchar(7) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `name`, `hex_code`, `created_at`) VALUES
(1, 'Black', '#000000', '2025-10-10 18:38:09'),
(2, 'White', '#FFFFFF', '2025-10-10 18:38:09'),
(3, 'Gray', '#808080', '2025-10-10 18:38:09'),
(4, 'Silver', '#C0C0C0', '2025-10-10 18:38:09'),
(5, 'Red', '#FF0000', '2025-10-10 18:38:09'),
(6, 'Blue', '#0000FF', '2025-10-10 18:38:09'),
(7, 'Green', '#008000', '2025-10-10 18:38:09'),
(8, 'Yellow', '#FFFF00', '2025-10-10 18:38:09'),
(9, 'Orange', '#FFA500', '2025-10-10 18:38:09'),
(10, 'Purple', '#800080', '2025-10-10 18:38:09'),
(11, 'Pink', '#FFC0CB', '2025-10-10 18:38:09'),
(12, 'Gold', '#FFD700', '2025-10-10 18:38:09');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `email_verified` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `first_name`, `last_name`, `email`, `password_hash`, `phone`, `address_line1`, `address_line2`, `city_id`, `postal_code`, `is_active`, `email_verified`, `created_at`, `updated_at`) VALUES
(1, 'Kasun\r\n', 'Perera', 'kasun@gmail.com', '', '0752010915', NULL, NULL, NULL, NULL, 1, 0, '2025-10-15 00:05:24', '2025-10-15 00:05:24'),
(2, 'Test', 'User', 'test@example.com', '$2b$12$QOuQCYQ1PrAQEKx.SvRdZuNfUvB9P28W9Un96YzO7hDtn.x8/9UJu', '0771234567', NULL, NULL, NULL, NULL, 1, 0, '2025-10-19 13:38:42', '2025-10-19 13:38:42'),
(3, 'John', 'Doe', 'john@example.com', '$2b$12$UkxOVs.FoiPXDWDdaxoz9u9QdEUpiKFvUUphMMPEIOsFMU08u3Iba', '0771234568', NULL, NULL, NULL, NULL, 1, 0, '2025-10-19 13:43:42', '2025-10-19 13:43:42'),
(4, 'Browser', 'Test', 'browsertest@example.com', '$2b$12$5olloMdIcD/8E50DMIWC/.feVTwHQf/bE6uAhehmwh1pL9j.4wXDu', '0771234599', NULL, NULL, NULL, NULL, 1, 0, '2025-10-19 14:15:18', '2025-10-19 14:15:18'),
(5, 'Gihan', 'Punarji', 'gihanpunarji@gmail.com', '$2b$12$9JqUkx4yl7AuEKC3asrU/.zsLVzYqG6aZtpVR33QAum2wuFEebeEK', '0715327065', NULL, NULL, NULL, NULL, 1, 0, '2025-10-19 14:17:44', '2025-10-19 14:17:44');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_zones`
--

CREATE TABLE `delivery_zones` (
  `id` int(11) NOT NULL,
  `zone_name` varchar(50) DEFAULT NULL,
  `base_charge` decimal(10,2) DEFAULT NULL,
  `extra_charge` decimal(10,2) DEFAULT NULL,
  `min_weight` decimal(10,2) DEFAULT 1.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `delivery_zones`
--

INSERT INTO `delivery_zones` (`id`, `zone_name`, `base_charge`, `extra_charge`, `min_weight`) VALUES
(1, 'Inside Colombo', 300.00, 80.00, 1.00);

-- --------------------------------------------------------

--
-- Table structure for table `districts`
--

CREATE TABLE `districts` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `provinces_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `districts`
--

INSERT INTO `districts` (`id`, `name`, `provinces_id`) VALUES
(1, 'Kandy', 1),
(2, 'Matale', 1),
(3, 'Nuwara Eliya', 1),
(4, 'Batticaloa', 2),
(5, 'Ampara', 2),
(6, 'Trincomalee', 2),
(7, 'Anuradhapura', 3),
(8, 'Polonnaruwa', 3),
(9, 'Kurunegala', 4),
(10, 'Puttalam', 4),
(11, 'Jaffna', 5),
(12, 'Kilinochchi', 5),
(13, 'Mannar', 5),
(14, 'Vavuniya', 5),
(15, 'Mullaitivu', 5),
(16, 'Ratnapura', 6),
(17, 'Kegalle', 6),
(18, 'Galle', 7),
(19, 'Matara', 7),
(20, 'Hambantota', 7),
(21, 'Badulla', 8),
(22, 'Monaragala', 8),
(23, 'Colombo', 9),
(24, 'Gampaha', 9),
(25, 'Kalutara', 9);

-- --------------------------------------------------------

--
-- Table structure for table `main_categories`
--

CREATE TABLE `main_categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(50) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `main_categories`
--

INSERT INTO `main_categories` (`id`, `name`, `slug`, `description`, `icon`, `is_active`, `created_at`) VALUES
(1, 'Laptops', 'laptops', 'Wide range of gaming, business, and student laptops.', 'laptop', 1, '2025-10-10 18:32:18'),
(2, 'Desktops & PCs', 'desktops-pcs', 'Custom-built and branded desktop computers for work and gaming.', 'pc', 1, '2025-10-10 18:32:18'),
(3, 'Monitors', 'monitors', 'HD, 4K, and curved monitors for every setup.', 'monitor', 1, '2025-10-10 18:32:18'),
(4, 'Computer Accessories', 'computer-accessories', 'Keyboards, mice, headsets, and other essential peripherals.', 'keyboard-mouse', 1, '2025-10-10 18:32:18'),
(5, 'Networking', 'networking', 'Routers, network cables, and WiFi adapters.', 'wifi', 1, '2025-10-10 18:32:18'),
(6, 'Storage Devices', 'storage-devices', 'Hard drives, SSDs, and portable storage solutions.', 'hdd', 1, '2025-10-10 18:32:18'),
(7, 'Components', 'components', 'Graphic cards, processors, RAM, and other PC components.', 'cpu', 1, '2025-10-10 18:32:18'),
(8, 'Software & Licenses', 'software-licenses', 'Operating systems, antivirus, and productivity software.', 'software', 1, '2025-10-10 18:32:18');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(50) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `shipping_fee` decimal(10,2) DEFAULT 0.00,
  `discount` decimal(10,2) DEFAULT 0.00,
  `total` decimal(10,2) NOT NULL,
  `payment_method_id` int(11) NOT NULL,
  `payment_status` enum('pending','paid','failed','refunded') DEFAULT 'pending',
  `paid_at` timestamp NULL DEFAULT NULL,
  `order_status` enum('pending','confirmed','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `customer_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_image` varchar(500) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment_methods`
--

CREATE TABLE `payment_methods` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment_methods`
--

INSERT INTO `payment_methods` (`id`, `name`, `slug`, `is_active`) VALUES
(1, 'Credit Card', 'credit_card', 1),
(2, 'Debit Card', 'debit_card', 1),
(3, 'Bank Transfer', 'bank_transfer', 1),
(4, 'Cash on Delivery', 'cash_on_delivery', 1),
(5, 'Google Pay', 'google_pay', 1);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specifications`)),
  `brand_id` int(11) NOT NULL DEFAULT 1,
  `main_category_id` int(11) NOT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `color_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `weight` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `description`, `specifications`, `brand_id`, `main_category_id`, `sub_category_id`, `price`, `sale_price`, `cost_price`, `stock_quantity`, `color_id`, `is_active`, `created_at`, `updated_at`, `weight`) VALUES
(1, 'Dell XPS 15 9530', 'dell-xps-15-9530', 'DXP9530-2025', 'High-performance laptop with stunning display and build quality.', '{\"Processor\": \"Intel Core i7-13620H\", \"RAM\": \"16GB\", \"Storage\": \"512GB SSD\", \"Display\": \"15.6-inch 4K OLED\"}', 1, 1, 1, 1999.99, 1899.99, 1500.00, 10, 1, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL),
(2, 'Apple MacBook Pro 16\"', 'apple-macbook-pro-16', 'MBP16-2025', 'Powerful MacBook Pro with M1 Pro chip.', '{\"Processor\": \"Apple M1 Pro\", \"RAM\": \"32GB\", \"Storage\": \"1TB SSD\", \"Display\": \"16-inch Retina\"}', 2, 1, 1, 2499.99, 2399.99, 2000.00, 8, 2, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL),
(3, 'Logitech MX Master 3S Mouse', 'logitech-mx-master-3s', 'LOG-MX3S', 'Ergonomic wireless mouse with advanced features.', '{\"Connectivity\": \"Wireless\", \"Battery\": \"70 days\", \"DPI\": \"4000\"}', 3, 2, 4, 99.99, 89.99, 60.00, 50, 3, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL),
(4, 'Corsair Vengeance RGB Pro 16GB RAM', 'corsair-vengeance-rgb-16gb', 'COR-VEN16', 'High-performance RGB memory for gaming and heavy tasks.', '{\"Capacity\": \"16GB\", \"Speed\": \"3200MHz\", \"Type\": \"DDR4\"}', 4, 2, 5, 89.99, 79.99, 50.00, 30, 4, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL),
(5, 'Samsung 970 EVO Plus 1TB SSD', 'samsung-970-evo-plus-1tb', 'SAM-970EVO1TB', 'Ultra-fast NVMe SSD for high-speed performance.', '{\"Capacity\": \"1TB\", \"Read Speed\": \"3500MB/s\", \"Write Speed\": \"3300MB/s\"}', 5, 2, 6, 149.99, 129.99, 100.00, 20, 5, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL),
(6, 'HP Spectre x360 14', 'hp-spectre-x360-14', 'HPSX36014', 'Versatile 2-in-1 laptop with premium design.', '{\"Processor\": \"Intel Core i7-1165G7\", \"RAM\": \"16GB\", \"Storage\": \"1TB SSD\", \"Display\": \"13.5-inch OLED\"}', 6, 1, 1, 1799.99, 1699.99, 1400.00, 15, 1, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL),
(7, 'Lenovo ThinkPad X1 Carbon Gen 9', 'lenovo-thinkpad-x1-carbon-gen-9', 'LTPX1C9', 'Business laptop with robust build and performance.', '{\"Processor\": \"Intel Core i7-1185G7\", \"RAM\": \"16GB\", \"Storage\": \"512GB SSD\", \"Display\": \"14-inch Full HD\"}', 7, 1, 1, 1499.99, 1399.99, 1200.00, 20, 1, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL),
(8, 'Acer Predator Helios 300', 'acer-predator-helios-300', 'ACR-PH300', 'Gaming laptop with powerful GPU and cooling system.', '{\"Processor\": \"Intel Core i7-11800H\", \"RAM\": \"16GB\", \"Storage\": \"1TB SSD\", \"GPU\": \"NVIDIA GeForce RTX 3060\"}', 8, 1, 1, 1299.99, 1199.99, 1000.00, 25, 1, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL),
(9, 'MSI GF65 Thin', 'msi-gf65-thin', 'MSI-GF65', 'Budget-friendly gaming laptop with solid performance.', '{\"Processor\": \"Intel Core i7-10750H\", \"RAM\": \"16GB\", \"Storage\": \"512GB SSD\", \"GPU\": \"NVIDIA GeForce GTX 1660 Ti\"}', 9, 1, 1, 999.99, 899.99, 800.00, 30, 1, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL),
(10, 'Razer Blade 15 Advanced', 'razer-blade-15-advanced', 'RZR-B15A', 'Premium gaming laptop with sleek design and high refresh rate display.', '{\"Processor\": \"Intel Core i7-11800H\", \"RAM\": \"16GB\", \"Storage\": \"1TB SSD\", \"GPU\": \"NVIDIA GeForce RTX 3070\"}', 10, 1, 1, 2299.99, 2199.99, 1800.00, 12, 1, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL),
(11, 'Dell Inspiron 14 5000', 'dell-inspiron-14-5000', 'DIP14-5000', 'Affordable laptop for everyday tasks and productivity.', '{\"Processor\": \"Intel Core i5-1135G7\", \"RAM\": \"8GB\", \"Storage\": \"256GB SSD\", \"Display\": \"14-inch Full HD\"}', 1, 1, 1, 649.99, 599.99, 500.00, 50, 1, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL),
(12, 'HP Pavilion x360 14', 'hp-pavilion-x360-14', 'HPPX36014', 'Convertible laptop with touchscreen and stylus support.', '{\"Processor\": \"Intel Core i5-1135G7\", \"RAM\": \"8GB\", \"Storage\": \"512GB SSD\", \"Display\": \"14-inch Full HD\"}', 6, 1, 1, 749.99, 699.99, 600.00, 40, 1, 1, '2025-10-10 18:45:58', '2025-10-10 18:45:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `image_id` int(11) NOT NULL,
  `image_path` int(11) NOT NULL,
  `product_image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_reviews`
--

CREATE TABLE `product_reviews` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `rating` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `review_text` text DEFAULT NULL,
  `is_approved` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `provinces`
--

CREATE TABLE `provinces` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `provinces`
--

INSERT INTO `provinces` (`id`, `name`) VALUES
(1, 'Central'),
(2, 'Eastern'),
(3, 'North Central'),
(4, 'North Western'),
(5, 'Northern'),
(6, 'Sabaragamuwa'),
(7, 'Southern'),
(8, 'Uva'),
(9, 'Western');

-- --------------------------------------------------------

--
-- Table structure for table `refunds`
--

CREATE TABLE `refunds` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `order_item_id` int(11) DEFAULT NULL,
  `reason` enum('damaged','wrong_item','not_as_described','changed_mind','other') NOT NULL,
  `reason_details` text DEFAULT NULL,
  `refund_amount` decimal(10,2) NOT NULL,
  `status` enum('requested','approved','rejected','processed') DEFAULT 'requested',
  `admin_notes` text DEFAULT NULL,
  `processed_by` int(11) NOT NULL,
  `requested_at` timestamp NULL DEFAULT current_timestamp(),
  `processed_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `shipping_addresses`
--

CREATE TABLE `shipping_addresses` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `recipient_name` varchar(200) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address_line1` varchar(255) NOT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city_name` varchar(100) NOT NULL,
  `district_name` varchar(100) NOT NULL,
  `province_name` varchar(100) NOT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `delivery_notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sub_categories`
--

CREATE TABLE `sub_categories` (
  `id` int(11) NOT NULL,
  `main_category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_categories`
--

INSERT INTO `sub_categories` (`id`, `main_category_id`, `name`, `slug`, `description`, `is_active`, `created_at`) VALUES
(1, 1, 'Gaming Laptops', 'gaming-laptops', 'High-performance laptops for gaming.', 1, '2025-10-10 18:36:44'),
(2, 1, 'Business Laptops', 'business-laptops', 'Reliable laptops for office and productivity.', 1, '2025-10-10 18:36:44'),
(3, 1, 'Student Laptops', 'student-laptops', 'Budget-friendly laptops for students.', 1, '2025-10-10 18:36:44'),
(4, 1, '2-in-1 Convertibles', 'convertible-laptops', 'Touchscreen laptops with tablet mode.', 1, '2025-10-10 18:36:44'),
(5, 2, 'Gaming PCs', 'gaming-pcs', 'Custom or branded desktops for gaming.', 1, '2025-10-10 18:36:44'),
(6, 2, 'Office PCs', 'office-pcs', 'Desktops built for business and work environments.', 1, '2025-10-10 18:36:44'),
(7, 2, 'All-in-One PCs', 'all-in-one-pcs', 'Compact all-in-one desktop computers.', 1, '2025-10-10 18:36:44'),
(8, 3, 'Full HD Monitors', 'full-hd-monitors', '1080p monitors for general use.', 1, '2025-10-10 18:36:44'),
(9, 3, '4K Monitors', '4k-monitors', 'Ultra HD 4K monitors for designers and gamers.', 1, '2025-10-10 18:36:44'),
(10, 3, 'Curved Monitors', 'curved-monitors', 'Immersive curved displays.', 1, '2025-10-10 18:36:44'),
(11, 4, 'Keyboards', 'keyboards', 'Mechanical and membrane keyboards.', 1, '2025-10-10 18:36:44'),
(12, 4, 'Mice', 'mice', 'Wired and wireless computer mice.', 1, '2025-10-10 18:36:44'),
(13, 4, 'Headsets', 'headsets', 'Gaming and office headsets.', 1, '2025-10-10 18:36:44'),
(14, 4, 'Webcams', 'webcams', 'HD and 4K webcams for streaming and calls.', 1, '2025-10-10 18:36:44'),
(15, 5, 'WiFi Routers', 'wifi-routers', 'High-speed routers for home and office.', 1, '2025-10-10 18:36:44'),
(16, 5, 'Network Cables', 'network-cables', 'Ethernet and LAN cables.', 1, '2025-10-10 18:36:44'),
(17, 5, 'Adapters & Modems', 'adapters-modems', 'USB WiFi adapters and DSL modems.', 1, '2025-10-10 18:36:44'),
(18, 6, 'External Hard Drives', 'external-hard-drives', 'Portable HDDs and SSDs.', 1, '2025-10-10 18:36:44'),
(19, 6, 'Solid State Drives (SSD)', 'ssd', 'Fast SSD storage options.', 1, '2025-10-10 18:36:44'),
(20, 6, 'USB Flash Drives', 'usb-flash-drives', 'Compact flash storage devices.', 1, '2025-10-10 18:36:44'),
(21, 6, 'Memory Cards', 'memory-cards', 'SD and microSD cards.', 1, '2025-10-10 18:36:44'),
(22, 7, 'Processors (CPU)', 'processors', 'Latest Intel and AMD CPUs.', 1, '2025-10-10 18:36:44'),
(23, 7, 'Graphics Cards (GPU)', 'graphics-cards', 'NVIDIA and AMD GPUs.', 1, '2025-10-10 18:36:44'),
(24, 7, 'Motherboards', 'motherboards', 'Boards for Intel and AMD platforms.', 1, '2025-10-10 18:36:44'),
(25, 7, 'Memory (RAM)', 'memory-ram', 'DDR4 and DDR5 memory modules.', 1, '2025-10-10 18:36:44'),
(26, 7, 'Power Supplies (PSU)', 'power-supplies', 'Reliable PSUs for systems.', 1, '2025-10-10 18:36:44'),
(27, 7, 'Cooling Systems', 'cooling-systems', 'Air and liquid CPU coolers.', 1, '2025-10-10 18:36:44'),
(28, 8, 'Operating Systems', 'operating-systems', 'Windows, Linux, and macOS licenses.', 1, '2025-10-10 18:36:44'),
(29, 8, 'Antivirus & Security', 'antivirus-security', 'Protective software for devices.', 1, '2025-10-10 18:36:44'),
(30, 8, 'Office & Productivity', 'office-productivity', 'Microsoft Office and similar tools.', 1, '2025-10-10 18:36:44');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

CREATE TABLE `wishlists` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wishlist_items`
--

CREATE TABLE `wishlist_items` (
  `id` int(11) NOT NULL,
  `wishlist_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username_unique` (`username`),
  ADD UNIQUE KEY `email_unique` (`email`),
  ADD KEY `idx_admin_username` (`username`),
  ADD KEY `idx_admin_email` (`email`),
  ADD KEY `idx_admin_active` (`is_active`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_unique` (`name`),
  ADD UNIQUE KEY `slug_unique` (`slug`),
  ADD KEY `idx_brand_slug` (`slug`),
  ADD KEY `idx_brand_active` (`is_active`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customer_id_unique` (`customer_id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_cart_product` (`cart_id`,`product_id`),
  ADD KEY `cart_items_ibfk_2` (`product_id`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_cities_districts1_idx` (`districts_id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_unique` (`name`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `email_unique` (`email`),
  ADD KEY `idx_customer_email` (`email`),
  ADD KEY `idx_customer_phone` (`phone`),
  ADD KEY `idx_customer_city` (`city_id`),
  ADD KEY `idx_customer_credentials` (`email`,`password_hash`);

--
-- Indexes for table `delivery_zones`
--
ALTER TABLE `delivery_zones`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `districts`
--
ALTER TABLE `districts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_districts_provinces1_idx` (`provinces_id`);

--
-- Indexes for table `main_categories`
--
ALTER TABLE `main_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_unique` (`name`),
  ADD UNIQUE KEY `slug_unique` (`slug`),
  ADD KEY `idx_main_cat_slug` (`slug`),
  ADD KEY `idx_main_cat_active` (`is_active`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_number_unique` (`order_number`),
  ADD KEY `orders_ibfk_1` (`customer_id`),
  ADD KEY `orders_ibfk_2` (`payment_method_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_ibfk_1` (`order_id`),
  ADD KEY `order_items_ibfk_2` (`product_id`);

--
-- Indexes for table `payment_methods`
--
ALTER TABLE `payment_methods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_unique` (`name`),
  ADD UNIQUE KEY `slug_unique` (`slug`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug_unique` (`slug`),
  ADD UNIQUE KEY `sku_unique` (`sku`),
  ADD KEY `products_ibfk_1` (`brand_id`),
  ADD KEY `products_ibfk_2` (`main_category_id`),
  ADD KEY `products_ibfk_3` (`sub_category_id`),
  ADD KEY `products_ibfk_4` (`color_id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`image_id`),
  ADD KEY `fk_image_product1` (`product_image_id`);

--
-- Indexes for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_reviews_ibfk_1` (`product_id`),
  ADD KEY `product_reviews_ibfk_2` (`customer_id`),
  ADD KEY `product_reviews_ibfk_3` (`order_id`);

--
-- Indexes for table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_unique` (`name`);

--
-- Indexes for table `refunds`
--
ALTER TABLE `refunds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `refunds_ibfk_1` (`order_id`),
  ADD KEY `refunds_ibfk_2` (`order_item_id`);

--
-- Indexes for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_id_unique` (`order_id`);

--
-- Indexes for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug_unique` (`slug`),
  ADD KEY `idx_sub_cat_main` (`main_category_id`);

--
-- Indexes for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `customer_id_unique` (`customer_id`);

--
-- Indexes for table `wishlist_items`
--
ALTER TABLE `wishlist_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_wishlist_product` (`wishlist_id`,`product_id`),
  ADD KEY `idx_wishlist_item_wishlist` (`wishlist_id`),
  ADD KEY `idx_wishlist_item_product` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `delivery_zones`
--
ALTER TABLE `delivery_zones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `districts`
--
ALTER TABLE `districts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `main_categories`
--
ALTER TABLE `main_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment_methods`
--
ALTER TABLE `payment_methods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_reviews`
--
ALTER TABLE `product_reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `refunds`
--
ALTER TABLE `refunds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sub_categories`
--
ALTER TABLE `sub_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `wishlists`
--
ALTER TABLE `wishlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wishlist_items`
--
ALTER TABLE `wishlist_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE;

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `fk_cities_districts1` FOREIGN KEY (`districts_id`) REFERENCES `districts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `districts`
--
ALTER TABLE `districts`
  ADD CONSTRAINT `fk_districts_provinces1` FOREIGN KEY (`provinces_id`) REFERENCES `provinces` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`main_category_id`) REFERENCES `main_categories` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `fk_image_product1` FOREIGN KEY (`product_image_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `product_reviews`
--
ALTER TABLE `product_reviews`
  ADD CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_reviews_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `refunds`
--
ALTER TABLE `refunds`
  ADD CONSTRAINT `refunds_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `refunds_ibfk_2` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD CONSTRAINT `shipping_addresses_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sub_categories`
--
ALTER TABLE `sub_categories`
  ADD CONSTRAINT `sub_categories_ibfk_1` FOREIGN KEY (`main_category_id`) REFERENCES `main_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlists`
--
ALTER TABLE `wishlists`
  ADD CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE;

--
-- Constraints for table `wishlist_items`
--
ALTER TABLE `wishlist_items`
  ADD CONSTRAINT `wishlist_items_ibfk_1` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
