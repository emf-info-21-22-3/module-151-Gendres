-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: semaphor151
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `t_message`
--

DROP TABLE IF EXISTS `t_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_message` (
  `pk_message` int NOT NULL,
  `texte` varchar(160) NOT NULL,
  `dateEnvoi` datetime NOT NULL,
  `fk_user` int NOT NULL,
  `fk_room` int NOT NULL,
  PRIMARY KEY (`pk_message`),
  UNIQUE KEY `idt_message_UNIQUE` (`pk_message`),
  KEY `fk_t_message_t_user1_idx` (`fk_user`),
  KEY `fk_t_message_t_room1_idx` (`fk_room`),
  CONSTRAINT `fk_t_message_t_room1` FOREIGN KEY (`fk_room`) REFERENCES `t_room` (`pk_room`),
  CONSTRAINT `fk_t_message_t_user1` FOREIGN KEY (`fk_user`) REFERENCES `t_user` (`pk_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_message`
--

LOCK TABLES `t_message` WRITE;
/*!40000 ALTER TABLE `t_message` DISABLE KEYS */;
INSERT INTO `t_message` VALUES (1,'Adieu técole !','2022-09-10 10:23:00',1,0);
/*!40000 ALTER TABLE `t_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_room`
--

DROP TABLE IF EXISTS `t_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_room` (
  `room_id` varchar(20) NOT NULL,
  `pk_room` int NOT NULL,
  PRIMARY KEY (`pk_room`),
  UNIQUE KEY `idt_room_UNIQUE` (`room_id`),
  UNIQUE KEY `pk_room_UNIQUE` (`pk_room`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_room`
--

LOCK TABLES `t_room` WRITE;
/*!40000 ALTER TABLE `t_room` DISABLE KEYS */;
INSERT INTO `t_room` VALUES ('main',0),('newroom',1);
/*!40000 ALTER TABLE `t_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `t_user`
--

DROP TABLE IF EXISTS `t_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `t_user` (
  `username` varchar(20) NOT NULL,
  `password_hash` varchar(32) NOT NULL,
  `isAdmin` tinyint NOT NULL,
  `pk_user` int NOT NULL,
  PRIMARY KEY (`pk_user`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `pk_user_UNIQUE` (`pk_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `t_user`
--

LOCK TABLES `t_user` WRITE;
/*!40000 ALTER TABLE `t_user` DISABLE KEYS */;
INSERT INTO `t_user` VALUES ('admin','admin',1,1),('gendre','password',0,2);
/*!40000 ALTER TABLE `t_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-19  9:25:41
