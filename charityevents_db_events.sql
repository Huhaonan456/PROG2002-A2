-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: charityevents_db
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(100) NOT NULL,
  `event_desc` text,
  `event_date` datetime NOT NULL,
  `event_location` varchar(100) NOT NULL,
  `event_ticket_price` decimal(10,2) unsigned zerofill NOT NULL,
  `event_current_amount` decimal(12,2) unsigned zerofill DEFAULT NULL,
  `event_target_amount` decimal(12,2) NOT NULL,
  `event_status` varchar(20) NOT NULL,
  `event_is_suspended` tinyint DEFAULT '0',
  `org_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `category_id` (`category_id`),
  KEY `org_id` (`org_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `org_id` FOREIGN KEY (`org_id`) REFERENCES `organizations` (`org_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'2024 Brisbane Kids Charity Fun Run','A 5km parent-child run where all registration fees funded library construction for remote primary schools in Brisbane; 1,200 families participated with on-site charity stalls','2024-11-10 09:00:00','Brisbane South Bank Park (near Brisbane River Trail)',00000045.00,0000058200.00,50000.00,'Completed',0,1,1),(2,'2024 Melbourne Life Guard Charity Dinner','Featured a celebrity chef menu and auction of signed sports jerseys/artworks; proceeds supported medical subsidies for children with leukemia','2024-12-02 18:30:00','Melbourne Crown Casino Grand Ballroom',00000220.00,0000235600.00,200000.00,'Completed',0,2,2),(3,'2025 Sydney Sunshine Kids Art Auction','Auction of donated artworks by Australian local artists; proceeds will fund tablet purchases for underprivileged children in New South Wales (to support online learning)','2025-10-25 14:00:00','Sydney Museum of Contemporary Art Gallery',00000000.00,0000032000.00,80000.00,'Upcoming',0,1,3),(4,'2025 Perth Life Guard Charity Concert','Volunteer performance by the Perth Symphony Orchestra (featuring classical and charity-themed music); ticket sales support medication subsidies for rare disease patients','2025-11-08 19:30:00','Perth Concert Hall',00000065.00,0000045800.00,120000.00,'Upcoming',0,2,4),(5,'2025 Sydney Parent-Child Charity Mini Marathon','A 3km mini-marathon for children (3-12 years old) and parents; corporate matching donations were provided for each kilometer completed to fund children’s nutritious lunch programs','2025-10-18 10:00:00','Sydney Royal Botanic Garden Circular Trail',00000050.00,0000028500.00,60000.00,'Upcoming',0,1,1),(6,'2025 Brisbane Medical Assistance Charity Dinner','Themed \"Light of Life\", featuring medical expert seminars and an auction (including overseas medical consultation services); proceeds support dialysis costs for uremia patients','2025-11-22 18:00:00','Brisbane Marriott Hotel Ballroom',00000180.00,0000052300.00,150000.00,'Upcoming',0,2,2),(7,'2024 Adelaide Children’s Picture Book Auction','Auction of signed picture books and original illustrations by renowned children’s authors; proceeds funded picture book corners for rural kindergartens in South Australia','2024-09-15 10:00:00','Adelaide State Library Meeting Room',00000000.00,0000035800.00,30000.00,'Completed',0,1,3),(8,'2024 Canberra Charity Starlight Concert','An open-air concert with local folk singers; on-site donation boxes funded free medical check-ups for elderly people from low-income families','2024-08-24 19:00:00','Canberra Commonwealth Park Open-Air Theatre',00000030.00,0000048200.00,45000.00,'Completed',0,2,4);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-06 17:53:48
