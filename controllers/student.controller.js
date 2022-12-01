const Student = require("../models/student.model.js");
const tokenHandler = require("../common/tokenHandling");
const e = require("cors");


exports.findAll = (req, res) => {

  
  let jwtToken = req.headers.authorization
 
  if (tokenHandler.authenticateToken(jwtToken) ){

    var x = tokenHandler.getTokenPayload(jwtToken)

    if(x.accessControl === 1){
      Student.getAll("", (err, data) => {
        if(err){
            res.status(500).send({
               message:
               err.message || "Some error occurred while creating the student." 
            });
        }
        else res.send(data);
    });
    }else{

      res.status(403).send("Admin Only Access")
    }

    

  } else{
    res.status(403).send("token not valid")

  }
   
}

// Create and Save a new Student
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
          
    // Create a Student
    const student = new Student({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      teacherID: req.body.teacherID,
      courseID: req.body.courseID,
      dateStarted: req.body.dateStarted
    });
    
    // Save Student in the database
    Student.create(student, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Student."
        });
      else res.send(data);
    });
  };
// Update a Tutorial identified by the id in the request

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  Student.updateById(
    req.params.id,
    new Student(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Student with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Student with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};


// Delete a Stduent with the specified id in the request
exports.delete = (req, res) => {
  Student.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Student with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Student with id " + req.params.id
        });
      }
    } else res.send({ message: `Student was deleted successfully!` });
  });
};

// Find a single Student by Id
// exports.findOne = (req, res) => {
//   Student.findById(req.params.id, (err, data) => {

//     tokenHandler(token)
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           message: `Not found Student with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: "Error retrieving Student with id " + req.params.id
//         });
//       }
//     } else res.send(data);
//   });
// };

exports.findByEmail = (req, res) => {

  

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
      } else res.send(data);
    });
    
  }
  else{
    res.status(403).send("token not valid")

  }

 
};



