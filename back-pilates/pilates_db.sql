CREATE DATABASE  IF NOT EXISTS `pilates_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `pilates_db`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: pilates_db
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
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `apellido` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expiracion` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (1,'María Paula','Vera ','mariapaulaveram@gmail.com','a68bc0c8e5bdfbc3cee6cb7847f71fb0',NULL,NULL),(4,'Marge','Simpson','marge@mail.com','81dc9bdb52d04dc20036dbd8313ed055',NULL,NULL),(5,'Lisa','Simpson','lisa@mail.com','81dc9bdb52d04dc20036dbd8313ed055',NULL,NULL),(6,'Maguie','Simpson','maguie@mail.com','fa85db586495943befc6394768a3ad12',NULL,NULL),(7,'Bart','Simpson','bart@mail.com','fa85db586495943befc6394768a3ad12',NULL,NULL);
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clases`
--

DROP TABLE IF EXISTS `clases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `dia` varchar(20) DEFAULT NULL,
  `hora` varchar(20) DEFAULT NULL,
  `cupo` int DEFAULT NULL,
  `profesor` varchar(45) DEFAULT NULL,
  `cupo_disponible` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clases`
--

LOCK TABLES `clases` WRITE;
/*!40000 ALTER TABLE `clases` DISABLE KEYS */;
INSERT INTO `clases` VALUES (22,'martes','15:00',12,'Prof. Maria',10),(24,'jueves','15:00',15,'Prof. Maria',12),(29,'lunes','18:00',15,'Prof. Pereza',15),(31,'miercoles','10:00',15,'Prof. Juan',7),(32,'miercoles','11:00',10,'Prof. García',4),(33,'jueves','16:00',10,'Prof. Juana',9),(34,'viernes','10:00',10,'Prof. García',10),(35,'viernes','11:00',10,'Prof. Juan',10),(36,'sabado','10:00',10,'Prof. García',8),(37,'sabado','11:00',10,'Prof. Juan',9),(40,'lunes','11:00',15,'Prof. García',14),(41,'martes','16:00',15,'Prof. Pereza',0);
/*!40000 ALTER TABLE `clases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inscripciones`
--

DROP TABLE IF EXISTS `inscripciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inscripciones` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int DEFAULT NULL,
  `id_clase` int DEFAULT NULL,
  `fecha_inscripcion` datetime DEFAULT CURRENT_TIMESTAMP,
  `presente` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_alumno` (`id_alumno`,`id_clase`),
  KEY `id_clase` (`id_clase`),
  CONSTRAINT `inscripciones_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumnos` (`id`),
  CONSTRAINT `inscripciones_ibfk_2` FOREIGN KEY (`id_clase`) REFERENCES `clases` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inscripciones`
--

LOCK TABLES `inscripciones` WRITE;
/*!40000 ALTER TABLE `inscripciones` DISABLE KEYS */;
INSERT INTO `inscripciones` VALUES (21,1,31,'2025-09-10 12:30:26',0),(27,1,33,'2025-09-10 15:03:23',0),(31,1,37,'2025-09-10 16:22:05',0),(33,1,29,'2025-09-10 16:28:53',1),(37,4,31,'2025-09-10 16:40:51',0),(39,4,32,'2025-09-10 16:41:00',0),(50,1,41,'2025-09-16 09:57:45',1),(52,4,22,'2025-09-16 17:08:23',1),(54,1,40,'2025-09-22 10:09:39',0),(56,1,34,'2025-09-22 10:09:39',0),(57,1,22,'2025-09-23 14:35:32',0),(60,1,24,'2025-09-23 14:37:06',0),(62,1,36,'2025-09-23 14:40:39',0),(63,1,32,'2025-09-23 14:46:03',0),(75,1,35,'2025-09-23 18:36:56',0),(80,5,40,'2025-09-23 18:54:26',0),(81,5,36,'2025-09-23 18:54:57',0),(82,4,36,'2025-09-23 19:15:53',0);
/*!40000 ALTER TABLE `inscripciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Felix','7b7a53e239400a13bd6be6c91c4f6c4e');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-01  8:22:01
