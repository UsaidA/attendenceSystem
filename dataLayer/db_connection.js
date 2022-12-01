var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Usaid786",
  port: "3306"
});


con.connect((err) => {
  if(err)
  {
      console.log(err)
  }else{
      console.log("Connected!")
  }
})

function returnQueryResult(query){
  return new Promise(function(resolve, reject){
    con.query(
        query, 
        function(err, result){                                                
            if(result === undefined){
                reject(new Error("Error rows is undefined"));
            }else{
                resolve(result);
            }
        }
    )}
)}

module.exports = {returnQueryResult};

//https://stackoverflow.com/questions/31875621/how-to-properly-return-a-result-from-mysql-with-node