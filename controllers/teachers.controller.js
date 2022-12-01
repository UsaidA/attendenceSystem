const Teacher = require("../models/teacher.model.js");
const tokenHandler = require("../common/tokenHandling");


exports.findByEmail = (req, res) => {

  

    let jwtToken = req.headers.authorization
   
    if (tokenHandler.authenticateToken(jwtToken) ){
     
      
  
      var x = tokenHandler.getTokenPayload(jwtToken)
      
      Teacher.findByEmail(x.email, (err, data) => {
    
        
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Teacher with email ${x.email}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving teacher with email " + req.params.id
            });
          }
        } else res.send(data);
      });
      
    }
    else{
      res.status(403).send("token not valid")
  
    }
  
   
  };