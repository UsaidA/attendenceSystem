module.exports = app => {
    const login = require("../controllers/login.controller");
  
    let router = require("express").Router();
  
    // Retrieve all students
   

    router.post("/login", login.authenticate);

    router.post("/register", login.register)
  
  

    app.use('/api', router);
  };
