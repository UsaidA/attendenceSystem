const express = require('express');
const cors = require("cors");

const moment = require("moment")

const cron = require("./utility")

const api = express()





var corsOptions = {
    origin: "http://localhost:8888"
  };

const PORT = 8888;
const HOST = 'localhost';

api.use(cors(corsOptions));


api.use(express.json()); 


api.use(express.urlencoded({ extended: true })); 

api.get('/', (req,res) => {
    res.send('Welcome to this awesome API!')
})



require("./routes/student.routes.js")(api)

require("./routes/login.routes")(api)

require("./routes/lecture.routes.js")(api)

require("./routes/attendence.routes")(api)

require("./routes/teacher.routes")(api)



api.listen(PORT, () => console.log(`API running at ${HOST}:${PORT}!`))