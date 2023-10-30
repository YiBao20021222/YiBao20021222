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
-- Table structure for table `teacher_update_information`
--

DROP TABLE IF EXISTS `teacher_update_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_update_information` (
  `information_id` int NOT NULL AUTO_INCREMENT,
  `teacher_information` char(100) NOT NULL,
  `data` datetime NOT NULL COMMENT '更改后日期',
  PRIMARY KEY (`information_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='老师更改记录表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_update_information`
--

LOCK TABLES `teacher_update_information` WRITE;
/*!40000 ALTER TABLE `teacher_update_information` DISABLE KEYS */;
INSERT INTO `teacher_update_information` VALUES (2,'更改之前:老师id:1老师姓名王麻子老师密码:123更改之后:老师id:1老师姓名:王麻子老师密码:11111','2023-06-02 15:48:52'),(3,'更改之前:老师id:3老师姓名12老师密码:123','2023-06-07 15:03:12'),(4,'更改之前:老师id:1老师姓名王麻子老师密码:11111','2023-06-07 15:06:11'),(5,'更改之前:老师id:1老师姓名王麻子老师密码:123更改之后:老师id:1老师姓名:王麻子老师密码:1234','2023-06-07 15:23:14'),(6,'更改之前:老师id:1老师姓名王麻子老师密码:1234更改之后:老师id:1老师姓名:娃娃老师密码:1234','2023-06-07 15:23:24'),(7,'更改之前:老师id:1老师姓名娃娃老师密码:1234更改之后:老师id:1老师姓名:娃娃老师密码:111','2023-06-07 15:24:07'),(8,'更改之前:老师id:1老师姓名娃娃老师密码:111更改之后:老师id:1老师姓名:瓦达老师密码:111','2023-06-07 15:24:21'),(9,'更改之前:老师id:1老师姓名瓦达老师密码:111更改之后:老师id:1老师姓名:旺旺号老师密码:111','2023-06-10 11:03:16'),(10,'更改之前:老师id:3老师姓名哈哈哈老师密码:123更改之后:老师id:3老师姓名:哈哈哈老师密码:123','2023-06-10 13:27:37'),(11,'更改之前:老师id:3老师姓名哈哈哈老师密码:123更改之后:老师id:3老师姓名:哈哈哈老师密码:123','2023-06-10 13:27:44'),(12,'更改之前:老师id:3老师姓名哈哈哈老师密码:123','2023-06-10 13:27:52');
/*!40000 ALTER TABLE `teacher_update_information` ENABLE KEYS */;
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
