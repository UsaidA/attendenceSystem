const Lecture = require("../models/lecture.model");
const Attendence = require("../models/attendence");
const tokenHandler = require("../common/tokenHandling");
const Student = require("../models/student.model");
const Course = require("../models/course.model")
const e = require("cors");

exports.getAttendCode = (req,res)=>{
  console.log(req.headers.authorization, " : headers")
  let jwtToken = req.headers.authorization
  if (tokenHandler.authenticateToken(jwtToken) ){
    var x = tokenHandler.getTokenPayload(jwtToken)
    if(x.accessControl === 1){

      Attendence.getAttendCode((error, dataA) => {
        if(error){
            res.status(500).send({
                message:
                err.message || "Some error occurred while getting attendCode." 
            });
        }else res.send(dataA);

    });



    }else{
      res.status(403).send("Admin Only Access")
  }
  }else{

        res.status(403).send("token not valid")
    }
    

      

}


exports.updateAttendence = (req, res) => {
    console.log(req.headers.authorization, " : headers")
    let jwtToken = req.headers.authorization
    if (tokenHandler.authenticateToken(jwtToken) ){
        var x = tokenHandler.getTokenPayload(jwtToken)

        if(x.accessControl === 1){
            if (!req.body) {
                res.status(400).send({
                  message: "Content can not be empty!"
                });
              }else{
                console.log(req.body, " : hi in here")
                Attendence.updateById(req.body.attendenceID,new Attendence(req.body),
                    (err, data) => {
                      if (err) {
                        if (err.kind === "not_found") {
                          res.status(404).send({
                            message: `Not found Attendence with id ${req.body.attendenceID}.`
                          });
                        } else {
                          res.status(500).send({
                            message: "Error updating Attendence with id " + req.body.attendenceID
                          });
                        }
                      } else res.send(data);
                    }
                  );
              }

        }else{
            res.status(403).send("Admin Only Access")
        }

       

    }else{

        res.status(403).send("token not valid")
    }

    

   

    
}


exports.getAllAttendences = (req, res) => {
    let jwtToken = req.headers.authorization
    if (tokenHandler.authenticateToken(jwtToken) ){
      var x = tokenHandler.getTokenPayload(jwtToken)
        if(x.accessControl === 1){
            console.log(x.accessControl, " accessControl")
       
            Attendence.getAllAttendences((error, dataA) => {
                if(error){
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while getting student attendence." 
                    });
                }else res.send(dataA);
    
            });
        }else {
            res.status(403).send("Access denied")

        }
       
    }else{
        res.status(403).send("token not valid")
    }
}



exports.getAttendence = (req, res) => {
    let jwtToken = req.headers.authorization
    if (tokenHandler.authenticateToken(jwtToken) ){
      var x = tokenHandler.getTokenPayload(jwtToken)
        console.log(x.email, " student  iD")
        Student.findByEmail(x.email, (err, data) => {
            if(err){
                res.status(500).send({
                   message:
                   err.message || "some error occured in attendence controller finding student by email." 
                });
            }else{
                Attendence.getStudentAttendence(data.studentID, (error, dataA) => {
                    if(err){
                        res.status(500).send({
                           message:
                           err.message || "Some error occurred while getting student attendence." 
                        });
                    }
                    else res.send(dataA);
                });
            }
        });
    }else{
        res.status(403).send("token not valid")
      }
}


var attendence= (group) =>{
  return new Promise ((resolve, reject)=>{
      console.log(group.groupID, ": test group id")
      Attendence.getAllFromGroup(group.groupID, (errorr, attendences) =>{
        if(errorr){
          reject(errorr)
        }else{
          //console.log(JSON.parse(JSON.stringify(attendences)).flat(), " : attendences")
          let present= 0;
          for(let i =0; i < attendences.length;i++){
            if(attendences[i].hasAttended === 0){
             
            }
            else{
              present++;
              
            }
            
          }
          
          tempOneP = attendences.length/ 100;
          percentage = present / tempOneP ;
          groupID = group.groupID;
          courseID = group.courseID;
          
          resolve({percentage,groupID, courseID})
        }  
      })

  })
}

exports.getGroupAttendence = (req, res) => {

 
  let jwtToken = req.headers.authorization
  if (tokenHandler.authenticateToken(jwtToken) ){
    var x = tokenHandler.getTokenPayload(jwtToken)
    if(x.accessControl === 1){

      Course.getGroups((error , groupsData)=> {

        let promiseArr = groupsData.map(x=> attendence(x))
        
        Promise.all(promiseArr).then(values=>{
          //console.log("values:  ", values)
          let mergedArr = values.flat(1);
          console.log(mergedArr)
          res.send(mergedArr)

        })

      })
      
      
    }else {
            res.status(403).send("Access denied")
        }
  }else{
        res.status(403).send("token not valid")
      }
}

exports.attend = (req, res) => {

  console.log(" inside attend")
  let jwtToken = req.headers.authorization;
  let attendCode = req.headers.attendcode;
  console.log(req.headers.attendcode)
  if (tokenHandler.authenticateToken(jwtToken) ){
    
    Attendence.getAttendCode((err,data)=>{

      if(err){
        res.status(500).send({
          message:
          err.message || "Couldn't justify attend code" 
       });
      
      }else{
        
        console.log(data.attendcode, " :  data attnedocde", attendCode)
        console.log(req.headers.attendcode , "  : req header code")
        if(data.attendCode === attendCode){
          console.log("what")
          const attendenceObj = new Attendence({
           
            studentID: req.body.studentID,
            lectureID: req.body.lectureID,
            hasAttended: req.body.hasAttended,
            checked: "0"
            
          });
          
      
        Attendence.attend(attendenceObj, (err, data) => {
            if(err){
                res.status(500).send({
                   message:
                   err.message || "Some error occurred while creating the attend." 
                });
            }
            else res.send(data);
        });

        }else{
          res.status(403).send("invalid attendence code")
        }
      
      }
    })


  }else{
    res.status(403).send("token not valid")
  }

  

    
}



