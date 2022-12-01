CREATE TABLE `attendence`.`modules` (
  `moduleID` INT NOT NULL AUTO_INCREMENT,
  `moduleName` VARCHAR(45) NOT NULL,
  `yearOfStudy` INT NOT NULL,
  `courseID` INT NOT NULL,
  PRIMARY KEY (`moduleID`),
  INDEX `courseIDinModules_idx` (`courseID` ASC) VISIBLE,
  CONSTRAINT `courseIDinModules`
    FOREIGN KEY (`courseID`)
    REFERENCES `attendence`.`courses` (`courseID`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION);
