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
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT COMMENT '学生编号',
  `student_name` char(5) NOT NULL COMMENT '学生姓名',
  `student_password` char(20) NOT NULL COMMENT '学生密码',
  `type` char(1) NOT NULL COMMENT '权限种类',
  PRIMARY KEY (`student_id`) COMMENT '主键索引',
  UNIQUE KEY `student_student_id_student_name_student_password_uindex` (`student_id`,`student_name`,`student_password`),
  KEY `stu_id_na_pa_index` (`student_name`,`student_password`) USING BTREE,
  KEY `student_student_name_index` (`student_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1213902089 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'怡宝','111','1'),(1213902001,'王嗣辰','1213902001','1'),(1213902002,'蔡湘君','1213902002','1'),(1213902003,'杨甜甜','1213902003','1'),(1213902004,'陆明宇','1213902004','1'),(1213902005,'王丽','1213902005','1'),(1213902006,'孔令通','1213902006','1'),(1213902007,'叶启升','1213902007','1'),(1213902008,'吴鼎文','1213902008','1'),(1213902009,'赵春羽','1213902009','1'),(1213902010,'拉巴泽仁','1213902010','1'),(1213902011,'马天伟','1213902011','1'),(1213902012,'刘沃源','1213902012','1'),(1213902013,'张茹欣','1213902013','1'),(1213902014,'韦珂米','1213902014','1'),(1213902015,'张萌','1213902015','1'),(1213902016,'贡俊超','1213902016','1'),(1213902017,'段新龙','1213902017','1'),(1213902018,'周彬怡','1213902018','1'),(1213902019,'刘思雨','1213902019','1'),(1213902020,'景乙康','1213902020','1'),(1213902021,'宋齐豪','1213902021','1'),(1213902022,'张旭','1213902022','1'),(1213902023,'吕雨倡','1213902023','1'),(1213902024,'卢国颖','1213902024','1'),(1213902025,'罗艺馨','1213902025','1'),(1213902026,'南项洋','1213902026','1'),(1213902027,'莫春燕','1213902027','1'),(1213902028,'李皓与','1213902028','1'),(1213902029,'杨贵吉','1213902029','1'),(1213902030,'张翘楚','1213902030','1'),(1213902031,'汤刘蕾','1213902031','1'),(1213902032,'周敏','1213902032','1'),(1213902033,'刘蕊晖','1213902033','1'),(1213902034,'邓鸿昌','1213902034','1'),(1213902036,'白倩','1213902036','1'),(1213902037,'张帆','1213902037','1'),(1213902038,'王诗珂','1213902038','1'),(1213902039,'袁艺通','1213902039','1'),(1213902040,'徐静雯','1213902040','1'),(1213902041,'阿旺卓玛','1213902041','1'),(1213902042,'樊旺宏','1213902042','1'),(1213902043,'颜宇航','1213902043','1'),(1213902044,'韩昊隆','1213902044','1'),(1213902045,'王一斐','1213902045','1'),(1213902046,'尹玉婷','1213902046','1'),(1213902047,'岳顺','1213902047','1'),(1213902048,'高冠诃','1213902048','1'),(1213902049,'肖嘉怡','1213902049','1'),(1213902050,'布琼','1213902050','1');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `student_Update_trigger` AFTER UPDATE ON `student` FOR EACH ROW begin
        insert into student_update_information values (null,concat('更改之前:学生id:',OLD.student_id,'学生姓名:',OLD.student_name,'学生密码:',OLD.student_password
        ,'更改之后:学生id:',NEW.student_id,'学生姓名:',NEW.student_name,'学生密码:',NEW.student_password),now());
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `student_delete_trigger` AFTER DELETE ON `student` FOR EACH ROW begin
        insert into student_update_information values (null,concat('删除之前:学生id:',OLD.student_id,'学生姓名:',OLD.student_name,'学生密码:',OLD.student_password
        ),now());
end */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-12 18:20:52
