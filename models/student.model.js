const sql = require("./dbconnection");

const Student = function (student) {
  this.firstName = student.firstName;
  this.lastName = student.lastName;
  this.email = student.email;
  this.teacherID = student.teacherID;
  this.courseID = student.courseID;
  this.dateStarted = student.dateStarted;
};

Student.getAll = (title, result) => {
  let query = "SELECT * FROM attendence.student";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("students: ", res);
    result(null, res);
  });
};

Student.create = (newStudent, result) => {
  sql.query("INSERT INTO attendence.student SET ?", newStudent, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created tutorial: ", { id: res.insertId, ...newStudent });
    result(null, { id: res.insertId, ...newStudent });
  });
};

Student.updateById = (id, student, result) => {
   
  sql.query(
    "UPDATE attendence.student SET firstName = ?, lastName = ?, email = ?, teacherID = ?, courseID = ?, dateStarted = ? WHERE studentID = ?",
    [
      student.firstName,
      student.lastName,
      student.email,
      student.teacherID,
      student.courseID,
      student.dateStarted,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found student with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated student: ", { id: id, ...student });
      result(null, { id: id, ...student });
    }
  );
};

Student.remove = (id, result) => {
  sql.query("DELETE FROM attendence.student WHERE studentId = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Student with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted student with id: ", id);
    result(null, res);
  });
};

Student.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM attendence.student WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found student: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found student with the id
    result({ kind: "not_found" }, null);
  });
};

Student.getLectureID= (studentID, result) => { // get lectureID for the lectures you've missed 

  
  sql.query(`select lectureID from lectures where moduleID in (select moduleID from modules where courseID in (select courseID from student where studentID = '${studentID}' )) AND checked = '0' AND lectureEnd < current_time();`, (err, res) => {
    if (err) {
      
      console.log("error: ", err);
      result(err, null);
      return;
    }

    
    if (result.length) {
     
      //console.log("found lectureID: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found student with the id
    result({ kind: "not_found" }, null);
  });
};

Student.getAllfromGroup = (groupID, result) => {
  sql.query(`select studentID FROM attendence.student WHERE groupID = '${groupID}';`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found IDs: ", res);
      result(null, res);
      return;
    }

    // not found student with the id
    result({ kind: "not_found" }, null);
  });
};



module.exports = Student;
