CREATE TABLE `attendence`.`teachermodulemapping` (
  `tmId` INT NOT NULL AUTO_INCREMENT,
  `teacherId` INT NOT NULL,
  `moduleId` INT NOT NULL,
  PRIMARY KEY (`tmId`),
  INDEX `teacherId_idx` (`teacherId` ASC) VISIBLE,
  INDEX `moduleId_idx` (`moduleId` ASC) VISIBLE,
  CONSTRAINT `teacherId`
    FOREIGN KEY (`teacherId`)
    REFERENCES `attendence`.`teachers` (`teacherID`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION,
  CONSTRAINT `moduleId`
    FOREIGN KEY (`moduleId`)
    REFERENCES `attendence`.`modules` (`moduleId`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION);
