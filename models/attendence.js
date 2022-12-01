const sql = require("./dbconnection");


const Attendence = function (attendence) {

this.attendenceID = attendence.attendenceID
 this.studentID = attendence.studentID;
 this.lectureID = attendence.lectureID;
 this.hasAttended = attendence.hasAttended;
 this.checked = attendence.checked;

};

Attendence.updateById = (id, attendence, result) => {
   
  sql.query(
    "UPDATE attendence.attendences SET hasAttended = ? WHERE attendenceID = ?",
    [
      attendence.hasAttended,
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

      console.log("updated student: ", { id: id, ...attendence });
      result(null, { ...attendence });
    }
  );
};


Attendence.getAllAttendences = ( result) => {
  let query = `SELECT * FROM attendence.attendences`;
  sql.query(query, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
      }
      result(null, res);
  });
  };

  Attendence.getStudentAttendence = (studentId, result) => {
      let query = `SELECT * FROM attendence.attendences WHERE studentID = '${studentId}'`;
      sql.query(query, (err, res) => {
          if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
          }
          result(null, res);
      });
      };


  Attendence.attend = (attendence, result) => {
      sql.query("INSERT INTO attendence.attendences SET ?", attendence, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
    
        console.log("created attendence: ", { id: res.insertId, ...attendence });
        result(null, { id: res.insertId, ...attendence });
      });
    };


      //get all lectures from end time -- from the last ticked

      //get all students who should have those lectures-- one lecture at a time, get module id, get course id, see which students are on that course
      
      //go to attendence table- compare two lists, and input remaining students as not attended 
      


    Attendence.notAttended = ( result) => {
        sql.query("call getNotAttendedStudents()", (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          
          result(null, res)
          
        
        });


      };

      Attendence.appendNotAttended = (newAttendence, result) => {
        
        sql.query("INSERT INTO attendence.attendences SET ?", newAttendence, (err, res) => {
          if (err) {
            
            console.log("error: ", err);
            result(err, null);
            return;
          }
          
          sql.query(`UPDATE attendence.lectures SET checked = '1' WHERE lectureID = '${newAttendence.lectureID}';`, (error, res) => {

            if (error) {
                
                console.log("error: ", error);
                result(error, null);
                return;
              }

          });

        });
      };

       Attendence.updateAttendCode = (randomCode, result) => {

        sql.query(`UPDATE attendence.attendCode SET attendCode = '${randomCode}' WHERE id = '1';`, (err, res) => {
          if (err) {
            
            console.log("error: ", err);
            result(err, null);
            return;
          }

        });

       };


       Attendence.getGroupAttendence = (result) => {

        sql.query(`SELECT attendCode FROM attendence.attendcode WHERE id ='1';`, (err, res) => {
          if (err) {
            
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log(res, " attend code model")
          result(null, res[0]);

        });


       };


       Attendence.getAttendCode = (result) => {

        sql.query(`SELECT attendCode FROM attendence.attendcode WHERE id ='1';`, (err, res) => {
          if (err) {
            
            console.log("error: ", err);
            result(err, null);
            return;
          }
          console.log(res, " attend code model")
          result(null, res[0]);

        });

       };

      Attendence.getAllFromGroup= (groupID, result) =>{

        sql.query(`select hasAttended FROM attendence.attendences WHERE studentID in(SELECT studentID from attendence.student where groupID = '${groupID}');`, (err, res) => {
          if (err) {
            
            console.log("error: ", err);
            result(err, null);
            return;
          }
         
          result(null, res);

        });

      }
      


    
module.exports = Attendence;