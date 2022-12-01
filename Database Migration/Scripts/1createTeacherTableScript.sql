CREATE TABLE `attendence`.`teachers` (
  `teacherID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `dateStarted` DATETIME NOT NULL,
  PRIMARY KEY (`teacherID`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

