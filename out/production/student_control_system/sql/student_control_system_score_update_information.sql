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
-- Table structure for table `score_update_information`
--

DROP TABLE IF EXISTS `score_update_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score_update_information` (
  `information_id` int NOT NULL AUTO_INCREMENT,
  `score_information` varchar(100) NOT NULL,
  `data` datetime NOT NULL COMMENT '更改后日期',
  PRIMARY KEY (`information_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='成绩表更改记录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `score_update_information`
--

LOCK TABLES `score_update_information` WRITE;
/*!40000 ALTER TABLE `score_update_information` DISABLE KEYS */;
INSERT INTO `score_update_information` VALUES (2,'更改之前:学生id:1213902015科目名称:外语学生成绩38更改之后:学生id:1213902015科目名称:外语学生成绩40','0000-00-00 00:00:00'),(3,'更改之前:学生id: 1213902015科目名称: 外语学生成绩: 45更改之后:学生id: 1213902015科目名称: 外语学生成绩: 44','2023-06-02 18:06:43'),(4,'更改之前:学生id: 1213902018科目名称: 体育学生成绩: 60更改之后:学生id: 1213902018科目名称: 体育学生成绩: 61','2023-06-02 18:08:23'),(5,'更改之前:学生id: 1213902018科目名称: 外语学生成绩: 47更改之后:学生id: 1213902018科目名称: 外语学生成绩: 60','2023-06-07 23:53:01'),(6,'更改之前:学生id: 1213902018科目名称: 外语学生成绩: 60更改之后:学生id: 1213902018科目名称: 外语学生成绩: 47','2023-06-07 23:53:32'),(7,'删除之前:学生id: 1213902018科目名称: 外语学生成绩: 47','2023-06-07 23:59:38');
/*!40000 ALTER TABLE `score_update_information` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-12 18:20:53
