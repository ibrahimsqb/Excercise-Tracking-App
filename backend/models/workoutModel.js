const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({ //How our data will be stored in db
    title: {
        type: String,
        required: true,

        // How to create a sub child
    },
    reps: {
        type: Number, 
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true})

module.exports = mongoose.model('Workout', workoutSchema)// create model which will be imported in other files
//automatically creates collection in db
//Workout.find()