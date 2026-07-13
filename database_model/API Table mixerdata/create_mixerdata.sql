-- for mixer1
USE `ceat_mixer_report`;
START TRANSACTION;
DROP TABLE IF EXISTS `mixerdata`;
CREATE TABLE IF NOT EXISTS `mixerdata` (
  `DateTime` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Date and time of batch record',
  `Order_ID` varchar(50) NOT NULL DEFAULT '0' COMMENT 'order id , set from api ',
  `Machine_ID` varchar(50) NOT NULL DEFAULT '0' COMMENT 'mixer number', 
  `OK_flag` tinyint(1) NOT NULL DEFAULT '1' COMMENT 'conveyer ok flag at batch start',
  `shift` varchar(20) NOT NULL DEFAULT '0' COMMENT 'Shift logic to be implemented',
  `Batch_ID_Unique` varchar(50) NOT NULL COMMENT 'Unique identifier for each batch, generate from batch_counter',
  `Compound_batch_count` varchar(100) CHARACTER SET swe7 COLLATE swe7_swedish_ci NOT NULL DEFAULT '0' COMMENT 'batch_no',
  `sr_no` int NOT NULL COMMENT 'Sr_No from PLC',
  `RECIPE_ID` varchar(50) NOT NULL  COMMENT 'Recipe ID',
  `Machine_no` varchar(50) NOT NULL DEFAULT 'MIX001' COMMENT 'mixer number',
  `Mixing_time` float NOT NULL DEFAULT '0' COMMENT 'Mixing time for the batch , from PLC',
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
  `Polymer_weight_total` float DEFAULT 0 COMMENT 'Total weight of polymer used in the batch',
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
  `Total_weight` float NOT NULL DEFAULT '0' COMMENT 'Total weight of the batch',
  `Alarm_Flag` tinyint(1) NOT NULL DEFAULT '0',
  `Alarm` varchar(100) DEFAULT '0',
  `id` bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'Internal database primary key',
  UNIQUE KEY `sr_no` (`sr_no`,`Compound_batch_count`,`RECIPE_ID`),
  UNIQUE KEY `uk_batch_id_unique` (`Batch_ID_Unique`),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=swe7;

-- create batch counter table for unique batch id


DROP TABLE IF EXISTS `batch_counter`;
CREATE TABLE IF NOT EXISTS `batch_counter` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT
        COMMENT 'Auto-generated unique batch counter',

    `DateTime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        COMMENT 'Date and time when batch ID was generated',
    `sr_no` INT NOT NULL,
    `batch_no` INT NOT NULL,
    `recipe_id` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_batch_identity` (
        `sr_no`,
        `batch_no`,
        `recipe_id`
    )

) ENGINE=InnoDB
DEFAULT CHARSET=swe7
COMMENT='Generates unique IDs for mixer batch records';



-- insert carbon data trigger
DELIMITER $$
DROP TRIGGER IF EXISTS `trg_carbon_trial_log_to_mixerdata`$$

CREATE TRIGGER `trg_carbon_trial_log_to_mixerdata`
AFTER INSERT ON `carbon_trial_log`
FOR EACH ROW
BEGIN

    INSERT INTO `mixerdata` (
        
        `Compound_batch_count`,
        `sr_no`,
        `RECIPE_ID`,
        `Carbon_code_1`,
        `Carbon_weight_1`
    )
    VALUES (
        
        NEW.`batch_no`,
        NEW.`serial_no`,
        NEW.`recipe_id`,
        NEW.`material_code`,
        NEW.`act_wt`
    )

    ON DUPLICATE KEY UPDATE
        `Carbon_code_1` = NEW.`material_code`,
        `Carbon_weight_1` = NEW.`act_wt`;

END$$

DELIMITER ;

-- oil data insert trigger
DELIMITER $$

DROP TRIGGER IF EXISTS `trg_oil_trial_log_to_mixerdata`$$

CREATE TRIGGER `trg_oil_trial_log_to_mixerdata`
AFTER INSERT ON `oil_trial_log`
FOR EACH ROW
BEGIN

    INSERT INTO `mixerdata` (
        `Compound_batch_count`,
        `sr_no`,
        `RECIPE_ID`,
        `Oil_code_1`,
        `Oil_weight_1`
    )
    VALUES (
        
        NEW.`batch_no`,
        NEW.`serial_no`,
        NEW.`recipe_id`,
        NEW.`material_code`,
        NEW.`act_wt`
    )

    ON DUPLICATE KEY UPDATE
        `Oil_code_1` = NEW.`material_code`,
        `Oil_weight_1` = NEW.`act_wt`;

END$$

