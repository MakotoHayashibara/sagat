-- MySQL dump 10.13  Distrib 5.7.31, for osx10.12 (x86_64)
--
-- Host: localhost    Database: restaurant
-- ------------------------------------------------------
-- Server version	5.7.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `guide`
--

DROP TABLE IF EXISTS `guide`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guide` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text,
  `Genre` text,
  `Food` text,
  `Decor` text,
  `Service` text,
  `Cost` text,
  `住所` text,
  `エリア` text,
  `電話` text,
  `コメント` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guide`
--

LOCK TABLES `guide` WRITE;
/*!40000 ALTER TABLE `guide` DISABLE KEYS */;
INSERT INTO `guide` VALUES (1,'アントニオ南青山','イタリアン','20','20','20','20','港区南青山7-3-6','南青山','03-3797-0388','美味しい'),(3,'アントニオ南青山','イタリアン','10','10','10','10','港区南青山7-3-6','南青山','03-3797-0388','美味しい'),(4,'中国飯店　六本木',NULL,'19',NULL,NULL,NULL,NULL,NULL,NULL,NULL),(5,'ざくろ銀座',NULL,NULL,NULL,NULL,NULL,NULL,'銀座',NULL,NULL),(6,'ざくろ銀座',NULL,NULL,NULL,NULL,NULL,NULL,'銀座',NULL,NULL),(7,'ざくろ銀座',NULL,NULL,NULL,NULL,NULL,NULL,'銀座',NULL,NULL),(8,'ざくろ銀座',NULL,NULL,NULL,NULL,NULL,NULL,'銀座',NULL,NULL),(9,'ざくろ銀座',NULL,NULL,NULL,NULL,NULL,NULL,'銀座',NULL,NULL),(10,'ざくろ銀座',NULL,NULL,NULL,NULL,NULL,NULL,'銀座',NULL,NULL),(11,'ざくろ銀座',NULL,NULL,NULL,NULL,NULL,NULL,'銀座',NULL,NULL),(12,'ざくろ銀座',NULL,NULL,NULL,NULL,NULL,NULL,'銀座',NULL,NULL),(13,'牛庵','','','','','','','銀座','',''),(14,'とんかつ山家','','','','','','','御徒町','',''),(15,'グルガオン','','','','','','','銀座','',''),(16,'牛庵','','19','','','','','銀座','',''),(17,'牛庵','','','','','','','銀座','',''),(18,'牛庵','','NA','','','','','銀座','',''),(19,'牛庵','','NA','','','','','銀座','',''),(20,'牛庵','','NA','','','','','銀座','',''),(21,'牛庵','','NA','','','','','銀座','',''),(22,'牛庵','','NULL','','','','','銀座','',''),(23,'牛庵','','NULL','','','','','銀座','',''),(24,'牛庵','','obj.food','','','','','銀座','',''),(25,'牛庵','','obj.food','','','','','銀座','',''),(26,'アントニオ南青山','','24','obj.decor','','','','','',''),(27,'アントニオ南青山','','obj.food',NULL,'','','','','','');
/*!40000 ALTER TABLE `guide` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-23 11:37:38
