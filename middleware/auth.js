import jwt from 'jsonwebtoken'
import User from '../models/userSchema.js'


export const auth= async(req,res,next)=> {

 //take test token from headers
// let testToken= req.headers?.authorization 
let testToken= req.cookies.token

//split it and take actual token
let token=testToken.split(" ")[1]

//verify token using jwt
let decodedToken=await jwt.verify(token,process.env.JWT_SECRET)
console.log('decoded token',decodedToken);

//from decoded token use user data
let id=  decodedToken?.id


//find the user from id



 let user= await User.findById(id).select("-password -confirmPassword")
//  console.log(user); 


 //if user is present set it to request object

 req.user=user

 next()

}