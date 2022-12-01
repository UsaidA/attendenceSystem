
const tokenHandle = require("../common/tokenHandling")

module.exports = app => {
    const students = require("../controllers/student.controller.js");
  
    let router = require("express").Router();
  
    // Retrieve all students
    router.get("/getAll", students.findAll);

    router.get("/getOneStudent", students.findByEmail)

    router.post("/createNewStudent", students.create);
  
    router.put("/updateStudent/:id", students.update);

    router.delete("/delete/:id", students.delete);

    app.use('/api/students', router);
  };