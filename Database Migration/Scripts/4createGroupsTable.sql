CREATE TABLE `attendence`.`groups` (
  `groupID` INT NOT NULL AUTO_INCREMENT,
  `courseID` INT NOT NULL,
  PRIMARY KEY (`groupID`),
  INDEX `courseIDinGroups_idx` (`courseID` ASC) VISIBLE,
  CONSTRAINT `courseIDinGroups`
    FOREIGN KEY (`courseID`)
    REFERENCES `attendence`.`courses` (`courseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
