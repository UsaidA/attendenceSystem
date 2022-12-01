CREATE TABLE `attendence`.`registration_st` (
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `accessControl` TINYINT NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `registration_stcol_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `emailInStuReg`
    FOREIGN KEY (`email`)
    REFERENCES `attendence`.`student` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
