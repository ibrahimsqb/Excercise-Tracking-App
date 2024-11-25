const Workout = require('../models/workoutModel')//importing model
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) =>{
    const workouts = await Workout.find({}).sort({createdAt: -1}) // newst one first displayed -1
    res.status(200).json(workouts)
}

//get single workout
const getWorkout = async (req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Workout'})
    }
    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(400).json({error: 'Workout doest exist.'})
    }
    res.status(200).json(workout)
}

// create new wrkout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    try{
        const workout =await Workout.create({title, load, reps})
        res.status(200).json(workout) //200 is success code
    } catch(error){
        res.status(400).json({error: error.message}) //400 is error code
    }
}

// delete a workout
const deleteWorkout = async(req, res) =>{
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Workout'})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
        return res.status(400).json({error: 'Workout doest exist.'})
    }
    res.status(200).json(workout)
}

// update a workout
const updateWorkout =  async (req, res) => {
    const{id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Workout'})
    }
    const workout = await Workout.findOneAndUpdate({_id: id}, {
      ...req.body
    })

    if(!workout){
        return res.status(400).json({error: 'Workout doest exist.'})
    }
    res.status(200).json(workout)
}


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}