
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `commentid` int(11) NOT NULL AUTO_INCREMENT,
  `authorid` int(11) NOT NULL,
  `content` text,
  `create_at` datetime NOT NULL,
  `postid` int(11) NOT NULL,
  PRIMARY KEY (`commentid`),
  KEY `user_id_ref_comment` (`authorid`),
  KEY `postid` (`postid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `publication`;
CREATE TABLE IF NOT EXISTS `publication` (
  `postid` int(11) NOT NULL AUTO_INCREMENT,
  `authorid` int(11) NOT NULL,
  `content` text,
  `imageurl` varchar(255) DEFAULT NULL,
  `create_at` datetime NOT NULL,
  PRIMARY KEY (`postid`),
  KEY `user_id_ref_publication` (`authorid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `publications_like`;
CREATE TABLE IF NOT EXISTS `publications_like` (
  `postid` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  KEY `user_id_ref_like` (`userId`),
  KEY `postid` (`postid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;


ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`authorid`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`postid`) REFERENCES `publication` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `publication`
  ADD CONSTRAINT `publication_ibfk_1` FOREIGN KEY (`authorid`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `publications_like`
  ADD CONSTRAINT `publications_like_ibfk_1` FOREIGN KEY (`postid`) REFERENCES `publication` (`postid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publications_like_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;


