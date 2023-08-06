//imports all the libraries 
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const rateLimit = require('express-rate-limit')
const dotenv = require('dotenv')

//routes imports
const userRoutes = require('./routes/userRoutes')
const courseRoutes = require('./routes/courseRoutes')
const videoRoutes = require('./routes/videoRoutes')

const app = express()

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // maximum 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

dotenv.config()

app.use(express.json())
app.use(cors())
app.use(limiter)

const port = process.env.PORT

app.use('/', userRoutes.postAdminSignUp)
app.use('/', courseRoutes.getAllCourses)
app.use('/',videoRoutes.getAllVideos)





    

mongoose.connect(`${process.env.MONGOOSE_HOST}`)
    .then(() => { app.listen(port || 5000) })
    .catch(error=>console.log(error))