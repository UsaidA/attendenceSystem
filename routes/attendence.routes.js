module.exports = app => {
    const attendence = require("../controllers/attendence.controller");
  
    let router = require("express").Router();
  
    // Retrieve all students
   

    router.post("/attend", attendence.attend);

    router.get("/getAttendence", attendence.getAttendence);

    router.get("/getAllAttendences", attendence.getAllAttendences);

    router.put("/updateAttendence", attendence.updateAttendence)
    
    router.get("/getAttendCode", attendence.getAttendCode)

    router.get("/getGroupAttendence", attendence.getGroupAttendence)

    app.use('/api/attendence', router);
  };
