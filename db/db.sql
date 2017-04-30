-- Valentina Studio --
-- MySQL dump --
-- ---------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
-- ---------------------------------------------------------


-- CREATE DATABASE "catho" ---------------------------------
CREATE DATABASE IF NOT EXISTS `catho` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `catho`;
-- ---------------------------------------------------------


-- CREATE TABLE "clients" ----------------------------------
-- CREATE TABLE "clients" --------------------------------------
CREATE TABLE `clients` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 6;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- CREATE TABLE "order_products" ---------------------------
-- CREATE TABLE "order_products" -------------------------------
CREATE TABLE `order_products` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`product` Int( 255 ) NOT NULL,
	`price` Float( 12, 0 ) NOT NULL,
	`reason` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`order` Int( 255 ) NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 7;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- CREATE TABLE "products" ---------------------------------
-- CREATE TABLE "products" -------------------------------------
CREATE TABLE `products` ( 
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`name` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`price` Float( 12, 0 ) NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 4;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- CREATE TABLE "rules" ------------------------------------
-- CREATE TABLE "rules" ----------------------------------------
CREATE TABLE `rules` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`client` Int( 255 ) NOT NULL,
	`prefix` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`description` VarChar( 255 ) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`param` LongText CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 7;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- CREATE TABLE "client_order" -----------------------------
-- CREATE TABLE "client_order" ---------------------------------
CREATE TABLE `client_order` ( 
	`id` Int( 255 ) AUTO_INCREMENT NOT NULL,
	`client` Int( 255 ) NOT NULL,
	PRIMARY KEY ( `id` ) )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = InnoDB
AUTO_INCREMENT = 5;
-- -------------------------------------------------------------
-- ---------------------------------------------------------


-- Dump data of "clients" ----------------------------------
INSERT INTO `clients`(`id`,`name`) VALUES ( '1', 'Apple' );
INSERT INTO `clients`(`id`,`name`) VALUES ( '2', 'Unilever' );
INSERT INTO `clients`(`id`,`name`) VALUES ( '3', 'Nike' );
INSERT INTO `clients`(`id`,`name`) VALUES ( '4', 'Ford' );
INSERT INTO `clients`(`id`,`name`) VALUES ( '5', 'Default' );
-- ---------------------------------------------------------


-- Dump data of "order_products" ---------------------------
-- ---------------------------------------------------------


-- Dump data of "products" ---------------------------------
INSERT INTO `products`(`id`,`name`,`price`) VALUES ( '1', 'Classic', '269.99' );
INSERT INTO `products`(`id`,`name`,`price`) VALUES ( '2', 'Standout', '322.99' );
INSERT INTO `products`(`id`,`name`,`price`) VALUES ( '3', 'Premium', '394.99' );
-- ---------------------------------------------------------


-- Dump data of "rules" ------------------------------------
INSERT INTO `rules`(`id`,`client`,`prefix`,`description`,`param`) VALUES ( '1', '3', 'QUANTITY_DISCOUNT', 'Gets a discount on Premium Ads where 4 or more are purchased. The price drops to $379.99 per ad', '{"value":379.99, "product": 3, "amount": 4}' );
INSERT INTO `rules`(`id`,`client`,`prefix`,`description`,`param`) VALUES ( '2', '1', 'DISCOUNT', 'Gets a discount on Standout Ads where the price drops to $299.pp per ad', '{"value": 299.99, "product": 2}' );
INSERT INTO `rules`(`id`,`client`,`prefix`,`description`,`param`) VALUES ( '3', '2', 'TAKE_MORE_PAY_LESS', 'Gets a for 3 for 2 deal on Classic Ads', '{"take": 3, "free": 1, "product": 1}' );
INSERT INTO `rules`(`id`,`client`,`prefix`,`description`,`param`) VALUES ( '4', '4', 'TAKE_MORE_PAY_LESS', 'Gets a 5 for 4 deal on Classic Ads', '{"take": 5, "free": 2, "product": 1}' );
INSERT INTO `rules`(`id`,`client`,`prefix`,`description`,`param`) VALUES ( '5', '4', 'DISCOUNT', 'Gets a discount on Standout Ads where the price drops to $309.99 per ad', '{"value": 309.99, "product": 2}' );
INSERT INTO `rules`(`id`,`client`,`prefix`,`description`,`param`) VALUES ( '6', '4', 'QUANTITY_DISCOUNT', 'Gets a discount on Premium Ads when 3 or more are purchased. The price drops to $389.99 per ad', '{"value": 389.99, "product": 3, "amount": 4}' );
-- ---------------------------------------------------------


-- Dump data of "client_order" -----------------------------
-- ---------------------------------------------------------


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
-- ---------------------------------------------------------


