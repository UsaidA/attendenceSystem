module.exports = app => {
    const teachers = require("../controllers/teachers.controller.js");
  
    let router = require("express").Router();
  
    // Retrieve all students
    router.get("/getTeacher", teachers.findByEmail);

    app.use('/api/teachers', router);
  };