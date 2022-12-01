const sql = require("./dbconnection")
const bcrypt = require('bcrypt');

const Login = function(login){
   
   this.email = login.email;
   this.accessControl = 0
   
   this.password = login.password;
   
}

Login.findByEmailRegTE = (email, result) => { // find registered Teacehrs
    sql.query(`SELECT * FROM attendence.registration_te WHERE email = '${email}'`, (err, res) => {
    
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found registered teacher: ", res[0].password);
        result(null, res);
        return;
      }
  
      // not found student with the id
      result({ kind: "not_found" }, null);
    });
  };

  Login.findByEmailRegST = (email, result) => { // find registered students
    sql.query(`SELECT * FROM attendence.registration_st WHERE email = '${email}'`, (err, res) => {
    
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found registered student: ", res[0].password);
        result(null, res);
        return;
      }
  
      // not found student with the id
      result({ kind: "not_found" }, null);
    });
  };


  Login.findByEmailStudentTable = (email, result) => {
    sql.query(`SELECT * FROM attendence.student WHERE email = '${email}'`, (err, res) => {
    
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found registered student: ", res[0].password);
        result(null, res);
        return;
      }
  
      // not found student with the id
      result({ kind: "not_found" }, null);
    });
  };

  Login.registerUser = async (newRegisteredUser, result) => {
    newRegisteredUser.password =    await bcrypt.hash(newRegisteredUser.password, 10)
    sql.query("INSERT INTO attendence.registration_st SET ?", newRegisteredUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
       console.log("created tutorial: ", { id: res.insertId, ...newRegisteredUser });
       result(null, { id: res.insertId, ...newRegisteredUser });
    });
  };


  Login.registerUserTeacher = async (newRegisteredUser, result) => {
    newRegisteredUser.password =    await bcrypt.hash(newRegisteredUser.password, 10)
    sql.query("INSERT INTO attendence.registration_te SET ?", newRegisteredUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      //  console.log("created tutorial: ", { id: res.insertId, ...newRegisteredUser });
      //  result(null, { id: res.insertId, ...newRegisteredUser });
    });
  };

 
  
  module.exports = Login;
