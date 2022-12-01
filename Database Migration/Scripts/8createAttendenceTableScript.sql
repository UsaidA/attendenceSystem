CREATE TABLE `attendence`.`attendences` (
  `attendenceID` INT NOT NULL AUTO_INCREMENT,
  `studentID` INT NOT NULL,
  `lectureID` INT NOT NULL,
  `hasAttended` TINYINT NOT NULL,
  PRIMARY KEY (`attendenceID`),
  UNIQUE INDEX `lectureID_UNIQUE` (`lectureID` ASC) VISIBLE,
  INDEX `studentIDinAttendences_idx` (`studentID` ASC) VISIBLE,
  CONSTRAINT `studentIDinAttendences`
    FOREIGN KEY (`studentID`)
    REFERENCES `attendence`.`student` (`studentID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `lectureIDinAttendences`
    FOREIGN KEY (`lectureID`)
    REFERENCES `attendence`.`lectures` (`lectureID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
