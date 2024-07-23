import { Router } from "express";
import { getLoginPage, getSignupPage, login, logout, signup } from "../controllers/userControllers.js";
import { auth } from '../middleware/auth.js'


let userRouter=Router()


userRouter.get("/signup",getSignupPage)
userRouter.post("/signup",signup)


userRouter.get("/login",getLoginPage)
userRouter.post("/login",login)

userRouter.get("/logout",auth,logout)

// userRouter.get("/home",auth,(req,res,next)=>{
// res.send(`Welcome to home page ${req.user.name}!`)
// })

export default userRouter;