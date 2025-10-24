-- MySQL dump 10.13  Distrib 8.0.43, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: redragon_db
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `last_login` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_unique` (`username`),
  UNIQUE KEY `email_unique` (`email`),
  KEY `idx_admin_username` (`username`),
  KEY `idx_admin_email` (`email`),
  KEY `idx_admin_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin\r\n','admin@gmail.com','$2a$12$rIhKJPR3UxmUlx67MzpHquo8q9qf/KQzguiMdeHem0AyghRtvrNV.',1,'2025-10-22 17:00:35');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_unique` (`name`),
  UNIQUE KEY `slug_unique` (`slug`),
  KEY `idx_brand_slug` (`slug`),
  KEY `idx_brand_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (2,'HP','hp','https://upload.wikimedia.org/wikipedia/commons/2/2f/HP_Logo_2008.svg','Hewlett-Packard produces laptops, desktops, printers, and accessories.',1),(3,'Lenovo','lenovo','https://upload.wikimedia.org/wikipedia/commons/0/0e/Lenovo_logo_2015.svg','Lenovo manufactures laptops, desktops, workstations, and accessories.',1),(4,'Apple','apple','https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg','Apple Inc. designs and sells consumer electronics and software.',1),(5,'Asus','asus',NULL,'ASUS is a Taiwanese multinational known for laptops and motherboards.',1),(6,'Acer','acer','https://res.cloudinary.com/dgcautrc4/image/upload/v1761039029/redragon-brands/dt16jsa3oabpmoukjfvf.png','Acer produces laptops, desktops, monitors, and accessories.',1),(7,'MSIsdasd','msi',NULL,'MSI specializes in gaming laptops, desktops, and PC components.',1),(8,'Logitech','logitech','https://upload.wikimedia.org/wikipedia/commons/6/6b/Logitech_logo_2015.svg','Logitech designs computer peripherals and accessories.',1),(9,'Corsair','corsair','https://upload.wikimedia.org/wikipedia/commons/4/4a/Corsair_Logo.svg','Corsair is known for high-performance gaming hardware and accessories.',1),(10,'Kingston','kingston','https://upload.wikimedia.org/wikipedia/commons/4/4d/Kingston_Logo.svg','Kingston manufactures memory products and storage devices.',1),(11,'Redragon','redragon','https://example.com/redragon-logo.png','Gaming peripherals and accessories brand known for high-quality mechanical keyboards, gaming mice, and headsets.',1),(12,'Samsung','',NULL,NULL,1);
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_cart_product` (`cart_id`,`product_id`),
  KEY `cart_items_ibfk_2` (`product_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (2,1,22,2),(3,1,21,1),(6,2,21,5);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_id_unique` (`customer_id`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,6,'2025-10-22 17:12:46','2025-10-22 17:14:01'),(2,5,'2025-10-22 17:16:04','2025-10-22 17:26:41'),(3,2,'2025-10-23 02:08:21','2025-10-23 02:08:21');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `hex_code` varchar(7) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'Black','#000000','2025-10-10 18:38:09'),(2,'White','#FFFFFF','2025-10-10 18:38:09'),(3,'Gray','#808080','2025-10-10 18:38:09'),(4,'Silver','#C0C0C0','2025-10-10 18:38:09'),(5,'Red','#FF0000','2025-10-10 18:38:09'),(6,'Blue','#0000FF','2025-10-10 18:38:09'),(7,'Green','#008000','2025-10-10 18:38:09'),(8,'Yellow','#FFFF00','2025-10-10 18:38:09'),(9,'Orange','#FFA500','2025-10-10 18:38:09'),(10,'Purple','#800080','2025-10-10 18:38:09'),(11,'Pink','#FFC0CB','2025-10-10 18:38:09'),(12,'Gold','#FFD700','2025-10-10 18:38:09');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `email_verified` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email_unique` (`email`),
  KEY `idx_customer_email` (`email`),
  KEY `idx_customer_phone` (`phone`),
  KEY `idx_customer_credentials` (`email`,`password_hash`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Kasun\r\n','Perera','kasun@gmail.com','','0752010915',NULL,1,0,'2025-10-15 00:05:24','2025-10-15 00:05:24'),(2,'Test','User','test@example.com','$2a$12$S/1g0TN.pNm0pAHSwM63m.HP2AodXdlHcBUpz1oZ1WwX8k/GDsGy6','0771234567',NULL,1,0,'2025-10-19 13:38:42','2025-10-23 02:08:01'),(3,'John','Doe','john@example.com','$2b$12$UkxOVs.FoiPXDWDdaxoz9u9QdEUpiKFvUUphMMPEIOsFMU08u3Iba','0771234568',NULL,1,0,'2025-10-19 13:43:42','2025-10-19 13:43:42'),(4,'Browser','Test','browsertest@example.com','$2b$12$5olloMdIcD/8E50DMIWC/.feVTwHQf/bE6uAhehmwh1pL9j.4wXDu','0771234599',NULL,1,0,'2025-10-19 14:15:18','2025-10-19 14:15:18'),(5,'Gihan','Punarji','gihanpunarji@gmail.com','$2b$12$9JqUkx4yl7AuEKC3asrU/.zsLVzYqG6aZtpVR33QAum2wuFEebeEK','0715327065',NULL,1,0,'2025-10-19 14:17:44','2025-10-19 14:17:44'),(6,'Test','CartUser','testcart99@example.com','$2b$12$0.snirqYUtU5HbYJ3PlqkeBQQEnW2oSw53CZ6g4uurGXbBnDfR1.q','0771234999',NULL,1,0,'2025-10-22 17:12:09','2025-10-22 17:12:09');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_zones`
