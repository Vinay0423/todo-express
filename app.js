import express from "express";
import dotenv from 'dotenv';
import methodOverride from 'method-override'
import cookieParser from "cookie-parser";



import { db } from "./config/db.js";
import taskRouter from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js"

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
app.use(cookieParser())



app.use("/task",taskRouter);
app.use("/users",userRoutes);


// cookie

app.get("/",(req,res)=>{
    res.render("index")
})

// app.get("/set-cookie",(req,res)=>{
//     res.cookie("user","shankar",{
//         maxAge:1000*60*60*24,
//         httpOnly:true
//     })
//     res.send("cookie set")
// })

// app.get("/get-cookie",(req,res)=>{
//     res.send(`cookie is ${req.cookies.user}`)
// })

// app.get("/update-cookie",(req,res)=>{
//     res.cookie("user","stark",{
//         maxAge:1000*60*60*24,
//         httpOnly:true
//     })
//     res.send(`cookie updated,`)
// })

// app.get("/delete-cookie",(req,res)=>{
//     res.clearCookie("user")
//     res.send("cookie deleted")
// })

export default app;