DELIMITER ;



-- fl data insert trigger
DELIMITER $$

DROP TRIGGER IF EXISTS `trg_fl_trial_log_to_mixerdata`$$

CREATE TRIGGER `trg_fl_trial_log_to_mixerdata`
AFTER INSERT ON `fl_trial_log`
FOR EACH ROW
BEGIN

    INSERT INTO `mixerdata` (
        `Compound_batch_count`,
        `sr_no`,
        `RECIPE_ID`,
        `Delayed_Chemical_code_1`,
        `Delayed_Chemical_weight_1`
    )
    VALUES (
        NEW.`batch_no`,
        NEW.`serial_no`,
        NEW.`recipe_id`,
        NEW.`material_code`,
        NEW.`act_wt`
    )

    ON DUPLICATE KEY UPDATE
        `Delayed_Chemical_code_1` = NEW.`material_code`,
        `Delayed_Chemical_weight_1` = NEW.`act_wt`;

END$$

DELIMITER ;

-- poly data insert trigger
DELIMITER $$

DROP TRIGGER IF EXISTS `trg_poly_trial_log_to_mixerdata`$$

CREATE TRIGGER `trg_poly_trial_log_to_mixerdata`
AFTER INSERT ON `poly_trial_log`
FOR EACH ROW
BEGIN

    DECLARE poly_row_count INT DEFAULT 0;

    -- Count polymers inserted for the same batch.
    -- Since this is an AFTER INSERT trigger, the current row is included.
    SELECT COUNT(*)
    INTO poly_row_count
    FROM `poly_trial_log`
    WHERE `recipe_id` = NEW.`recipe_id`
      AND `serial_no` = NEW.`serial_no`
      AND `batch_no` = NEW.`batch_no`;

    -- First polymer: create mixerdata row if required.
    -- Existing batch: update the appropriate polymer slot.
    INSERT INTO `mixerdata` (
        
        `Compound_batch_count`,
        `sr_no`,
        `RECIPE_ID`,

        `Polymer_Chemical_code_1`,
        `Polymer_Chemical_weight_1`,

        `Polymer_Chemical_code_2`,
        `Polymer_Chemical_weight_2`,

        `Polymer_Chemical_code_3`,
        `Polymer_Chemical_weight_3`,

        `Polymer_Chemical_code_4`,
        `Polymer_Chemical_weight_4`,

        `Polymer_Chemical_code_5`,
        `Polymer_Chemical_weight_5`,

        `Polymer_Chemical_code_6`,
        `Polymer_Chemical_weight_6`
    )
    VALUES (
        
        NEW.`batch_no`,
        NEW.`serial_no`,
        NEW.`recipe_id`,

        IF(poly_row_count = 1, NEW.`material_code`, '0'),
        IF(poly_row_count = 1, NEW.`act_wt`, 0),

        IF(poly_row_count = 2, NEW.`material_code`, '0'),
        IF(poly_row_count = 2, NEW.`act_wt`, 0),

        IF(poly_row_count = 3, NEW.`material_code`, '0'),
        IF(poly_row_count = 3, NEW.`act_wt`, 0),

        IF(poly_row_count = 4, NEW.`material_code`, '0'),
        IF(poly_row_count = 4, NEW.`act_wt`, 0),

        IF(poly_row_count = 5, NEW.`material_code`, '0'),
        IF(poly_row_count = 5, NEW.`act_wt`, 0),

        IF(poly_row_count = 6, NEW.`material_code`, '0'),
        IF(poly_row_count = 6, NEW.`act_wt`, 0)
    )

    ON DUPLICATE KEY UPDATE

        `Polymer_Chemical_code_1` =
            IF(poly_row_count = 1,
               NEW.`material_code`,
               `Polymer_Chemical_code_1`),

        `Polymer_Chemical_weight_1` =
            IF(poly_row_count = 1,
               NEW.`act_wt`,
               `Polymer_Chemical_weight_1`),

        `Polymer_Chemical_code_2` =
            IF(poly_row_count = 2,
               NEW.`material_code`,
               `Polymer_Chemical_code_2`),

        `Polymer_Chemical_weight_2` =
            IF(poly_row_count = 2,
               NEW.`act_wt`,
               `Polymer_Chemical_weight_2`),

        `Polymer_Chemical_code_3` =
            IF(poly_row_count = 3,
               NEW.`material_code`,
               `Polymer_Chemical_code_3`),

        `Polymer_Chemical_weight_3` =
            IF(poly_row_count = 3,
               NEW.`act_wt`,
               `Polymer_Chemical_weight_3`),

        `Polymer_Chemical_code_4` =
            IF(poly_row_count = 4,
               NEW.`material_code`,
               `Polymer_Chemical_code_4`),

        `Polymer_Chemical_weight_4` =
            IF(poly_row_count = 4,
               NEW.`act_wt`,
               `Polymer_Chemical_weight_4`),

        `Polymer_Chemical_code_5` =
            IF(poly_row_count = 5,
               NEW.`material_code`,
               `Polymer_Chemical_code_5`),

        `Polymer_Chemical_weight_5` =
            IF(poly_row_count = 5,
               NEW.`act_wt`,
               `Polymer_Chemical_weight_5`),

        `Polymer_Chemical_code_6` =
            IF(poly_row_count = 6,
               NEW.`material_code`,
               `Polymer_Chemical_code_6`),

        `Polymer_Chemical_weight_6` =
            IF(poly_row_count = 6,
               NEW.`act_wt`,
               `Polymer_Chemical_weight_6`);

