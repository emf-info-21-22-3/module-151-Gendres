-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema semaphor151
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema semaphor151
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `semaphor151` DEFAULT CHARACTER SET utf8 ;
USE `semaphor151` ;

-- -----------------------------------------------------
-- Table `semaphor151`.`t_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semaphor151`.`t_user` (
  `username` VARCHAR(20) NOT NULL,
  `password_hash` VARCHAR(32) NOT NULL,
  `isAdmin` TINYINT NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semaphor151`.`t_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semaphor151`.`t_room` (
  `room_id` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`room_id`),
  UNIQUE INDEX `idt_room_UNIQUE` (`room_id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `semaphor151`.`t_message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `semaphor151`.`t_message` (
  `pk_message` INT NOT NULL,
  `texte` VARCHAR(160) NOT NULL,
  `dateEnvoi` DATETIME NOT NULL,
  `fk_room` VARCHAR(20) NOT NULL,
  `fk_user` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`pk_message`),
  UNIQUE INDEX `idt_message_UNIQUE` (`pk_message` ASC) VISIBLE,
  INDEX `fk_t_message_t_room_idx` (`fk_room` ASC) VISIBLE,
  INDEX `fk_t_message_t_user1_idx` (`fk_user` ASC) VISIBLE,
  CONSTRAINT `fk_t_message_t_room`
    FOREIGN KEY (`fk_room`)
    REFERENCES `semaphor151`.`t_room` (`room_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_t_message_t_user1`
    FOREIGN KEY (`fk_user`)
    REFERENCES `semaphor151`.`t_user` (`username`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
