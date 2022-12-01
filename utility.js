const cron = require('node-cron')
const Attendence = require("./models/attendence");
const Lecture = require("./models/lecture.model")
const Student = require("./models/student.model")

cron.schedule('1 * * * *', ()=>{
    var length = 8;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    console.log(result)
Attendence.updateAttendCode(result, (err, data)=>{

    if(err){
        console.log("Issue updating attendence Code")
    }



})

})

cron.schedule('* * * * * *', () =>  {
    
    Attendence.notAttended((err, data) => { // get back all students who didn't attend lecture since last "tick"
        if(err){
            console.log("Issue with notAttended function")
        }
        else{
            for ( let i = 0; i < data[0].length; i++){
                  // to complete the object "attendence" to write back all the students who didn't attend, i need lectureID, get lecture id                  
                  Student.getLectureID(data[0][i].studentID, (error, lecData) => {
                    console.log(data[0][i].studentID)
                    if(error){
                      console.log("Some error occurred with cron NotAttend function.")
                    }else{
                        var attendenceObj = new Attendence({
                            studentID: data[0][i].studentID,
                            lectureID: "",
                            hasAttended: 0,
                            checked: 1
                          });
                        attendenceObj.lectureID = lecData.lectureID;
                        console.log(attendenceObj.studentID)
                        // finally append to attendences table for all who haven't attended                        
                        Attendence.appendNotAttended(attendenceObj, (errr, data) =>{
                            if (errr){
                                console.log("some issue with appendNotAttend")
                            }
                        })
                    }
                  });
              }
        } 
    });
});

  

  module.exports = cron;
