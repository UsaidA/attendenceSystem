CREATE TABLE `attendence`.`registration_te` (
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `accessControl` TINYINT NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `emailInTeacherReg`
    FOREIGN KEY (`email`)
    REFERENCES `attendence`.`teachers` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
