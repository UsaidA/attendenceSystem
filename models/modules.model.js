const sql = require("./dbconnection");

const Modules = function (module) {

 this.moduleName = module.moduleName;
 this.yearOfStudy = module.yearOfStudy;
 this.courseID = module.courseID;

};


Modules.getModuleIDsByCourseID = (courseID, result) => {
    sql.query(`SELECT * FROM attendence.modules WHERE courseID = '${courseID}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found modules: ", res);
        
        result(null, res);
       
        return;
      }
  
     
      result({ kind: "not_found" }, null);
    });
  };

module.exports = Modules;
