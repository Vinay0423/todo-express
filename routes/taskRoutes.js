import express from 'express'
import { deleteTask, getTask, getTasks, postTask, updatedTask } from '../controllers/taskcontrollers.js'

let taskRouter = express.Router()

taskRouter.post("/", postTask)


taskRouter.get("/", getTasks)


taskRouter.get("/:id", getTask)


taskRouter.put("/:id", updatedTask)


taskRouter.delete("/:id", deleteTask)

export default taskRouter;