END$$

DELIMITER ;



-- create a trigger to generate unique batch ID for each new record in mixerdata table, calculate total weight and assign shift based on DateTime

DELIMITER $$

DROP TRIGGER IF EXISTS `trg_mixerdata_insert`$$

CREATE TRIGGER `trg_mixerdata_insert`
BEFORE INSERT ON `mixerdata`
FOR EACH ROW
BEGIN
    DECLARE v_batch_id BIGINT UNSIGNED DEFAULT NULL;
    DECLARE v_order_id VARCHAR(50) DEFAULT '0';

-- Generate a new unique counter

-- check table if id exists
    SELECT MAX(`id`)
INTO v_batch_id
FROM `batch_counter`
WHERE `sr_no` = NEW.`sr_no`
  AND `batch_no` = NEW.`Compound_batch_count`
  AND `recipe_id` = NEW.`RECIPE_ID`;


-- if not exists then generate
IF v_batch_id IS NULL THEN

    INSERT INTO `batch_counter` (
        `sr_no`,
        `batch_no`,
        `recipe_id`
    )
    VALUES (
        NEW.`sr_no`,
        NEW.`Compound_batch_count`,
        NEW.`RECIPE_ID`
    );

    SET v_batch_id = LAST_INSERT_ID();

END IF;

-- Assign generated ID to mixerdata


    SET NEW.`Batch_ID_Unique` =   CONCAT('BATCH', v_batch_id);

