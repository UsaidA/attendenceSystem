ALTER TABLE `attendence`.`attendences` 
ADD COLUMN `checked` TINYINT NULL DEFAULT 0 AFTER `hasAttended`;
