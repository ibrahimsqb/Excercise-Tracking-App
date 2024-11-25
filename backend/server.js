require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//express app
const app = express() 

//middleware
app.use(express.json()) //checks data and if does exist and attaches it to req obj
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

//route handler(reacting to requests)
//app.get('/', (req, res) => { 
  //   res.json({mssg: 'Welcome to the app'}) 
//})

app.use('/api/workouts',workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () =>{
    console.log('connected to db & Listening on port') //get request
})

 })
 .catch((error) => {
    console.log(error)
 })



