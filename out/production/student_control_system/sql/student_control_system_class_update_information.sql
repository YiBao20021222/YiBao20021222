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
-- Table structure for table `class_update_information`
--

DROP TABLE IF EXISTS `class_update_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_update_information` (
  `information_id` int NOT NULL AUTO_INCREMENT,
  `class_update_information` varchar(50) NOT NULL,
  `data` datetime NOT NULL COMMENT '更改后日期',
  PRIMARY KEY (`information_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='科目表记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_update_information`
--

LOCK TABLES `class_update_information` WRITE;
/*!40000 ALTER TABLE `class_update_information` DISABLE KEYS */;
INSERT INTO `class_update_information` VALUES (1,'更改之前:科目编号:1科目名字:体育2更改之后:科目编号:1科目名字:体育','0000-00-00 00:00:00'),(2,'更改之前:科目编号:  487科目名字: 高数更改之后:科目编号: 487科目名字: 线代','2023-06-02 15:58:53'),(3,'更改之前:科目编号:  487科目名字: 高数更改之后:科目编号: 487科目名字: 线代','2023-06-02 18:00:17'),(4,'更改之前:科目编号:  1科目名字: 体育更改之后:科目编号: 1科目名字: 体育','2023-06-02 21:50:19'),(5,'删除之前:科目编号:  489科目名字: 高数','2023-06-08 13:23:07'),(6,'删除之前:科目编号:  490科目名字: 线代','2023-06-08 13:23:22'),(7,'更改之前:科目编号:  491科目名字: 高数更改之后:科目编号: 491科目名字: 线代','2023-06-08 13:32:22'),(8,'删除之前:科目编号:  1科目名字: 体育','2023-06-09 18:05:43'),(9,'删除之前:科目编号:  492科目名字: 体育','2023-06-09 18:05:43'),(10,'删除之前:科目编号:  2科目名字: 外语','2023-06-10 10:38:31'),(11,'删除之前:科目编号:  493科目名字: 体育','2023-06-10 10:45:26'),(12,'删除之前:科目编号:  491科目名字: 线代','2023-06-10 10:45:26'),(13,'删除之前:科目编号:  494科目名字: 外语','2023-06-10 10:45:26'),(14,'删除之前:科目编号:  3科目名字: 高数','2023-08-20 09:46:28');
/*!40000 ALTER TABLE `class_update_information` ENABLE KEYS */;
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
