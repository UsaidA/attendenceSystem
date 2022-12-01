const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Login = require("../models/login.model.js");
require('dotenv').config();
require("../common/tokenHandling")



exports.authenticate = (req, res) => {

    Login.findByEmailRegTE(req.body.email,async (err, data) => {
        
        if(err){

            Login.findByEmailRegST(req.body.email, async(errr, data1) => {

                if(errr){ // if no student 

                    res.status(500).send({
                        message:
                        errr.message || "No teacher or student exists with this email" 
                     });
                }else {
                    try {
                        if (await bcrypt.compare(req.body.password, data1[0].password)){

                            const regUser = {email: data1[0].email, accessControl: data1[0].accessControl}
                            const accessToken = jwt.sign(regUser, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
                            console.log(accessToken)
                            res.json({accessToken: accessToken, accessControl: data1[0].accessControl});
                            //res.json({hi: "hi"})
                        }   
            
                        else{
                            res.status(400).send("failed password")
                        }
                   
                    }catch{
                        console.log(" Failed to generate token for student ")
                    }

                }
               


            });


            
        }else{
            try {
                if (await bcrypt.compare(req.body.password, data[0].password)){
                    const regUser = {email: data[0].email, accessControl: data[0].accessControl}
                   
                    const accessToken = jwt.sign(regUser, process.env.ACCESS_TOKEN_SECRET);
    
                    res.json({accessToken: accessToken,accessControl: data[0].accessControl});
                    //res.json({hi: "hi"})
                }   
    
                else{
                    res.status(400).send("failed password")
                }
           
            }catch{
                console.log(" Failed to generate token  ")
            }
              

        }
        
        
          
      
    });
}

exports.register = (req, res) => {
      
    const login = new Login({
        email: req.body.email,
        password: req.body.password
      });
    Login.findByEmailStudentTable(login.email, (err,data)=>{
        if (err){
            // no uni student with this email

            res.status(500).send({
                message: err.message || "No university student has this email"
            })
        }else{
            Login.registerUser(login, (err, data) => {
                if(err){
                    res.status(500).send({
                       message:
                       err.message || "coudn't register student" 
                    });
                }
                else res.send(data);
            });
            
        }
    });

 
}

