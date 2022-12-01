module.exports = app => {
    const lectures = require("../controllers/lecture.controller");
  
    let router = require("express").Router();
  
    // Retrieve all students
   

    router.get("/allLectures", lectures.allLectures);

  
  

    app.use('/api/lectures', router);
  };
