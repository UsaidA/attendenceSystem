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

