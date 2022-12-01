CREATE TABLE `attendence`.`student` (
  `studentID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `teacherID` INT NOT NULL,
  `courseID` INT NOT NULL,
  `groupID` INT NOT NULL,
  `dateStarted` DATETIME NOT NULL,
  PRIMARY KEY (`studentID`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `teacherIDinStudent_idx` (`teacherID` ASC) VISIBLE,
  INDEX `groupIDinStudent_idx` (`groupID` ASC) VISIBLE,
  INDEX `courseIDinStudent_idx` (`courseID` ASC) VISIBLE,
  CONSTRAINT `teacherIDinStudent`
    FOREIGN KEY (`teacherID`)
    REFERENCES `attendence`.`teachers` (`teacherID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `courseIDinStudent`
    FOREIGN KEY (`courseID`)
    REFERENCES `attendence`.`courses` (`courseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `groupIDinStudent`
    FOREIGN KEY (`groupID`)
    REFERENCES `attendence`.`groups` (`groupID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);