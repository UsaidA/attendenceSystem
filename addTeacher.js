const sql = require("./models/dbconnection")
const bcrypt = require('bcrypt');
const { registerUserTeacher } = require("./models/login.model");
const Login = require("./models/login.model");


// INSERT INTO `attendence`.`teachers` (`firstName`, `lastName`, `email`, `dateStarted`) VALUES ('mike', 'dr', 'mike@gmail.com', '12.12.2002');


console.log("hi")

const login = new Login({
  email: "edward@gmail.com",
  password: "uraish",
  accessControl: "1"
});

Login.registerUserTeacher(login, (err, data) => {
  if(err){
     
    console.log("err registering teacher")
  }
  console.log("sucess")
});
