
  require('dotenv').config();
  const jwt = require('jsonwebtoken');

module.exports = {



    authenticateToken: 
    function authenticateToken(req){

        if ( jwt.verify(req, process.env.ACCESS_TOKEN_SECRET, (err) =>{ // if jwt.verity return true, then return true for "authenticateToken()"

            if (err){               
                return false;
            } 
            else if (!err){
                return true;
            }
        })   ){ // end of if statement


            return true;
        } // else, "authenticateToken" will return undefined since theres no "else here", which isn't true so the authenticate will fail
        
      
    },
    getTokenPayload:
    function getTokenPayload(token){

       
        return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
        
    }
}