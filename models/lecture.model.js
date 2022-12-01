const sql = require("./dbconnection");

const Lecture = function (lecture) {
 this.lectureStart = lecture.lectureStart;
 this.lectureEnd = lecture.lectureEnd;
 this.moduleID = lecture.moduleID;
};

var sqlQuery = (query) =>{
  return new Promise((resolve, reject)=>{
    sql.query(query, (err, res) => {
      if (err) {
       reject(err)
      }; 
      resolve(res)  
    });
  });
};

Lecture.getAll = (modIdArray, result) => {
  let sqlQueries = modIdArray.map(x=> sqlQuery(`SELECT * FROM attendence.lectures WHERE moduleID = '${x}'`) )
  Promise.all(sqlQueries).then(values =>{ // wait till all threads finished 
    let mergedArr = values.flat(1); // flatten the array 
    result(null, mergedArr);
  })

  };

  Lecture.getAllFromLastTick = (moment, result) => {
  
      let query = `SELECT moduleID FROM attendence.lectures where lectureEnd < CURRENT_TIME()`;

      sql.query(query, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        result(null, modIdArray);
        
        
      });
    
    };
  
module.exports = Lecture;