-- calculate total weight

    SET NEW.`Total_weight` =

        -- Silica Weights 1 to 6
        COALESCE(NEW.`silica_weight_1`, 0) +
        COALESCE(NEW.`silica_weight_2`, 0) +
        COALESCE(NEW.`silica_weight_3`, 0) +
        COALESCE(NEW.`silica_weight_4`, 0) +
        COALESCE(NEW.`silica_weight_5`, 0) +
        COALESCE(NEW.`silica_weight_6`, 0) +

        -- Carbon Weights 1 to 7
        COALESCE(NEW.`Carbon_weight_1`, 0) +
        COALESCE(NEW.`Carbon_weight_2`, 0) +
        COALESCE(NEW.`Carbon_weight_3`, 0) +
        COALESCE(NEW.`Carbon_weight_4`, 0) +
        COALESCE(NEW.`Carbon_weight_5`, 0) +
        COALESCE(NEW.`Carbon_weight_6`, 0) +
        COALESCE(NEW.`Carbon_weight_7`, 0) +

        -- Oil Weights 1 to 6
        COALESCE(NEW.`Oil_weight_1`, 0) +
        COALESCE(NEW.`Oil_weight_2`, 0) +
        COALESCE(NEW.`Oil_weight_3`, 0) +
        COALESCE(NEW.`Oil_weight_4`, 0) +
        COALESCE(NEW.`Oil_weight_5`, 0) +
        COALESCE(NEW.`Oil_weight_6`, 0) +

        -- Polymer / Chemical Weights 1 to 10
        COALESCE(NEW.`Polymer_Chemical_weight_1`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_2`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_3`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_4`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_5`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_6`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_7`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_8`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_9`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_10`, 0) +

        -- Delayed Chemical Weights 1 to 6
        COALESCE(NEW.`Delayed_Chemical_weight_1`, 0) +
        COALESCE(NEW.`Delayed_Chemical_weight_2`, 0) +
        COALESCE(NEW.`Delayed_Chemical_weight_3`, 0) +
        COALESCE(NEW.`Delayed_Chemical_weight_4`, 0) +
        COALESCE(NEW.`Delayed_Chemical_weight_5`, 0) +
        COALESCE(NEW.`Delayed_Chemical_weight_6`, 0);

-- Shift calculation based on DateTime
IF TIME(NEW.`DateTime`) >= '07:00:00'
   AND TIME(NEW.`DateTime`) < '15:00:00' THEN

    SET NEW.`shift` = 'A';

ELSEIF TIME(NEW.`DateTime`) >= '15:00:00'
   AND TIME(NEW.`DateTime`) < '23:00:00' THEN

    SET NEW.`shift` = 'B';

ELSE

    SET NEW.`shift` = 'C';

END IF;

-- Get order ID
SELECT `order_id`
INTO v_order_id
FROM `ceat_mixer_rms`.`api_data`
WHERE `mixer_id` = 'MIX001'
LIMIT 1;

SET NEW.`Order_ID` = v_order_id;

END$$
DELIMITER ;

-- Mixerdata update trigger to calculate total weight and assign shift based on DateTime
DELIMITER $$

DROP TRIGGER IF EXISTS `trg_mixerdata_update`$$
CREATE TRIGGER `trg_mixerdata_update`
BEFORE UPDATE ON `mixerdata`
FOR EACH ROW
BEGIN

    SET NEW.`Total_weight` =

        -- Silica Weights 1 to 6
        COALESCE(NEW.`silica_weight_1`, 0) +
        COALESCE(NEW.`silica_weight_2`, 0) +
        COALESCE(NEW.`silica_weight_3`, 0) +
        COALESCE(NEW.`silica_weight_4`, 0) +
        COALESCE(NEW.`silica_weight_5`, 0) +
        COALESCE(NEW.`silica_weight_6`, 0) +

        -- Carbon Weights 1 to 7
        COALESCE(NEW.`Carbon_weight_1`, 0) +
        COALESCE(NEW.`Carbon_weight_2`, 0) +
        COALESCE(NEW.`Carbon_weight_3`, 0) +
        COALESCE(NEW.`Carbon_weight_4`, 0) +
        COALESCE(NEW.`Carbon_weight_5`, 0) +
        COALESCE(NEW.`Carbon_weight_6`, 0) +
        COALESCE(NEW.`Carbon_weight_7`, 0) +

        -- Oil Weights 1 to 6
        COALESCE(NEW.`Oil_weight_1`, 0) +
        COALESCE(NEW.`Oil_weight_2`, 0) +
        COALESCE(NEW.`Oil_weight_3`, 0) +
        COALESCE(NEW.`Oil_weight_4`, 0) +
        COALESCE(NEW.`Oil_weight_5`, 0) +
        COALESCE(NEW.`Oil_weight_6`, 0) +

        -- Polymer / Chemical Weights 1 to 10
        COALESCE(NEW.`Polymer_Chemical_weight_1`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_2`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_3`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_4`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_5`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_6`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_7`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_8`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_9`, 0) +
        COALESCE(NEW.`Polymer_Chemical_weight_10`, 0) +

        -- Delayed Chemical Weights 1 to 6
        COALESCE(NEW.`Delayed_Chemical_weight_1`, 0) +
        COALESCE(NEW.`Delayed_Chemical_weight_2`, 0) +
        COALESCE(NEW.`Delayed_Chemical_weight_3`, 0) +
        COALESCE(NEW.`Delayed_Chemical_weight_4`, 0) +
        COALESCE(NEW.`Delayed_Chemical_weight_5`, 0) +
        COALESCE(NEW.`Delayed_Chemical_weight_6`, 0);

-- Shift calculation based on DateTime
IF TIME(NEW.`DateTime`) >= '07:00:00'
   AND TIME(NEW.`DateTime`) < '15:00:00' THEN

    SET NEW.`shift` = 'A';

ELSEIF TIME(NEW.`DateTime`) >= '15:00:00'
   AND TIME(NEW.`DateTime`) < '23:00:00' THEN

    SET NEW.`shift` = 'B';

ELSE

    SET NEW.`shift` = 'C';

END IF;
END$$

DELIMITER ;

ALTER TABLE `mixerdata`
ADD INDEX `idx_datetime_id` (`DateTime`, `id`);

-- operator log table to log operator actions
DROP TABLE IF EXISTS `operator_log`;
CREATE TABLE operator_log(
    `DTTM` dateTime DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `id` INT AUTO_INCREMENT NOT NULL,
    `operator_name` VARCHAR(50) NOT NULL,
    `operator_authorization` VARCHAR(50) DEFAULT 'NA' NOT NULL,
    `action` TEXT ,
    `Description` JSON,
    PRIMARY KEY (id)
    )ENGINE = InnoDB DEFAULT CHARACTER SET swe7;


COMMIT;

