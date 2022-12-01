INSERT INTO `attendence`.`teachers` (`firstName`, `lastName`, `email`, `dateStarted`) VALUES ('edward', 'edward', 'edward@gmail.com', '12.08.2020');
INSERT INTO `attendence`.`teachers` (`firstName`, `lastName`, `email`, `dateStarted`) VALUES ('carlos', 'carlos', 'carlos@gmail.com', '12.09.2021');

INSERT INTO `attendence`.`courses` (`name`) VALUES ('computer science');
INSERT INTO `attendence`.`courses` (`name`) VALUES ('software engineering');

INSERT INTO `attendence`.`modules` (`moduleName`, `yearOfStudy`, `courseID`) VALUES ('concurrent systems', '3', '1');
INSERT INTO `attendence`.`modules` (`moduleName`, `yearOfStudy`, `courseID`) VALUES ('Artificial intelligence', '3', '1');
INSERT INTO `attendence`.`modules` (`moduleName`, `yearOfStudy`, `courseID`) VALUES ('Algo & data struct', '3', '1');
INSERT INTO `attendence`.`modules` (`moduleName`, `yearOfStudy`, `courseID`) VALUES ('Sys Architect', '3', '1');
INSERT INTO `attendence`.`modules` (`moduleName`, `yearOfStudy`, `courseID`) VALUES ('Machine Learning', '3', '1');

INSERT INTO `attendence`.`student` (`firstName`, `lastName`, `email`, `teacherID`, `courseID`, `groupID`, `dateStarted`) VALUES ('usaid', 'ahmed', 'usaid@gmail.com', '1', '1', '1', '08.08.2020');
INSERT INTO `attendence`.`student` (`firstName`, `lastName`, `email`, `teacherID`, `courseID`, `groupID`, `dateStarted`) VALUES ('areej', 'rehman', 'areej@gmail.com', '1', '1', '2', '03.04.2020');
INSERT INTO `attendence`.`student` (`firstName`, `lastName`, `email`, `teacherID`, `courseID`, `groupID`, `dateStarted`) VALUES ('hira', 'rehman', 'hira@gmail.com', '2', '2', '4', '12.04.2018');
INSERT INTO `attendence`.`student` (`firstName`, `lastName`, `email`, `teacherID`, `courseID`, `groupID`, `dateStarted`) VALUES ('uraish', 'ahmed', 'uraish@gmail.com', '1', '2', '5', '12.05.2020');

