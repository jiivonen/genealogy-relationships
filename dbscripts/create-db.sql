DROP DATABASE IF EXISTS genrel;
CREATE DATABASE genrel
DEFAULT CHARACTER SET utf8mb4;
USE genrel;

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

ALTER TABLE `users` ADD UNIQUE KEY `username` (`username`);
