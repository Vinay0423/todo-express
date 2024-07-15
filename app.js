import express from "express";
import dotenv from 'dotenv';
import methodOverride from 'method-override'


import { db } from "./config/db.js";
import taskRouter from "./routes/taskRoutes.js";


dotenv.config()
db()

let app=express()

//register template enginee
app.set("view engine","ejs")

//middlewares
app.use(methodOverride('_method'))
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use("/task",taskRouter);

export default app;