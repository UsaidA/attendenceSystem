const sql = require("./dbconnection");

const Teacher = function (student) {
  this.firstName = student.firstName;
  this.lastName = student.lastName;
  this.email = student.email;
  this.teacherID = student.teacherID;
  this.courseID = student.courseID;
  this.dateStarted = student.dateStarted;
};

Teacher.findByEmail = (email, result) => {
    sql.query(`SELECT * FROM attendence.teachers WHERE email = '${email}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found teacher: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found student with the id
      result({ kind: "not_found" }, null);
    });
  };


module.exports = Teacher;
