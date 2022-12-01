CREATE SCHEMA `attendence` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE `attendence`.`teachers` (
  `teacherID` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `dateStarted` DATETIME NOT NULL,
  PRIMARY KEY (`teacherID`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);


CREATE TABLE `attendence`.`courses` (
  `courseID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`courseID`));

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

CREATE TABLE `attendence`.`attendences` (
  `attendenceID` INT NOT NULL AUTO_INCREMENT,
  `studentID` INT NOT NULL,
  `lectureID` INT NOT NULL,
  `hasAttended` TINYINT NOT NULL,
  PRIMARY KEY (`attendenceID`),
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
	
INSERT INTO `attendence`.`teachers` (`firstName`, `lastName`, `email`, `dateStarted`) VALUES ('edward', 'edward', 'edward@gmail.com', '12.08.2020');
INSERT INTO `attendence`.`teachers` (`firstName`, `lastName`, `email`, `dateStarted`) VALUES ('carlos', 'carlos', 'carlos@gmail.com', '12.09.2021');

INSERT INTO `attendence`.`courses` (`name`) VALUES ('computer science');
INSERT INTO `attendence`.`courses` (`name`) VALUES ('software engineering');

INSERT INTO `attendence`.`modules` (`moduleName`, `yearOfStudy`, `courseID`) VALUES ('concurrent systems', '3', '1');
INSERT INTO `attendence`.`modules` (`moduleName`, `yearOfStudy`, `courseID`) VALUES ('Artificial intelligence', '3', '1');
INSERT INTO `attendence`.`modules` (`moduleName`, `yearOfStudy`, `courseID`) VALUES ('Algo & data struct', '3', '1');
INSERT INTO `attendence`.`modules` (`moduleName`, `yearOfStudy`, `courseID`) VALUES ('Sys Architect', '3', '1');
INSERT INTO `attendence`.`modules` (`moduleName`, `yearOfStudy`, `courseID`) VALUES ('Machine Learning', '3', '1');

INSERT INTO `attendence`.`groups` (`courseID`) VALUES ('1');
INSERT INTO `attendence`.`groups` (`courseID`) VALUES ('1');
INSERT INTO `attendence`.`groups` (`courseID`) VALUES ('1');
INSERT INTO `attendence`.`groups` (`courseID`) VALUES ('2');
INSERT INTO `attendence`.`groups` (`courseID`) VALUES ('2');
INSERT INTO `attendence`.`groups` (`courseID`) VALUES ('2');


INSERT INTO `attendence`.`student` (`firstName`, `lastName`, `email`, `teacherID`, `courseID`, `groupID`, `dateStarted`) VALUES ('usaid', 'ahmed', 'usaid@gmail.com', '1', '1', '1', '08.08.2020');
INSERT INTO `attendence`.`student` (`firstName`, `lastName`, `email`, `teacherID`, `courseID`, `groupID`, `dateStarted`) VALUES ('areej', 'rehman', 'areej@gmail.com', '1', '1', '2', '03.04.2020');
INSERT INTO `attendence`.`student` (`firstName`, `lastName`, `email`, `teacherID`, `courseID`, `groupID`, `dateStarted`) VALUES ('hira', 'rehman', 'hira@gmail.com', '2', '2', '2', '12.04.2018');
INSERT INTO `attendence`.`student` (`firstName`, `lastName`, `email`, `teacherID`, `courseID`, `groupID`, `dateStarted`) VALUES ('uraish', 'ahmed', 'uraish@gmail.com', '1', '2', '3', '12.05.2020');



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

ALTER TABLE `attendence`.`attendences` 
ADD COLUMN `checked` TINYINT NULL DEFAULT 0 AFTER `hasAttended`;

ALTER TABLE `attendence`.`lectures` 
ADD COLUMN `checked` TINYINT NULL DEFAULT 0 AFTER `moduleID`;

CREATE TABLE `attendence`.`attendcode` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `attendCode` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

INSERT INTO `attendence`.`attendcode` (`id`, `attendCode`) VALUES ('1', 'HTA82');

USE `attendence`;
DROP procedure IF EXISTS `getNotAttendedStudents`;

DELIMITER $$
USE `attendence`$$
CREATE PROCEDURE `getNotAttendedStudents` ()
BEGIN
select * from student where courseId in (select courseId from modules where moduleId IN 
(select moduleId from lectures where lectureEnd < current_time() and checked = '0')) 
AND studentId Not in (select studentId from attendences where hasAttended = 1 and checked = 0);

UPDATE attendences
SET checked = 1
WHERE checked = 0;

END;$$

DELIMITER ;

INSERT INTO `attendence`.`lectures` (`lectureStart`, `lectureEnd`, `moduleID`) VALUES ('2022-12-01 12:00:00', '2022-12-01 13:00:00', '2');
INSERT INTO `attendence`.`lectures` (`lectureStart`, `lectureEnd`, `moduleID`) VALUES ('2022-12-02 14:00:00', '2022-12-02 15:00:00', '2');
INSERT INTO `attendence`.`lectures` (`lectureStart`, `lectureEnd`, `moduleID`) VALUES ('2022-12-03 09:00:00', '2022-12-03 10:00:00', '3');
INSERT INTO `attendence`.`lectures` (`lectureStart`, `lectureEnd`, `moduleID`) VALUES ('2022-12-04 11:00:00', '2022-12-04 12:00:00', '4');
INSERT INTO `attendence`.`lectures` (`lectureStart`, `lectureEnd`, `moduleID`) VALUES ('2022-12-05 15:00:00', '2022-12-05 16:00:00', '5');
INSERT INTO `attendence`.`lectures` (`lectureStart`, `lectureEnd`, `moduleID`) VALUES ('2022-12-06 12:00:00', '2022-12-06 14:00:00', '2');










