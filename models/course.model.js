const sql = require("./dbconnection");

const Course = function (course) {
this.courseID = course.courseID;
 this.courseName = course.courseName;

};


Course.getCourseID = (title, result) => {
    let query = `SELECT * FROM attendence.courses WHERE name = '${courseName}'`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("courseID singular: ", res);
      result(null, res);
    });
  };

  Course.getAllCourseID = (result) => {
    let query = `SELECT courseID FROM attendence.courses;`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      
      
      //console.log("courseIDs: ", res);
      result(null, res);
    });
  };


  Course.getGroupIDforCourses = (courseID, result) => {
    let query = `SELECT groupID FROM attendence.groups WHERE courseID ='${courseID}';`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      
      
     // console.log("groupIDs: ", res);
      result(null, res);
    });
  };

  Course.getGroups = (result) => {
    let query = `SELECT * FROM attendence.groups;`;
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      
      
     // console.log("groupIDs: ", res);
      result(null, res);
    });
  };


  
  module.exports = Course;