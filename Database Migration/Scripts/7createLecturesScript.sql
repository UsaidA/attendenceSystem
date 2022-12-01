CREATE TABLE `attendence`.`lectures` (
  `lectureID` INT NOT NULL AUTO_INCREMENT,
  `lectureStart` DATETIME NOT NULL,
  `lectureEnd` DATETIME NOT NULL,
  `moduleID` INT NOT NULL,
  PRIMARY KEY (`lectureID`),
  INDEX `moduleIDinLectures_idx` (`moduleID` ASC) VISIBLE,
  CONSTRAINT `moduleIDinLectures`
    FOREIGN KEY (`moduleID`)
    REFERENCES `attendence`.`modules` (`moduleId`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION);
