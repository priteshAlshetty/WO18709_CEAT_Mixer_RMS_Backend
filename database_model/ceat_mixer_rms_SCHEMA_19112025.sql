-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 19, 2025 at 07:34 AM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ceat_mixer_rms`
--
CREATE DATABASE IF NOT EXISTS `ceat_mixer_rms` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `ceat_mixer_rms`;

-- --------------------------------------------------------

--
-- Table structure for table `api_data`
--

DROP TABLE IF EXISTS `api_data`;
CREATE TABLE IF NOT EXISTS `api_data` (
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mixer_id` varchar(50) NOT NULL,
  `conveyor_feedback` int NOT NULL,
  `current_recipe` varchar(50) NOT NULL,
  `order_id` varchar(25) NOT NULL,
  PRIMARY KEY (`mixer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `batch_counter`
--

DROP TABLE IF EXISTS `batch_counter`;
CREATE TABLE IF NOT EXISTS `batch_counter` (
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `conveyer_feedback`
--

DROP TABLE IF EXISTS `conveyer_feedback`;
CREATE TABLE IF NOT EXISTS `conveyer_feedback` (
  `field` varchar(50) NOT NULL,
  `mixer_id` varchar(50) NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`field`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `current_recipe`
--

DROP TABLE IF EXISTS `current_recipe`;
CREATE TABLE IF NOT EXISTS `current_recipe` (
  `mixer_id` varchar(50) NOT NULL,
  `recipe_id` varchar(50) NOT NULL DEFAULT 'DUMMY-RECIPE',
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`mixer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `material_manager`
--

DROP TABLE IF EXISTS `material_manager`;
CREATE TABLE IF NOT EXISTS `material_manager` (
  `material_code` varchar(100) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `material_name` varchar(100) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `material_type` varchar(100) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `using_status` varchar(100) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  `BinID` int DEFAULT NULL,
  `UserName` varchar(100) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`material_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mixerdata`
--

DROP TABLE IF EXISTS `mixerdata`;
CREATE TABLE IF NOT EXISTS `mixerdata` (
  `DateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `Order_ID` varchar(50) NOT NULL DEFAULT '0',
  `Machine_ID` varchar(50) NOT NULL DEFAULT '0',
  `OK_flag` tinyint(1) NOT NULL DEFAULT '0',
  `shift` varchar(20) NOT NULL DEFAULT '0',
  `Batch_ID_Unique` varchar(50) NOT NULL DEFAULT '0',
  `Compound_batch_count` varchar(50) NOT NULL DEFAULT '0',
  `RECIPE_ID` varchar(50) NOT NULL DEFAULT '0',
  `Machine_no` varchar(50) NOT NULL DEFAULT 'MIX001',
  `Mixing_time` float NOT NULL DEFAULT '0',
  `silica_code_1` varchar(50) DEFAULT '0',
  `silica_weight_1` float DEFAULT '0',
  `silica_code_2` varchar(100) DEFAULT '0',
  `silica_weight_2` float DEFAULT '0',
  `silica_code_3` varchar(50) DEFAULT '0',
  `silica_weight_3` float DEFAULT '0',
  `silica_code_4` varchar(50) DEFAULT '0',
  `silica_weight_4` float DEFAULT '0',
  `silica_code_5` varchar(50) DEFAULT '0',
  `silica_weight_5` float DEFAULT '0',
  `silica_code_6` varchar(50) DEFAULT '0',
  `silica_weight_6` float DEFAULT '0',
  `Carbon_code_1` varchar(50) DEFAULT '0',
  `Carbon_weight_1` float DEFAULT '0',
  `Carbon_code_2` varchar(50) DEFAULT '0',
  `Carbon_weight_2` float DEFAULT '0',
  `Carbon_code_3` varchar(50) DEFAULT '0',
  `Carbon_weight_3` float DEFAULT '0',
  `Carbon_code_4` varchar(50) DEFAULT '0',
  `Carbon_weight_4` float DEFAULT '0',
  `Carbon_code_5` varchar(50) DEFAULT '0',
  `Carbon_weight_5` float DEFAULT '0',
  `Carbon_code_6` varchar(50) DEFAULT '0',
  `Carbon_weight_6` float DEFAULT '0',
  `Carbon_code_7` varchar(50) DEFAULT '0',
  `Carbon_weight_7` float DEFAULT '0',
  `Oil_code_1` varchar(50) DEFAULT '0',
  `Oil_weight_1` float DEFAULT '0',
  `Oil_code_2` varchar(50) DEFAULT '0',
  `Oil_weight_2` float DEFAULT '0',
  `Oil_code_3` varchar(50) DEFAULT '0',
  `Oil_weight_3` float DEFAULT '0',
  `Oil_code_4` varchar(50) DEFAULT '0',
  `Oil_weight_4` float DEFAULT '0',
  `Oil_code_5` varchar(50) DEFAULT '0',
  `Oil_weight_5` float DEFAULT '0',
  `Oil_code_6` varchar(50) DEFAULT '0',
  `Oil_weight_6` float DEFAULT '0',
  `Polymer_weight_total` decimal(10,2) DEFAULT NULL,
  `Polymer_Chemical_code_1` varchar(50) DEFAULT '0',
  `Polymer_Chemical_weight_1` float DEFAULT '0',
  `Polymer_Chemical_code_2` varchar(50) DEFAULT '0',
  `Polymer_Chemical_weight_2` float DEFAULT '0',
  `Polymer_Chemical_code_3` varchar(50) DEFAULT '0',
  `Polymer_Chemical_weight_3` float DEFAULT '0',
  `Polymer_Chemical_code_4` varchar(50) DEFAULT '0',
  `Polymer_Chemical_weight_4` float DEFAULT '0',
  `Polymer_Chemical_code_5` varchar(50) DEFAULT '0',
  `Polymer_Chemical_weight_5` float DEFAULT '0',
  `Polymer_Chemical_code_6` varchar(50) DEFAULT '0',
  `Polymer_Chemical_weight_6` float DEFAULT '0',
  `Polymer_Chemical_code_7` varchar(50) DEFAULT '0',
  `Polymer_Chemical_weight_7` float DEFAULT '0',
  `Polymer_Chemical_code_8` varchar(50) DEFAULT '0',
  `Polymer_Chemical_weight_8` float DEFAULT '0',
  `Polymer_Chemical_code_9` varchar(50) DEFAULT '0',
  `Polymer_Chemical_weight_9` float DEFAULT '0',
  `Polymer_Chemical_code_10` varchar(50) DEFAULT '0',
  `Polymer_Chemical_weight_10` float DEFAULT '0',
  `Delayed_Chemical_code_1` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT '0',
  `Delayed_Chemical_weight_1` float DEFAULT '0',
  `Delayed_Chemical_code_2` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT '0',
  `Delayed_Chemical_weight_2` float DEFAULT '0',
  `Delayed_Chemical_code_3` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT '0',
  `Delayed_Chemical_weight_3` float DEFAULT '0',
  `Delayed_Chemical_code_4` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT '0',
  `Delayed_Chemical_weight_4` float DEFAULT '0',
  `Delayed_Chemical_code_5` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT '0',
  `Delayed_Chemical_weight_5` float DEFAULT '0',
  `Delayed_Chemical_code_6` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT '0',
  `Delayed_Chemical_weight_6` float DEFAULT '0',
  `Total_weight` float NOT NULL DEFAULT '0',
  `Alarm_Flag` tinyint(1) NOT NULL DEFAULT '0',
  `Alarm` varchar(100) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

--
-- Triggers `mixerdata`
--
DROP TRIGGER IF EXISTS `before_insert_batch`;
DELIMITER $$
CREATE TRIGGER `before_insert_batch` BEFORE INSERT ON `mixerdata` FOR EACH ROW BEGIN
    DECLARE new_id INT;

    -- Insert a row in batch_counter to get an auto-incremented ID
    INSERT INTO batch_counter VALUES (NULL);
    SET new_id = LAST_INSERT_ID();

    -- Format: BATCH0001, BATCH0002, etc.
    SET NEW.Batch_ID_Unique = CONCAT('BATCH', LPAD(new_id, 4, '0'));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `pmt_act`
--

DROP TABLE IF EXISTS `pmt_act`;
CREATE TABLE IF NOT EXISTS `pmt_act` (
  `act_code` int NOT NULL,
  `act_addr` int NOT NULL,
  `act_name` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `act_memo` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_history`
--

DROP TABLE IF EXISTS `recipe_history`;
CREATE TABLE IF NOT EXISTS `recipe_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` varchar(50) NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(50) NOT NULL,
  `data` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_mixing`
--

DROP TABLE IF EXISTS `recipe_mixing`;
CREATE TABLE IF NOT EXISTS `recipe_mixing` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` varchar(100) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL COMMENT 'recipe id ',
  `mix_seq_no` int NOT NULL COMMENT 'mixing sequence step number max is 30',
  `mix_condition` varchar(100) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL COMMENT 'condition for that step , any one from standard 10 conditions',
  `mix_time` float DEFAULT NULL,
  `mix_temp` float DEFAULT NULL,
  `mix_power` float DEFAULT NULL,
  `mix_energy` float DEFAULT NULL,
  `mix_action` varchar(100) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL COMMENT 'action for that step',
  `mix_pressure` float DEFAULT NULL,
  `mix_speed` float DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `unique_recipeid_mixseq` (`recipe_id`,`mix_seq_no`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_weighing`
--

DROP TABLE IF EXISTS `recipe_weighing`;
CREATE TABLE IF NOT EXISTS `recipe_weighing` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `recipe_id` varchar(30) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `recipe_name` varchar(50) DEFAULT NULL,
  `MaxTempOfFeed` varchar(50) DEFAULT NULL,
  `MaxTimeOvertempDischarge` varchar(50) DEFAULT NULL,
  `MinTimeOvertempDischarge` varchar(50) DEFAULT NULL,
  `TempOvertempDischarg` varchar(50) DEFAULT NULL,
  `CBReclaim` varchar(50) DEFAULT NULL,
  `TimeOfCBReclaim` varchar(50) DEFAULT NULL,
  `ModifyTime` varchar(50) DEFAULT NULL,
  `UsingStatus` varchar(50) DEFAULT NULL,
  `Remark` varchar(50) DEFAULT NULL,
  `UseThreeTMP` varchar(50) DEFAULT NULL,
  `DischargeTEMP_Max` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  `DischargeTEMP_Min` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  `DischargeTIME_Max` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  `DischargeTIME_Min` varchar(50) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  `OverEnergy` varchar(50) DEFAULT NULL,
  `TotalRubTolerance` varchar(50) DEFAULT NULL,
  `RotorTMP` varchar(50) DEFAULT NULL,
  `DischargeDoorTMP` varchar(50) DEFAULT NULL,
  `MixRoomTMP` varchar(50) DEFAULT NULL,
  `RotorTMPMinTol` varchar(50) DEFAULT NULL,
  `RotorTMPMaxTol` varchar(50) DEFAULT NULL,
  `DischargeDoorTMPMinTol` varchar(50) DEFAULT NULL,
  `DischargeDoorTMPMaxTol` varchar(50) DEFAULT NULL,
  `MixRoomTMPMinTol` varchar(50) DEFAULT NULL,
  `MixRoomTMPMaxTol` varchar(50) DEFAULT NULL,
  `IsActivate` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_weight_cb`
--

DROP TABLE IF EXISTS `recipe_weight_cb`;
CREATE TABLE IF NOT EXISTS `recipe_weight_cb` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `CB_index` int NOT NULL DEFAULT '0',
  `Act` varchar(30) DEFAULT NULL,
  `recipe_id` varchar(30) DEFAULT NULL,
  `CB_materialName` varchar(30) NOT NULL,
  `CB_materialCode` varchar(20) NOT NULL,
  `CB_set` float NOT NULL DEFAULT '0',
  `CB_tol` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_weight_chemical_pd`
--

DROP TABLE IF EXISTS `recipe_weight_chemical_pd`;
CREATE TABLE IF NOT EXISTS `recipe_weight_chemical_pd` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `PD_index` int NOT NULL DEFAULT '0',
  `Act` varchar(30) NOT NULL,
  `recipe_id` varchar(30) DEFAULT NULL,
  `PD_materialName` varchar(30) NOT NULL,
  `PD_materialCode` varchar(20) NOT NULL,
  `PD_set` float NOT NULL DEFAULT '0',
  `PD_tol` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_weight_filler`
--

DROP TABLE IF EXISTS `recipe_weight_filler`;
CREATE TABLE IF NOT EXISTS `recipe_weight_filler` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `FL_index` int NOT NULL DEFAULT '0',
  `Act` varchar(30) DEFAULT NULL,
  `recipe_id` varchar(30) DEFAULT NULL,
  `FL_materialName` varchar(30) NOT NULL,
  `FL_materialCode` varchar(20) NOT NULL,
  `FL_set` float NOT NULL DEFAULT '0',
  `FL_tol` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_weight_oil_a`
--

DROP TABLE IF EXISTS `recipe_weight_oil_a`;
CREATE TABLE IF NOT EXISTS `recipe_weight_oil_a` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Act` varchar(30) DEFAULT NULL,
  `recipe_id` varchar(30) DEFAULT NULL,
  `OIL_A_index` int NOT NULL DEFAULT '0',
  `OIL_A_materialName` varchar(30) NOT NULL,
  `OIL_A_materialCode` varchar(20) NOT NULL,
  `OIL_A_set` float NOT NULL DEFAULT '0',
  `OIL_A_tol` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_weight_oil_b`
--

DROP TABLE IF EXISTS `recipe_weight_oil_b`;
CREATE TABLE IF NOT EXISTS `recipe_weight_oil_b` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Act` varchar(30) DEFAULT NULL,
  `recipe_id` varchar(30) DEFAULT NULL,
  `OIL_B_index` int NOT NULL DEFAULT '0',
  `OIL_B_materialName` varchar(30) NOT NULL,
  `OIL_B_materialCode` varchar(20) NOT NULL,
  `OIL_B_set` float NOT NULL DEFAULT '0',
  `OIL_B_tol` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_weight_poly`
--

DROP TABLE IF EXISTS `recipe_weight_poly`;
CREATE TABLE IF NOT EXISTS `recipe_weight_poly` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `POLY_index` int NOT NULL DEFAULT '0',
  `recipe_id` varchar(30) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  `POLY_materialName` varchar(30) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `sheet_filter` varchar(30) CHARACTER SET swe7 COLLATE swe7_swedish_ci DEFAULT NULL,
  `POLY_materialCode` varchar(20) NOT NULL,
  `POLY_set` float NOT NULL DEFAULT '0',
  `POLY_tol` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- --------------------------------------------------------

--
-- Table structure for table `recipe_weight_silica`
--

DROP TABLE IF EXISTS `recipe_weight_silica`;
CREATE TABLE IF NOT EXISTS `recipe_weight_silica` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Act` varchar(30) DEFAULT NULL,
  `recipe_id` varchar(30) DEFAULT NULL,
  `SI_index` int NOT NULL DEFAULT '0',
  `SI_materialName` varchar(30) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `SI_materialCode` varchar(20) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL,
  `SI_set` float NOT NULL DEFAULT '0',
  `SI_tol` float NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
