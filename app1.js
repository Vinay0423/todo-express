import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'


dotenv.config()

const app=express()


async function db(){
    try {
      const client=  await mongoose.connect('mongodb://127.0.0.1:27017/taskdB')
      console.log(`db connected on ${client.connection.host}`);
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

db();


//creating schema

let taskSchema=new mongoose.Schema({
  name:String,
  isCompleted:{
    type:Boolean,
    default:false
  }
});


//creating collection and loading schema
 let Task=mongoose.model('Task',taskSchema)

 //inbuild middleware
app.use(express.json()) //to get the json incoming to server from client


//create a new task
// @route POST path- /task
// access public

app.post('/task', async(req,res,next)=> {
  let {name,isCompleted}= req.body;

  if(!name ){
    return res.status(400).json("Please enter all details")
  }
   
  try {
     
    //creating a document in mongodb
   const newTask= await Task.create({
        name:name,
        isCompleted:isCompleted
      })
      res.status(200).json(newTask)

  } catch (error) {
    res.status(400).json(`Couldn't fill the data`)
  }
})


//reading a new task
// @route Get path- /task
// access public

app.get('/task', async(req,res,next)=> {
  try {  
    //finding a document in mongodb
   let tasks= await Task.find()
      res.status(201).json(tasks)
  } catch (error) {
    res.status(400).json(`Couldn't find the data`)
  }
})

//updating a new task
// @route Get path- /task:id
// access public

app.put('/task/:id', async(req,res,next)=> {
  let {id}= req.params
  let {isCompleted}= req.body

  try {  
    //finding a document in mongodb
   let updatedtasks= await Task.findByIdAndUpdate(id,{isCompleted:isCompleted},{new:true})
      res.status(201).json(updatedtasks)
  } catch (error) {
    res.status(400).json(`Couldn't update the data`)
  }
})


//deleting a  task
// @route Delete path- /task:id
// access public
app.delete('/task/:id', async(req,res,next)=> {
  let {id}= req.params
  let {isCompleted}= req.body

  try {  
    //finding a document in mongodb
   let deletedtasks= await Task.findByIdAndDelete(id,{new:true})
      res.status(203).json(deletedtasks)
  } catch (error) {
    res.status(400).json(`Couldn't delete the data`)
  }
})

//getting a  one task
// @route Delete path- /task:id
// access public
app.get('/task/:id', async(req,res,next)=> {
  let {id}= req.params
  let {isCompleted}= req.body

  try {  
    //finding a document in mongodb
   let tasks= await Task.findById(id)
      res.status(203).json(tasks)
  } catch (error) {
    res.status(400).json(`Couldn't delete the data`)
  }
})

export default app;