-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: library
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity_logs`
--

DROP TABLE IF EXISTS `activity_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `activity` varchar(255) DEFAULT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `activity_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_logs`
--

LOCK TABLES `activity_logs` WRITE;
/*!40000 ALTER TABLE `activity_logs` DISABLE KEYS */;
INSERT INTO `activity_logs` VALUES (1,11,'📕 Book Issued: Book ID 1','2025-06-29 13:54:37'),(2,11,'Requested For Book Issue: Book ID 1','2025-06-29 13:55:35'),(3,11,'Requested For Book Issue: Book ID 1','2025-06-29 14:32:13'),(4,11,'Requested For Book Issue: Book ID 1','2025-06-29 20:09:34'),(5,12,'Requested For Book Issue: Book ID 1','2025-06-30 09:53:42'),(6,12,'Requested For Book Issue: Book ID 1','2025-06-30 09:53:42'),(7,12,'Requested For Book Issue: Book ID 2','2025-06-30 09:53:47'),(8,12,'Requested For Book Issue: Book ID 2','2025-06-30 09:53:47'),(9,12,'Requested For Book Issue: Book ID 1','2025-07-01 09:19:06'),(10,12,'Requested For Book Issue: Book ID 1','2025-07-01 09:19:06'),(11,12,'Requested For Book Issue: Book ID 1','2025-07-01 09:20:05'),(12,12,'Requested For Book Issue: Book ID 1','2025-07-01 09:20:34'),(13,12,'Requested For Book Issue: Book ID 1','2025-07-01 09:20:35'),(14,12,'Requested For Book Issue: Book ID 5','2025-07-01 10:53:50'),(15,12,'Requested For Book Issue: Book ID 5','2025-07-01 10:53:50');
/*!40000 ALTER TABLE `activity_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `visible_to` enum('all','students','faculty','librarian') DEFAULT 'all',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,'Library Closure','The library will be closed on 5th July for maintenance.','all','2025-07-03 06:00:48'),(2,'New Arrivals','We have added new books to our catalog. Check them out!','all','2025-06-29 08:11:48'),(3,'Workshop','Join the Book Reading Workshop on 10th July.','all','2025-06-29 08:11:48'),(4,'System Maintenance','Library system will undergo maintenance next weekend.','all','2025-06-29 08:11:48'),(5,'Scholarship Info','Scholarship application deadline is 15th July.','students','2025-06-29 08:11:48'),(6,'Hello','Hello','all','2025-07-03 11:04:37');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book_copies`
--

DROP TABLE IF EXISTS `book_copies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_copies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `copy_number` int NOT NULL,
  `availability_status` enum('lost','damaged') DEFAULT NULL,
  `status` enum('available','not available') DEFAULT NULL,
  `available_copies` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `book_copies_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_copies`
--

LOCK TABLES `book_copies` WRITE;
/*!40000 ALTER TABLE `book_copies` DISABLE KEYS */;
INSERT INTO `book_copies` VALUES (1,1,1,NULL,'available',6),(2,1,2,NULL,'available',2),(3,1,3,NULL,'available',2),(4,2,1,NULL,'available',1),(5,2,2,NULL,'available',2),(6,3,1,NULL,'not available',0),(7,3,2,NULL,'available',1),(8,4,1,NULL,'available',1),(9,4,2,NULL,'available',2),(10,5,1,NULL,'not available',0),(11,6,1,NULL,'available',1);
/*!40000 ALTER TABLE `book_copies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookmarks`
--

DROP TABLE IF EXISTS `bookmarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookmarks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `resource_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_user` (`user_id`),
  KEY `fk_resource` (`resource_id`),
  CONSTRAINT `fk_resource` FOREIGN KEY (`resource_id`) REFERENCES `e_resources` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookmarks`
--

LOCK TABLES `bookmarks` WRITE;
/*!40000 ALTER TABLE `bookmarks` DISABLE KEYS */;
/*!40000 ALTER TABLE `bookmarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `category_id` int DEFAULT NULL,
  `publisher_id` int DEFAULT NULL,
  `isbn` varchar(50) DEFAULT NULL,
  `edition` varchar(50) DEFAULT NULL,
  `publication_year` year DEFAULT NULL,
  `language` varchar(50) DEFAULT NULL,
  `description` text,
  `cover_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ebook_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  KEY `publisher_id` (`publisher_id`),
  CONSTRAINT `books_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `books_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `publishers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'The Great Gatsby','F. Scott Fitzgerald',1,1,'9780743273565','1st',1925,'English','A classic novel set in the Jazz Age.','gatsby.jpg','2025-06-27 13:46:33','2025-06-27 13:46:33',NULL),(2,'A Brief History of Time','Stephen Hawking',2,5,'9780553380163','Updated',2011,'English','Exploring the universe\'s mysteries.','history_time.jpg','2025-06-27 13:46:33','2025-06-27 13:46:33',NULL),(3,'Clean Code','Robert C. Martin',3,3,'9780132350884','1st',2008,'English','Best practices for writing clean code.','clean_code.jpg','2025-06-27 13:46:33','2025-06-27 13:46:33',NULL),(4,'Sapiens','Yuval Noah Harari',4,4,'9780062316097','1st',2015,'English','A brief history of humankind.','sapiens.jpg','2025-06-27 13:46:33','2025-06-27 13:46:33',NULL),(5,'Steve Jobs','Walter Isaacson',5,2,'9781451648539','1st',2011,'English','Biography of Steve Jobs.','jobs.jpg','2025-06-27 13:46:33','2025-06-27 13:46:33',NULL),(6,'Meditations','Marcus Aurelius',6,6,'9780140449334','2nd',2006,'English','Stoic philosophy writings.','meditations.jpg','2025-06-27 13:46:33','2025-06-27 13:46:33',NULL),(7,'Introduction to Algorithms','Thomas H. Cormen',7,7,'9780262033848','3rd',2009,'English','Comprehensive guide to algorithms.','algorithms.jpg','2025-06-27 13:46:33','2025-06-27 13:46:33',NULL),(8,'Atomic Habits','James Clear',8,8,'9780735211292','1st',2018,'English','SUMMARY: ATOMIC HABITS: An Easy & Proven Way to Build Good Habits & Break Bad Ones. This book is not meant to replace the original book but to serve as a companion to it. ABOUT ORIGINAL BOOK: Atomic Habits can help you improve every day, no matter what your goals are. As one of the world\'s leading experts on habit formation, James Clear reveals practical strategies that will help you form good habits, break bad ones, and master tiny behaviors that lead to big changes. If you\'re having trouble changing your habits, the problem isn\'t you. Instead, the issue is with your system. There is a reason bad habits repeat themselves over and over again, it\'s not that you are not willing to change, but that you have the wrong system for changing. “You do not rise to the level of your goals. You fall to the level of your systems” - James Clear I’m a huge fan of this book, and as soon as I read it I knew it was going to make a big difference in my life, so I couldn’t wait to make a video on this book and share my ideas. Here is a link to James Clear’s website, where I found he uploads a tonne of useful posts on motivation, habit formation and human psychology. DISCLAIMER: This is an UNOFFICIAL summary and not the original book. It designed to record all the key points of the original book.','atomic_habits.jpg','2025-06-27 13:46:33','2025-07-04 15:21:27','http://play.google.com/books/reader?id=2CBhPQAACAAJ&hl=&source=gbs_api'),(9,'Into','Jon Krakauer',9,9,'9780385486804','1st',2020,'English','Jon Krakauer\'s Into the Wild examines the true story of Chris McCandless, a young man who walked deep into the Alaskan wilderness and whose SOS note and emaciated corpse were found four months later. With an introduction by novelist David Vann. In April 1992, Chris McCandless set off alone into the Alaskan wild. He had given his savings to charity, abandoned his car and his possessions, and burnt the money in his wallet, determined to live a life of independence. Just four months later, Chris was found dead. An SOS note was taped to his makeshift home, an abandoned bus. In piecing together the final travels of this extraordinary young man\'s life, Jon Krakauer writes about the heart of the wilderness, its terrible beauty and its relentless harshness. Into the Wild is a modern classic of travel writing, and a riveting exploration of what drives some of us to risk more than we can afford to lose. From the author of Under the Banner of Heaven and Into Thin Air. A film adaptation of Into the Wild was directed by Sean Penn and starred Emile Hirsch and Kristen Stewart. \'It may be nonfiction, but Into the Wild is a mystery of the highest order.\' – Entertainment Weekly','into_wild.jpg','2025-06-27 13:46:33','2025-07-04 15:17:17','http://play.google.com/books/reader?id=m9BiDwAAQBAJ&hl=&source=gbs_api');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrowed_books`
--

DROP TABLE IF EXISTS `borrowed_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrowed_books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `borrowed_date` date NOT NULL,
  `due_date` date NOT NULL,
  `returned_date` date DEFAULT NULL,
  `copy_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `copy_id` (`book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `borrowed_books_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book_copies` (`id`),
  CONSTRAINT `borrowed_books_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowed_books`
--

LOCK TABLES `borrowed_books` WRITE;
/*!40000 ALTER TABLE `borrowed_books` DISABLE KEYS */;
INSERT INTO `borrowed_books` VALUES (1,2,11,'2025-06-27','2025-07-01',NULL,2),(2,6,11,'2025-06-27','2025-06-21','2025-06-30',6),(3,7,12,'2025-06-30','2025-05-11','2025-06-30',7),(4,2,12,'2025-06-30','2025-05-15','2025-06-30',2),(5,1,11,'2025-06-30','2025-06-15','2025-07-04',1),(6,1,11,'2025-06-30','2025-06-15',NULL,1),(7,1,11,'2025-06-30','2025-07-03',NULL,1),(8,1,12,'2025-07-01','2025-07-16',NULL,1),(9,1,12,'2025-07-01','2025-07-16',NULL,1);
/*!40000 ALTER TABLE `borrowed_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (5,'Biography'),(10,'Children'),(1,'Fiction'),(4,'History'),(7,'Mathematics'),(6,'Philosophy'),(3,'Programming'),(2,'Science'),(8,'Self-Help'),(9,'Travel');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complaints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `description` text,
  `status` enum('Pending','Resolved') DEFAULT 'Pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
INSERT INTO `complaints` VALUES (1,11,'Library Issue','The library wifi is not working properly.','Resolved','2025-06-30 11:30:18'),(2,14,'Canteen Hygiene','The tables in the canteen are dirty.','Resolved','2025-06-30 11:30:18'),(3,11,'Water Cooler','The water cooler on the 2nd floor is not working.','Resolved','2025-06-30 11:30:18'),(4,11,'Classroom Projector','The projector in Room 305 is not functioning.','Resolved','2025-06-30 11:30:18'),(5,14,'Parking Problem','There is not enough parking space near Block B.','Resolved','2025-06-30 11:30:18'),(7,11,'Library Book Missing','A book I issued is missing from the library shelf.','Pending','2025-06-30 12:10:17'),(8,11,'Network Issue','Internet is not working properly in the library.','Pending','2025-06-30 12:10:17'),(9,14,'Hostel Food Quality','The food quality in hostel mess is very poor.','Pending','2025-06-30 12:10:17'),(10,11,'Lab Equipment Broken','The computer in Lab 3 is not working.','Pending','2025-06-30 12:10:17'),(11,14,'ID Card Issue','I have not received my new ID card yet.','Pending','2025-06-30 12:10:17'),(12,11,'Fees Payment Glitch','Online portal is not accepting fee payment.','Pending','2025-06-30 12:10:17'),(13,14,'Classroom Cleanliness','Classroom 204 is very dirty.','Pending','2025-06-30 12:10:17'),(14,11,'Faculty Misbehaviour','Faculty did not behave properly during lecture.','Pending','2025-06-30 12:10:17'),(15,14,'Wi-Fi Access Problem','Unable to access Wi-Fi in Hostel Block A.','Pending','2025-06-30 12:10:17'),(16,11,'Exam Hall Seating Issue','My seat was already occupied during the exam.','Pending','2025-06-30 12:10:17'),(17,15,'s','dw','Pending','2025-07-02 04:47:28'),(18,15,'sn','dnwnk','Resolved','2025-07-03 12:10:52'),(19,15,'  kn','bjbj','Pending','2025-07-04 05:48:50'),(20,15,'dds','sas','Pending','2025-07-04 05:52:30'),(21,15,'edd','fd','Pending','2025-07-04 05:53:11'),(22,15,'fvce','fc','Pending','2025-07-04 06:22:54');
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `e_resources`
--

DROP TABLE IF EXISTS `e_resources`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `e_resources` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `type` enum('PDF','Research Paper','eBook') NOT NULL,
  `section` enum('Notes','eBooks','PYQs','Journals') NOT NULL,
  `link` varchar(500) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `e_resources`
--

LOCK TABLES `e_resources` WRITE;
/*!40000 ALTER TABLE `e_resources` DISABLE KEYS */;
INSERT INTO `e_resources` VALUES (3,'Web Development Fundamentals','Complete eBook covering modern web development.','eBook','eBooks','https://www.hq.nasa.gov/alsj/a17/A17_FlightPlan.pdf','2025-07-02 06:37:23','2025-07-02 06:37:23'),(4,'Python Basics Notes','Concise notes for Python beginners.','PDF','Notes','https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf','2025-07-02 06:37:23','2025-07-02 06:37:23'),(5,'Science Journal - AI Edition','Latest peer-reviewed journal on AI advancements.','Research Paper','Journals','https://arxiv.org/pdf/2106.14899.pdf','2025-07-02 06:37:23','2025-07-02 06:37:23'),(10,'Latest Research on Neural Networks','A comprehensive research publication on deep learning models.','Research Paper','PYQs','https://arxiv.org/pdf/2106.14899.pdf','2025-07-02 06:37:23','2025-07-02 07:06:48'),(15,'Introduction to AI','Beginner-friendly guide to Artificial Intelligence.','PDF','Notes','https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf','2025-07-02 06:37:23','2025-07-02 07:06:41');
/*!40000 ALTER TABLE `e_resources` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fines`
--

DROP TABLE IF EXISTS `fines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `fine_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `reason` varchar(255) DEFAULT NULL,
  `issued_date` date NOT NULL,
  `paid` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `fines_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fines`
--

LOCK TABLES `fines` WRITE;
/*!40000 ALTER TABLE `fines` DISABLE KEYS */;
INSERT INTO `fines` VALUES (16,11,10.00,'Overdue book: A Brief History of Time','2025-06-27',0),(17,11,170.00,'Overdue book: The Great Gatsby','2025-06-30',0),(18,11,170.00,'Overdue book: The Great Gatsby','2025-06-30',0);
/*!40000 ALTER TABLE `fines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue_requests`
--

DROP TABLE IF EXISTS `issue_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `user_id` int NOT NULL,
  `request_date` date NOT NULL DEFAULT (curdate()),
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `issue_requests_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `issue_requests_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue_requests`
--

LOCK TABLES `issue_requests` WRITE;
/*!40000 ALTER TABLE `issue_requests` DISABLE KEYS */;
INSERT INTO `issue_requests` VALUES (10,1,11,'2025-06-29','rejected'),(11,1,11,'2025-06-29','rejected'),(12,1,11,'2025-06-29','approved'),(13,1,11,'2025-06-29','approved'),(14,1,11,'2025-06-29','approved'),(15,1,11,'2025-06-29','approved'),(16,1,12,'2025-06-30','approved'),(17,1,12,'2025-06-30','approved'),(18,2,12,'2025-06-30','approved'),(19,2,12,'2025-06-30','approved'),(20,1,12,'2025-07-01','approved'),(21,1,12,'2025-07-01','rejected'),(22,1,12,'2025-07-01','approved'),(23,1,12,'2025-07-01','rejected'),(24,1,12,'2025-07-01','pending'),(25,5,12,'2025-07-01','pending'),(26,5,12,'2025-07-01','pending');
/*!40000 ALTER TABLE `issue_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `no_dues`
--

DROP TABLE IF EXISTS `no_dues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `no_dues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `year` varchar(20) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `semester` varchar(20) DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `certificate_url` varchar(255) DEFAULT NULL,
  `requested_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `no_dues_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `no_dues`
--

LOCK TABLES `no_dues` WRITE;
/*!40000 ALTER TABLE `no_dues` DISABLE KEYS */;
INSERT INTO `no_dues` VALUES (2,11,'Manish','STU1003','3rd','IT','5th','approved','/uploads/certificates/Manish_Kumar_STU1022.pdf','2025-06-29 11:54:18','2025-07-04 16:00:19');
/*!40000 ALTER TABLE `no_dues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES (18,11,'Reminder: Your book \"A Brief History of Time\" is overdue. Please return it as soon as possible.',1,'2025-07-03 12:01:00'),(19,11,'Reminder: Your book \"The Great Gatsby\" is overdue. Please return it as soon as possible.',1,'2025-07-03 12:01:00'),(20,11,'Reminder: Your book \"The Great Gatsby\" is overdue. Please return it as soon as possible.',1,'2025-07-03 12:01:00'),(22,11,'A fine has been applied for overdue book: A Brief History of Time',1,'2025-07-03 12:01:00'),(23,11,'A fine has been applied for overdue book: The Great Gatsby',1,'2025-07-03 12:01:00'),(25,11,'Reminder: Your book \"The Great Gatsby\" is due on 3/7/2025. Please return it on time to avoid fines.',1,'2025-07-03 12:06:00'),(28,11,'Your complaint titled \"Library Issue\" has been resolved.',1,'2025-07-03 12:12:00'),(30,11,'Your complaint titled \"Water Cooler\" has been resolved.',1,'2025-07-03 12:12:00'),(31,11,'Your complaint titled \"Classroom Projector\" has been resolved.',1,'2025-07-03 12:12:00'),(34,11,'Your book issue request for \"The Great Gatsby\" has been rejected. Please contact the library for details.',1,'2025-07-03 12:17:00'),(35,11,'Your book issue request for \"The Great Gatsby\" has been rejected. Please contact the library for details.',1,'2025-07-03 12:17:00'),(36,11,'Your book issue request for \"The Great Gatsby\" has been approved. Please collect the book from the library.',1,'2025-07-03 12:17:00'),(37,11,'Your book issue request for \"The Great Gatsby\" has been approved. Please collect the book from the library.',1,'2025-07-03 12:17:00'),(38,11,'Your book issue request for \"The Great Gatsby\" has been approved. Please collect the book from the library.',1,'2025-07-03 12:17:00'),(39,11,'Your book issue request for \"The Great Gatsby\" has been approved. Please collect the book from the library.',1,'2025-07-03 12:17:00'),(40,12,'Your book issue request for \"The Great Gatsby\" has been approved. Please collect the book from the library.',0,'2025-07-03 12:17:00'),(41,12,'Your book issue request for \"The Great Gatsby\" has been approved. Please collect the book from the library.',0,'2025-07-03 12:17:00'),(42,12,'Your book issue request for \"A Brief History of Time\" has been approved. Please collect the book from the library.',0,'2025-07-03 12:17:00'),(43,12,'Your book issue request for \"A Brief History of Time\" has been approved. Please collect the book from the library.',0,'2025-07-03 12:17:00'),(44,12,'Your book issue request for \"The Great Gatsby\" has been approved. Please collect the book from the library.',0,'2025-07-03 12:17:00'),(45,12,'Your book issue request for \"The Great Gatsby\" has been rejected. Please contact the library for details.',0,'2025-07-03 12:17:00'),(46,12,'Your book issue request for \"The Great Gatsby\" has been approved. Please collect the book from the library.',0,'2025-07-03 12:17:00'),(47,12,'Your book issue request for \"The Great Gatsby\" has been rejected. Please contact the library for details.',0,'2025-07-03 12:17:00'),(67,11,'Reminder: Your book \"A Brief History of Time\" is overdue. Please return it as soon as possible.',0,'2025-07-04 12:01:00'),(68,11,'Reminder: Your book \"The Great Gatsby\" is overdue. Please return it as soon as possible.',0,'2025-07-04 12:01:00'),(69,11,'Reminder: Your book \"The Great Gatsby\" is overdue. Please return it as soon as possible.',0,'2025-07-04 12:01:00');
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publishers`
--

DROP TABLE IF EXISTS `publishers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publishers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publishers`
--

LOCK TABLES `publishers` WRITE;
/*!40000 ALTER TABLE `publishers` DISABLE KEYS */;
INSERT INTO `publishers` VALUES (11,'Bloomsbury'),(5,'Cambridge University Press'),(10,'Elsevier'),(7,'Hachette Book Group'),(2,'HarperCollins'),(3,'O\'Reilly Media'),(6,'Oxford University Press'),(4,'Pearson'),(1,'Penguin Random House'),(8,'Scholastic'),(9,'Springer');
/*!40000 ALTER TABLE `publishers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommended_books`
--

DROP TABLE IF EXISTS `recommended_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommended_books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `facultyId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `publisher` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `description` text,
  `copies` int DEFAULT '1',
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommended_books`
--

LOCK TABLES `recommended_books` WRITE;
/*!40000 ALTER TABLE `recommended_books` DISABLE KEYS */;
INSERT INTO `recommended_books` VALUES (1,14,'The Pragmatic Programmer','Andrew Hunt','Addison-Wesley','Programming','A classic for software engineers.',2,'Pending','2025-07-02 15:17:16'),(2,14,'The Pragmatic Programmer','Andrew Hunt','Addison-Wesley','Programming','A classic book on software craftsmanship.',3,'Pending','2025-07-02 15:34:06'),(3,14,'Clean Architecture','Robert C. Martin','Pearson','Software Design','Guidelines for creating robust software architectures.',2,'Approved','2025-07-02 15:34:06'),(4,14,'Artificial Intelligence: A Modern Approach','Stuart Russell','Pearson','AI','Comprehensive resource on modern AI.',4,'Pending','2025-07-02 15:34:06'),(5,14,'Design Patterns','Erich Gamma','Addison-Wesley','Software Design','The famous Gang of Four book on design patterns.',1,'Rejected','2025-07-02 15:34:06'),(6,14,'Introduction to Algorithms','Thomas H. Cormen','MIT Press','Computer Science','The go-to book for learning algorithms.',2,'Approved','2025-07-02 15:34:06'),(7,14,'Milky','an','wde','Science','eed',1,'Pending','2025-07-02 15:34:51'),(8,14,'nj','gt','rgtgtr','tg','tgr',1,'Pending','2025-07-03 13:09:49'),(9,14,'jbu','nj','knk','knk','n',1,'Pending','2025-07-03 13:13:53');
/*!40000 ALTER TABLE `recommended_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `renewals`
--

DROP TABLE IF EXISTS `renewals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `renewals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `borrowed_book_id` int NOT NULL,
  `user_id` int NOT NULL,
  `requested_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `approved_date` datetime DEFAULT NULL,
  `new_due_date` date DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `borrowed_book_id` (`borrowed_book_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `renewals_ibfk_1` FOREIGN KEY (`borrowed_book_id`) REFERENCES `borrowed_books` (`id`),
  CONSTRAINT `renewals_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `renewals`
--

LOCK TABLES `renewals` WRITE;
/*!40000 ALTER TABLE `renewals` DISABLE KEYS */;
/*!40000 ALTER TABLE `renewals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `returned_books`
--

DROP TABLE IF EXISTS `returned_books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `returned_books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `copy_id` int NOT NULL,
  `user_id` int NOT NULL,
  `student_id` varchar(50) DEFAULT NULL,
  `borrowed_date` datetime NOT NULL,
  `due_date` datetime NOT NULL,
  `returned_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `remarks` varchar(255) DEFAULT NULL,
  `status` enum('pending','returned') DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `book_id` (`book_id`),
  KEY `copy_id` (`copy_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `returned_books_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `returned_books_ibfk_2` FOREIGN KEY (`copy_id`) REFERENCES `book_copies` (`id`),
  CONSTRAINT `returned_books_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `returned_books`
--

LOCK TABLES `returned_books` WRITE;
/*!40000 ALTER TABLE `returned_books` DISABLE KEYS */;
/*!40000 ALTER TABLE `returned_books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `student_id` varchar(20) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `year` varchar(20) DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `designation` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_id` (`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Aman Verma','amanverma@example.com','9876543210','Hoshiarpur, Punjab','STU1001','Computer Science','2nd Year',NULL,NULL),(2,'Priya Sharma','priya.sharma@example.com','9123456789','Chandigarh, Punjab','STU1002','Information Technology','1st Year',NULL,NULL),(3,'Manish Kumar','manishkumar@example.com','9988776655','Amritsar, Punjab','STU1003','Electronics','3rd Year','/uploads/1751196023688-1697867099803.jpeg',NULL),(4,'Sakshi Mehra','sakshi.mehra@example.com','9785642310','Ludhiana, Punjab','STU1004','Mechanical','2nd Year',NULL,NULL),(5,'Rohit Singh','rohit.singh@example.com','9998887776','Jalandhar, Punjab','STU1005','Civil','4th Year',NULL,NULL),(6,'Neha Gupta','neha.gupta@example.com','9812312312','Mohali, Punjab','STU1006','Computer Science','3rd Year',NULL,NULL),(7,'Deepak Jain','deepak.jain@example.com','9001122334','Patiala, Punjab','STU1007','Electrical','2nd Year',NULL,NULL),(8,'Riya Kapoor','riya.kapoor@example.com','9123456677','Bathinda, Punjab','STU1008','Computer Science','1st Year',NULL,NULL),(9,'Arjun Malhotra','arjun.malhotra@example.com','9543212345','Pathankot, Punjab','STU1009','Information Technology','4th Year',NULL,NULL),(10,'Simran Kaur','simran.kaur@example.com','9876541230','Hoshiarpur, Punjab','STU1010','Electronics','3rd Year',NULL,NULL),(11,'Kunal Bhatia','kunal.bhatia@example.com','9101010101','Chandigarh, Punjab','STU1011','Mechanical','2nd Year',NULL,NULL),(12,'Megha Sharma','megha.sharma@example.com','9988774455','Ludhiana, Punjab','STU1012','Civil','3rd Year',NULL,NULL),(13,'Vikram','vikramsingh@example.com','9870001117','Jalandhar, Pb','STU1013','Computer Science','4th Year','/uploads/1751385484728-1697867099803.jpeg',NULL),(14,'Pooja Rani','pooja.rani@example.com','9123987654','Mohali, Punjab','STU1014','Electrical','1st Year',NULL,NULL),(15,'Aditya Verma','aditya.verma@example.com','9988556633','Amritsar, Punjab','STU1015','Information Technology','2nd Year',NULL,NULL),(16,'Sneha Chauhan','sneha.chauhan@example.com','9811223344','Patiala, Punjab','STU1016','Mechanical','3rd Year',NULL,NULL),(17,'Harshdeep Kaur','harshdeep.kaur@example.com','9123459876','Bathinda, Punjab','STU1017','Civil','2nd Year',NULL,NULL),(18,'Ravinder Singh','ravinder.singh@example.com','9876512345','Pathankot, Punjab','STU1018','Computer Science','1st Year',NULL,NULL),(19,'Aarti Sharma','aarti.sharma@example.com','9012345678','Hoshiarpur, Punjab','STU1019','Electronics','4th Year',NULL,NULL),(20,'Sandeep Kumar','sandeep.kumar@example.com','9876543211','Chandigarh, Punjab','STU1020','Computer Science','3rd Year',NULL,NULL),(21,'Manish','abx@example.com',NULL,NULL,'STU1021',NULL,NULL,NULL,NULL),(22,'Manish Kumar','gmanishaggarwal541@gmail.com','9874563214','Abc','STU1022','CS','2nd',NULL,NULL);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_notifications`
--

DROP TABLE IF EXISTS `system_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_notifications`
--

LOCK TABLES `system_notifications` WRITE;
/*!40000 ALTER TABLE `system_notifications` DISABLE KEYS */;
INSERT INTO `system_notifications` VALUES (1,'Library will be closed this Sunday for maintenance.','2025-06-29 08:40:49'),(2,'New books added in the CSE department.','2025-06-29 08:40:49'),(3,'Library system will undergo updates next weekend.','2025-06-29 08:40:49'),(4,'hi','2025-07-03 11:15:30');
/*!40000 ALTER TABLE `system_notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dark_mode` tinyint(1) DEFAULT '0',
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_token_expiry` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role` enum('admin','student','faculty','librarian') NOT NULL DEFAULT 'student',
  `student_id` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `student_id` (`student_id`),
  CONSTRAINT `fk_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (11,'Manish Kumar','gmanishaggarwal541@gmail.com','$2b$10$pu1nb6In4Fbk5pEUvrpt1es.3WAeNnDR/3/29imGmI0ZNRgVEuy0O',0,'f35c8733045ca056d422289d8f677c4d413b7398a82f55f46dc904b290a05647','2025-06-28 13:01:23','2025-06-27 08:22:15','2025-07-04 15:58:10','admin','STU1022'),(12,'Manish Kumar','manishkumar@example.com','$2b$10$5DBBDKey1HYAyNVMxiWf0.UgFOFo2fJliMb0v32mOLVCEY7g2NnNa',1,NULL,NULL,'2025-06-29 07:28:34','2025-07-04 15:58:01','faculty','STU1003'),(14,'Manish','abx@example.com','$2b$10$dX6k4gYPoVH1r4SRr1bcLOq.K/lVhdnxA4GuDH/p1RBHXhpTVlA0m',0,NULL,NULL,'2025-07-04 12:32:30','2025-07-04 16:17:18','student','STU1014'),(15,'Vikram','priya.sharma@example.com','$2b$10$dX6k4gYPoVH1r4SRr1bcLOq.K/lVhdnxA4GuDH/p1RBHXhpTVlA0m',0,NULL,NULL,'2025-07-04 15:35:35','2025-07-04 15:56:12','librarian','STU1002');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-04 21:56:12
