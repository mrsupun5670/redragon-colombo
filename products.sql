-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Oct 26, 2025 at 06:20 AM
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
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `sku` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `brand_id` int(11) NOT NULL DEFAULT 1,
  `main_category_id` int(11) NOT NULL,
  `sub_category_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT 0,
  `color_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_featured` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `weight` int(11) DEFAULT NULL
) ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `description`, `specifications`, `brand_id`, `main_category_id`, `sub_category_id`, `price`, `sale_price`, `cost_price`, `stock_quantity`, `color_id`, `is_active`, `is_featured`, `created_at`, `updated_at`, `weight`) VALUES
(21, '990 PRO 4 TB SSD NVMe™ M.2', '990-pro-4-tb-ssd-nvme-m2-1', 'SKU-1761140812023', '990 PRO 4 TB SSD NVMe™ M.2', '{}', 12, 7, 19, 330000.00, 320000.00, 30000.00, 10, NULL, 0, 0, '2025-10-22 13:46:52', '2025-10-24 04:04:47', 300),
(22, 'Asus 4090 Gaming GPU', 'asus-4090-gaming-gpu', 'SKU-1761141265725', 'Asus 4090 Gaming GPU', '{}', 5, 7, 23, 480000.00, 480000.00, 450000.00, 3, NULL, 0, 1, '2025-10-22 13:54:26', '2025-10-24 03:05:40', 850),
(23, 'Samsung s24 ultra', 'samsung-s24-ultra', 'SKU-1761142402015', 'samsung s42 ultra', '{}', 12, 7, NULL, 299999.00, 289999.00, 299999.00, 2, NULL, 0, 0, '2025-10-22 14:13:22', '2025-10-24 02:52:32', 228),
(24, 'aada', 'aada', 'SKU-1761278630161', 'sdsds', '{}', 12, 27, 3, 441.00, 44.00, 120.00, 5, NULL, 0, 1, '2025-10-24 04:03:50', '2025-10-24 04:04:41', 42),
(25, 'MacBook Air 13 inch M4 Chip', 'macbook-air-13-inch-m4-chip', 'SKU-1761279792799', 'The MacBook Air 13 inch M4 Chip in Srilanka is Available at Rs 284000, updated on 2025-10-24 Featherlight power. Expect a stunning display, blazing speed, and all-day battery. Perfect for work or play, it\'s the ultimate portable companion. LuxuryX provides genuine Apple products with a 1 Year AppleCare warrenty flexible installment options, and free delivery or in-store pickup across Sri Lanka.', '{}', 4, 1, 3, 2500.00, 2000.00, 3000.00, 10, NULL, 1, 1, '2025-10-24 04:23:13', '2025-10-25 12:49:24', 1200),
(26, 'Titan 18 HX AI A2XW', 'titan-18-hx-ai-a2xw', 'SKU-1761282822275', 'Standing proudly as a leader in gaming innovation, the Titan 18 HX AI has reached new heights, pushing the limits of performance with its top-tier, all-encompassing features. Its advanced cooling system delivers unmatched power, ensuring smooth performance even during the most demanding tasks. Encased in a strong yet lightweight magnesium-aluminum alloy chassis, this flagship device blends durability with portability, making it the top choice for gamers and creators aiming for excellence.', '{}', 7, 1, 1, 670000.00, 665000.00, 660000.00, 40, NULL, 1, 1, '2025-10-24 05:13:43', '2025-10-26 04:58:20', 950),
(27, 'Asus ROG Strix Gaming G16 G615JPR – i9', 'asus-rog-strix-gaming-g16-g615jpr-i9', 'SKU-1761362884228', 'Asus ROG Strix G16 Hardcore Gaming Power\r\nThe Asus ROG Strix Gaming G16 G615JPR is built for serious gamers and creators with\r\nthe latest Intel Core i9-14900HX Processor and a bold, high-performance design.\r\n2.5K WQXGA Display with 240Hz – Ultra Smooth Visuals\r\nGame in breathtaking clarity on the 16″ 2.5K (2560 x 1600) WQXGA\r\ndisplay with an ultra-fast 240Hz refresh rate, delivering fluid visuals and sharp detail.\r\n\r\n', '{}', 5, 1, 1, 740000.00, 735000.00, 720000.00, 15, NULL, 1, 0, '2025-10-25 03:28:05', '2025-10-25 03:28:05', 950);

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`main_category_id`) REFERENCES `main_categories` (`id`),
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_ibfk_4` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
