CREATE DATABASE  IF NOT EXISTS `student_control_system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `student_control_system`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: student_control_system
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score` (
  `student_id` int NOT NULL COMMENT '学生编号',
  `class_id` int NOT NULL COMMENT '科目编号',
  `score` float NOT NULL COMMENT '科目成绩',
  PRIMARY KEY (`student_id`,`class_id`),
  KEY `fk_class_id` (`class_id`),
  KEY `sco_index` (`score`),
  KEY `score_student_id_index` (`student_id`),
  CONSTRAINT `fk_class_id` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_student_id` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score`
--

LOCK TABLES `score` WRITE;
/*!40000 ALTER TABLE `score` DISABLE KEYS */;
INSERT INTO `score` VALUES (1213902015,2,38),(1213902041,2,45),(1213902048,2,46),(1213902018,2,47),(1213902050,2,52),(1213902020,2,61),(1213902003,2,64),(1213902016,2,64),(1213902024,2,64),(1213902014,2,65),(1213902027,2,65),(1213902039,2,65),(1213902047,2,65),(1213902011,2,66),(1213902012,2,66),(1213902023,2,66),(1213902036,2,66),(1213902013,2,67),(1213902017,2,67),(1213902043,2,67),(1213902019,2,68),(1213902034,2,68),(1213902026,2,69),(1213902010,2,70),(1213902021,2,70),(1213902025,2,70),(1213902032,2,71),(1213902006,2,73),(1213902028,2,73),(1213902044,2,73),(1213902005,2,74),(1213902007,2,74),(1213902008,2,74),(1213902033,2,74),(1213902038,2,74),(1213902001,1,75),(1213902009,2,75),(1213902016,1,75),(1213902029,2,75),(1213902030,2,75),(1213902014,1,76),(1213902018,1,76),(1213902022,2,76),(1213902037,2,76),(1213902043,1,76),(1213902045,2,76),(1213902049,2,76),(1213902002,2,77),(1213902007,1,77),(1213902015,1,77),(1213902003,1,78),(1213902021,1,78),(1213902038,1,78),(1213902050,1,78),(1213902012,1,79),(1213902023,1,79),(1213902026,1,79),(1213902028,1,79),(1213902024,1,80),(1213902031,2,80),(1213902032,1,80),(1213902037,1,80),(1213902001,2,81),(1213902004,2,81),(1213902008,1,81),(1213902010,1,81),(1213902040,1,81),(1213902048,1,81),(1213902049,1,81),(1213902011,1,82),(1213902020,1,82),(1213902046,2,82),(1213902013,1,83),(1213902017,1,83),(1213902022,1,83),(1213902027,1,83),(1213902029,1,83),(1213902036,1,83),(1213902042,1,83),(1213902042,2,83),(1213902006,1,84),(1213902019,1,84),(1213902030,1,84),(1213902031,1,84),(1213902041,1,84),(1213902044,1,84),(1213902045,1,84),(1213902046,1,84),(1213902002,1,85),(1213902004,1,85),(1213902005,1,85),(1213902039,1,85),(1213902047,1,85),(1213902033,1,87),(1213902009,1,88),(1213902034,1,88),(1213902025,1,91),(1213902040,2,91);
/*!40000 ALTER TABLE `score` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-12 18:20:52