--

DROP TABLE IF EXISTS `delivery_zones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery_zones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `zone_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `base_charge` decimal(10,2) DEFAULT NULL,
  `extra_charge` decimal(10,2) DEFAULT NULL,
  `min_weight` decimal(10,2) DEFAULT '1.00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_zones`
--

LOCK TABLES `delivery_zones` WRITE;
/*!40000 ALTER TABLE `delivery_zones` DISABLE KEYS */;
INSERT INTO `delivery_zones` VALUES (1,'Inside Colombo',300.00,80.00,1.00);
/*!40000 ALTER TABLE `delivery_zones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `districts`
--

DROP TABLE IF EXISTS `districts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `districts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provinces_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_districts_provinces1_idx` (`provinces_id`),
  CONSTRAINT `fk_districts_provinces1` FOREIGN KEY (`provinces_id`) REFERENCES `provinces` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `districts`
--

LOCK TABLES `districts` WRITE;
/*!40000 ALTER TABLE `districts` DISABLE KEYS */;
INSERT INTO `districts` VALUES (1,'Kandy',1),(2,'Matale',1),(3,'Nuwara Eliya',1),(4,'Batticaloa',2),(5,'Ampara',2),(6,'Trincomalee',2),(7,'Anuradhapura',3),(8,'Polonnaruwa',3),(9,'Kurunegala',4),(10,'Puttalam',4),(11,'Jaffna',5),(12,'Kilinochchi',5),(13,'Mannar',5),(14,'Vavuniya',5),(15,'Mullaitivu',5),(16,'Ratnapura',6),(17,'Kegalle',6),(18,'Galle',7),(19,'Matara',7),(20,'Hambantota',7),(21,'Badulla',8),(22,'Monaragala',8),(23,'Colombo',9),(24,'Gampaha',9),(25,'Kalutara',9);
/*!40000 ALTER TABLE `districts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `main_categories`
--

DROP TABLE IF EXISTS `main_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `main_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `icon` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_unique` (`name`),
  UNIQUE KEY `slug_unique` (`slug`),
  KEY `idx_main_cat_slug` (`slug`),
  KEY `idx_main_cat_active` (`is_active`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `main_categories`
--

LOCK TABLES `main_categories` WRITE;
/*!40000 ALTER TABLE `main_categories` DISABLE KEYS */;
INSERT INTO `main_categories` VALUES (1,'Laptops','laptops','Wide range of gaming, business, and student laptops.','laptop',1,'2025-10-10 18:32:18'),(2,'Desktops & PCs','desktops-pcs','Custom-built and branded desktop computers for work and gaming.','pc',1,'2025-10-10 18:32:18'),(3,'Monitors','monitors','HD, 4K, and curved monitors for every setup.','monitor',1,'2025-10-10 18:32:18'),(4,'Computer Accessories','computer-accessories','Keyboards, mice, headsets, and other essential peripherals.','keyboard-mouse',1,'2025-10-10 18:32:18'),(5,'Networking','networking','Routers, network cables, and WiFi adapters.','wifi',1,'2025-10-10 18:32:18'),(6,'Storage Devices','storage-devices','Hard drives, SSDs, and portable storage solutions.','hdd',1,'2025-10-10 18:32:18'),(7,'Components','components','Graphic cards, processors, RAM, and other PC components.','cpu',1,'2025-10-10 18:32:18'),(8,'Software & Licenses','software-licenses','Operating systems, antivirus, and productivity software.','software',1,'2025-10-10 18:32:18'),(26,'aa','','aa','https://res.cloudinary.com/dgcautrc4/image/upload/v1761135595/categories/thy1abikcqvi70v2n7ch.jpg',1,'2025-10-22 12:19:56'),(27,'SSD','ssd','Solid State Drive',NULL,1,'2025-10-22 13:43:24');
/*!40000 ALTER TABLE `main_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `order_items_ibfk_1` (`order_id`),
  KEY `order_items_ibfk_2` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_number` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` int NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `shipping_fee` decimal(10,2) DEFAULT '0.00',
  `discount` decimal(10,2) DEFAULT '0.00',
  `total` decimal(10,2) NOT NULL,
  `payment_method_id` int NOT NULL,
  `payment_status` enum('pending','paid','failed','refunded') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `paid_at` timestamp NULL DEFAULT NULL,
  `order_status` enum('pending','confirmed','processing','shipped','delivered','cancelled') COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `customer_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_number_unique` (`order_number`),
  KEY `orders_ibfk_1` (`customer_id`),
  KEY `orders_ibfk_2` (`payment_method_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_methods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_unique` (`name`),
  UNIQUE KEY `slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'Credit Card','credit_card',1),(2,'Debit Card','debit_card',1),(3,'Bank Transfer','bank_transfer',1),(4,'Cash on Delivery','cash_on_delivery',1),(5,'Google Pay','google_pay',1);
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image_uploads`
--

DROP TABLE IF EXISTS `product_image_uploads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image_uploads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `public_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_primary` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_product_id` (`product_id`),
  KEY `idx_primary` (`product_id`,`is_primary`),
  KEY `idx_product_images_public_id` (`public_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image_uploads`
--

LOCK TABLES `product_image_uploads` WRITE;
/*!40000 ALTER TABLE `product_image_uploads` DISABLE KEYS */;
INSERT INTO `product_image_uploads` VALUES (8,20,'https://res.cloudinary.com/dgcautrc4/image/upload/v1761140677/products/lxlfqrg2vapqkzexlb2q.jpg','products/lxlfqrg2vapqkzexlb2q',1,'2025-10-22 13:44:38','2025-10-22 13:44:38'),(9,21,'https://res.cloudinary.com/dgcautrc4/image/upload/v1761140813/products/wqnvpxhfqzvckmlrbnzg.jpg','products/wqnvpxhfqzvckmlrbnzg',1,'2025-10-22 13:46:54','2025-10-22 13:46:54'),(10,22,'https://res.cloudinary.com/dgcautrc4/image/upload/v1761141291/products/a5bfsvhz9oc5ksxycwaq.jpg','products/a5bfsvhz9oc5ksxycwaq',1,'2025-10-22 13:54:53','2025-10-22 13:54:53'),(11,22,'https://res.cloudinary.com/dgcautrc4/image/upload/v1761141293/products/qyvnyviev5yj6xjm5rog.jpg','products/qyvnyviev5yj6xjm5rog',0,'2025-10-22 13:54:54','2025-10-22 13:54:54'),(12,22,'https://res.cloudinary.com/dgcautrc4/image/upload/v1761141294/products/e0hcehf1d8rdaq03e4ni.jpg','products/e0hcehf1d8rdaq03e4ni',0,'2025-10-22 13:54:55','2025-10-22 13:54:55'),(13,23,'https://res.cloudinary.com/dgcautrc4/image/upload/v1761142438/products/f6x3inx6xki65g0xlhmf.jpg','products/f6x3inx6xki65g0xlhmf',1,'2025-10-22 14:13:59','2025-10-22 14:13:59'),(14,23,'https://res.cloudinary.com/dgcautrc4/image/upload/v1761142439/products/qheswf123s3hsucz3fk7.jpg','products/qheswf123s3hsucz3fk7',0,'2025-10-22 14:14:01','2025-10-22 14:14:01'),(15,23,'https://res.cloudinary.com/dgcautrc4/image/upload/v1761142441/products/sezydqxcohp5pd3zfeys.png','products/sezydqxcohp5pd3zfeys',0,'2025-10-22 14:14:03','2025-10-22 14:14:03');
/*!40000 ALTER TABLE `product_image_uploads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_reviews`
--

DROP TABLE IF EXISTS `product_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `rating` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `review_text` text COLLATE utf8mb4_unicode_ci,
  `is_approved` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `product_reviews_ibfk_1` (`product_id`),
  KEY `product_reviews_ibfk_2` (`customer_id`),
  KEY `product_reviews_ibfk_3` (`order_id`),
  CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE,
  CONSTRAINT `product_reviews_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_reviews`
--

LOCK TABLES `product_reviews` WRITE;
/*!40000 ALTER TABLE `product_reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `brand_id` int NOT NULL DEFAULT '1',
  `main_category_id` int NOT NULL,
  `sub_category_id` int DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `sale_price` decimal(10,2) DEFAULT NULL,
  `cost_price` decimal(10,2) DEFAULT NULL,
  `stock_quantity` int DEFAULT '0',
  `color_id` int DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `is_featured` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `weight` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_unique` (`slug`),
  UNIQUE KEY `sku_unique` (`sku`),
  KEY `products_ibfk_1` (`brand_id`),
  KEY `products_ibfk_2` (`main_category_id`),
  KEY `products_ibfk_3` (`sub_category_id`),
  KEY `products_ibfk_4` (`color_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`main_category_id`) REFERENCES `main_categories` (`id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_categories` (`id`) ON DELETE SET NULL,
  CONSTRAINT `products_ibfk_4` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE SET NULL,
  CONSTRAINT `products_chk_1` CHECK (json_valid(`specifications`))
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (21,'990 PRO 4 TB SSD NVMe™ M.2','990-pro-4-tb-ssd-nvme-m2-1','SKU-1761140812023','990 PRO 4 TB SSD NVMe™ M.2','{}',12,7,19,330000.00,320000.00,30000.00,10,NULL,1,0,'2025-10-22 13:46:52','2025-10-22 16:49:37',NULL),(22,'Asus 4090 Gaming GPU','asus-4090-gaming-gpu','SKU-1761141265725','Asus 4090 Gaming GPU','{}',5,7,23,480000.00,480000.00,450000.00,3,NULL,1,1,'2025-10-22 13:54:26','2025-10-22 16:49:55',850),(23,'Samsung s24 ultra','samsung-s24-ultra','SKU-1761142402015','samsung s42 ultra','{}',12,26,NULL,299999.00,289999.00,299999.00,2,NULL,1,0,'2025-10-22 14:13:22','2025-10-22 16:52:29',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `provinces`
--

DROP TABLE IF EXISTS `provinces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `provinces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `provinces`
--

LOCK TABLES `provinces` WRITE;
/*!40000 ALTER TABLE `provinces` DISABLE KEYS */;
INSERT INTO `provinces` VALUES (1,'Central'),(2,'Eastern'),(3,'North Central'),(4,'North Western'),(5,'Northern'),(6,'Sabaragamuwa'),(7,'Southern'),(8,'Uva'),(9,'Western');
/*!40000 ALTER TABLE `provinces` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `refunds`
--

DROP TABLE IF EXISTS `refunds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `refunds` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `order_item_id` int DEFAULT NULL,
  `reason` enum('damaged','wrong_item','not_as_described','changed_mind','other') COLLATE utf8mb4_unicode_ci NOT NULL,
  `reason_details` text COLLATE utf8mb4_unicode_ci,
  `refund_amount` decimal(10,2) NOT NULL,
  `status` enum('requested','approved','rejected','processed') COLLATE utf8mb4_unicode_ci DEFAULT 'requested',
  `admin_notes` text COLLATE utf8mb4_unicode_ci,
  `processed_by` int NOT NULL,
  `requested_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `processed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `refunds_ibfk_1` (`order_id`),
  KEY `refunds_ibfk_2` (`order_item_id`),
  CONSTRAINT `refunds_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `refunds_ibfk_2` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `refunds`
--

LOCK TABLES `refunds` WRITE;
/*!40000 ALTER TABLE `refunds` DISABLE KEYS */;
/*!40000 ALTER TABLE `refunds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shipping_addresses`
--

DROP TABLE IF EXISTS `shipping_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipping_addresses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postal_code` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `delivery_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `customers_customer_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_id_unique` (`order_id`),
  KEY `fk_shipping_addresses_customers1_idx` (`customers_customer_id`),
  CONSTRAINT `fk_shipping_addresses_customers1` FOREIGN KEY (`customers_customer_id`) REFERENCES `customers` (`customer_id`),
  CONSTRAINT `shipping_addresses_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipping_addresses`
--

LOCK TABLES `shipping_addresses` WRITE;
/*!40000 ALTER TABLE `shipping_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `shipping_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categories`
--

DROP TABLE IF EXISTS `sub_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `main_category_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_unique` (`slug`),
  KEY `idx_sub_cat_main` (`main_category_id`),
  CONSTRAINT `sub_categories_ibfk_1` FOREIGN KEY (`main_category_id`) REFERENCES `main_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categories`
--

LOCK TABLES `sub_categories` WRITE;
/*!40000 ALTER TABLE `sub_categories` DISABLE KEYS */;
INSERT INTO `sub_categories` VALUES (1,1,'Gaming Laptops','gaming-laptops','High-performance laptops for gaming.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(2,1,'Business Laptops','business-laptops','Reliable laptops for office and productivity.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(3,1,'Student Laptops','student-laptops','Budget-friendly laptops for students.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(4,1,'2-in-1 Convertibles','convertible-laptops','Touchscreen laptops with tablet mode.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(5,2,'Gaming PCs','gaming-pcs','Custom or branded desktops for gaming.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(6,2,'Office PCs','office-pcs','Desktops built for business and work environments.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(7,2,'All-in-One PCs','all-in-one-pcs','Compact all-in-one desktop computers.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(8,3,'Full HD Monitors','full-hd-monitors','1080p monitors for general use.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(9,3,'4K Monitors','4k-monitors','Ultra HD 4K monitors for designers and gamers.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(10,3,'Curved Monitors','curved-monitors','Immersive curved displays.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(11,4,'Keyboards','keyboards','Mechanical and membrane keyboards.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(12,4,'Mice','mice','Wired and wireless computer mice.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(13,4,'Headsets','headsets','Gaming and office headsets.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(14,4,'Webcams','webcams','HD and 4K webcams for streaming and calls.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(15,5,'WiFi Routers','wifi-routers','High-speed routers for home and office.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(16,5,'Network Cables','network-cables','Ethernet and LAN cables.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(17,5,'Adapters & Modems','adapters-modems','USB WiFi adapters and DSL modems.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(18,6,'External Hard Drives','external-hard-drives','Portable HDDs and SSDs.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(19,6,'Solid State Drives (SSD)','ssd','Fast SSD storage options.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(20,6,'USB Flash Drives','usb-flash-drives','Compact flash storage devices.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(21,6,'Memory Cards','memory-cards','SD and microSD cards.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(22,7,'Processors (CPU)','processors','Latest Intel and AMD CPUs.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(23,7,'Graphics Cards (GPU)','graphics-cards','NVIDIA and AMD GPUs.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(24,7,'Motherboards','motherboards','Boards for Intel and AMD platforms.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(25,7,'Memory (RAM)','memory-ram','DDR4 and DDR5 memory modules.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(26,7,'Power Supplies (PSU)','power-supplies','Reliable PSUs for systems.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(27,4,'Cooling Systems','cooling-systems','Air and liquid CPU coolers.',1,'2025-10-10 18:36:44','2025-10-21 17:02:45'),(28,8,'Operating Systems','operating-systems','Windows, Linux, and macOS licenses.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(29,8,'Antivirus & Security','antivirus-security','Protective software for devices.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00'),(30,8,'Office & Productivity','office-productivity','Microsoft Office and similar tools.',1,'2025-10-10 18:36:44','0000-00-00 00:00:00');
/*!40000 ALTER TABLE `sub_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist_items`
--

DROP TABLE IF EXISTS `wishlist_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wishlist_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_wishlist_product` (`wishlist_id`,`product_id`),
  KEY `idx_wishlist_item_wishlist` (`wishlist_id`),
  KEY `idx_wishlist_item_product` (`product_id`),
  CONSTRAINT `wishlist_items_ibfk_1` FOREIGN KEY (`wishlist_id`) REFERENCES `wishlists` (`id`) ON DELETE CASCADE,
  CONSTRAINT `wishlist_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist_items`
--

LOCK TABLES `wishlist_items` WRITE;
/*!40000 ALTER TABLE `wishlist_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_id_unique` (`customer_id`),
  CONSTRAINT `wishlists_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlists`
--

LOCK TABLES `wishlists` WRITE;
/*!40000 ALTER TABLE `wishlists` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlists` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-23 21:27:31
