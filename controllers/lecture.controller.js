const Lecture = require("../models/lecture.model");
const Student = require("../models/student.model");
const Modules = require("../models/modules.model");
const tokenHandler = require("../common/tokenHandling");


exports.allLectures = (req, res) => {


  
    // find course ID from email in payload of token
    var courseID;
  let jwtToken = req.headers.authorization
  if (tokenHandler.authenticateToken(jwtToken) ){
    var x = tokenHandler.getTokenPayload(jwtToken)

    Student.findByEmail(x.email, (err, data) => {

      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with id ${x.email}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Student with id " + req.params.id
          });
        }
      } else{
        courseID = data.courseID;
        //find all modules with THAT course ID
       
        Modules.getModuleIDsByCourseID(courseID, (modError, data) => {
            if (modError) {
              if (modError.kind === "not_found") {
                res.status(404).send({
                  message: `Not found modules with ID ${courseID}.`
                });
              } else {
                res.status(500).send({
                  message: "Error retrieving modules with id " + req.params.id
                });
              }
            } else{
              
               
                var modulesIDs = [];
                for(var i=0; i<data.length; i++) {
                    modulesIDs.push(data[i].moduleID);
                    
                }
                console.log(modulesIDs, "  : moduleIDs")
                
                // find all lectures with those moduleID

                Lecture.getAll(modulesIDs, (err, data) => {
                    if(err){
                        res.status(500).send({
                           message:
                           err.message || "Some error occurred while creating the student." 
                        });
                    }
                    else{
                      
                      res.send(data);
                    } 
                });
      
            } 
          });



      } 
    });

  }
  else{
    res.status(403).send("token not valid")
  }

    



// sort lectures into two arrays, past lectures and future lectures


   
}