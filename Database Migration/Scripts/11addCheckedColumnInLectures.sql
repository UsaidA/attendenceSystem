ALTER TABLE `attendence`.`lectures` 
ADD COLUMN `checked` TINYINT NULL DEFAULT 0 AFTER `moduleID`;
