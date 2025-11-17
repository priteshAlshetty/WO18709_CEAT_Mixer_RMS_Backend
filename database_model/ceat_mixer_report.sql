-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 17, 2025 at 08:22 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `ceat_mixer_report`
--
CREATE DATABASE IF NOT EXISTS `ceat_mixer_report` DEFAULT CHARACTER SET swe7 COLLATE swe7_swedish_ci;
USE `ceat_mixer_report`;

-- --------------------------------------------------------

--
-- Table structure for table `report_alarm`
--

DROP TABLE IF EXISTS `report_alarm`;
CREATE TABLE IF NOT EXISTS `report_alarm` (
  `DTTM` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `recipe_id` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `batch_no` int NOT NULL,
  `sr_no` int DEFAULT NULL,
  `alarm_text` varchar(300) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  PRIMARY KEY (`DTTM`,`recipe_id`,`batch_no`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `report_batch_details`
--

DROP TABLE IF EXISTS `report_batch_details`;
CREATE TABLE IF NOT EXISTS `report_batch_details` (
  `DTTM` datetime NOT NULL,
  `recipe_id` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL DEFAULT '0',
  `serial_no` int NOT NULL,
  `shift` varchar(10) DEFAULT 'A',
  `date_stamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_name` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  `batch_no` int NOT NULL,
  `set_batch` int NOT NULL,
  `dis_time` int NOT NULL,
  `space_time` int NOT NULL,
  `used_time` int NOT NULL,
  `dis_temp` float NOT NULL,
  `dis_energy` float NOT NULL,
  `dis_power` float NOT NULL,
  `work_type` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `mode` varchar(10) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  PRIMARY KEY (`serial_no`,`recipe_id`,`batch_no`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `report_cleanout`
--

DROP TABLE IF EXISTS `report_cleanout`;
CREATE TABLE IF NOT EXISTS `report_cleanout` (
  `DTTM` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `shift` varchar(10) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `recipe_id` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `batch_no` int NOT NULL,
  `mat_name` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `material_wt` float NOT NULL,
  `batch_wt` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `report_material_log`
--

DROP TABLE IF EXISTS `report_material_log`;
CREATE TABLE IF NOT EXISTS `report_material_log` (
  `DTTM` datetime NOT NULL,
  `recipe_id` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `serial_no` int NOT NULL,
  `batch_no` int NOT NULL,
  `material_code` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `material_name` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `material_type` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  `set_wt` float NOT NULL,
  `act_wt` float NOT NULL,
  `tol` float NOT NULL,
  PRIMARY KEY (`recipe_id`,`serial_no`,`batch_no`,`material_code`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `report_mixing_details`
--

DROP TABLE IF EXISTS `report_mixing_details`;
CREATE TABLE IF NOT EXISTS `report_mixing_details` (
  `DTTM` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `recipe_id` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `batch_no` int NOT NULL,
  `serial_no` int NOT NULL,
  `recipe_seq` varchar(100) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  `mode` varchar(60) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT '  ',
  `time_set` int NOT NULL DEFAULT '0',
  `time_act` int NOT NULL DEFAULT '0',
  `temp_set` float NOT NULL DEFAULT '0',
  `temp_act` float NOT NULL DEFAULT '0',
  `kw_set` float NOT NULL DEFAULT '0',
  `kw_act` float NOT NULL DEFAULT '0',
  `kwh_set` float NOT NULL DEFAULT '0',
  `kwh_act` float NOT NULL DEFAULT '0',
  `press_set` float NOT NULL DEFAULT '0',
  `press_act` float NOT NULL DEFAULT '0',
  `rpm_set` float NOT NULL DEFAULT '0',
  `rpm_act` float NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `report_shift_plan`
--

DROP TABLE IF EXISTS `report_shift_plan`;
CREATE TABLE IF NOT EXISTS `report_shift_plan` (
  `DTTM` datetime NOT NULL,
  `recipe_id` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `set_batch` int NOT NULL,
  `act_batch` int NOT NULL,
  `shift` varchar(10) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=swe7;
COMMIT;
