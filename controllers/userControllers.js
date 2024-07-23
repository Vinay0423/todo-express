import userSchema from '../models/userSchema.js'
import jwt from 'jsonwebtoken'




export const getSignupPage=(req,res,next)=>{
   res.render("signup.ejs",{title:"Signup page"})
}


export const getLoginPage=(req,res,next)=>{
   res.render("login.ejs",{title:"Login page"})
}


//signup

export const signup = async (req, res, next) => {

   const { name, email, password, confirmPassword } = req.body

   try {
      let existingEmailId = await userSchema.findOne({ email })
      if (existingEmailId) {
         return res.status(400).json("user exists already")
      }

      //creating new user
      let newUser = await userSchema.create({
         name, email, password, confirmPassword
      })

      //to create a json web token
      let token = await jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
         expiresIn: 24 * 60 * 60
      })

      //projecting only required fields
      // let user = await userSchema.findById(newUser._id).select("-password -confirmPassword")

      //set cookies
      res.cookie("token",`Bearer ${token}`,{
         maxAge:24 * 60 * 60*1000,
         httpOnly:true
      })

       //redirect to task home page
       res.redirect("/task")

      //   res.status(200).json(newUser)
      // res.status(201).json({ user, token })
   } catch (error) {
      res.status(400).json(error.message)
   }
}
export const login= async(req,res,next)=> {
   const { email, password } = req.body

   try {
      let existingEmailId = await userSchema.findOne({ email })
      //  let match= await existingEmailId.verifyPassword(password,existingEmailId.password )

      if (!existingEmailId || !await existingEmailId.verifyPassword(password,existingEmailId.password ) ) {
         return res.status(400).json("User doesn't exist")
      }

      //to create a json web token
      let token = await jwt.sign({ id: existingEmailId._id }, process.env.JWT_SECRET, {
         expiresIn: 24 * 60 * 60
      })

      //projecting only required fields
      let user = await userSchema.findById(existingEmailId._id)
      // .select("-password -confirmPassword")
      //to avoid the fields displaying we use select


      //set cookies
      res.cookie("token",`Bearer ${token}`,{
         maxAge:24 * 60 * 60*1000,
         httpOnly:true
      })

       //redirect to task home page
       res.redirect("/task")

      //   res.status(200).json(newUser)
      // res.status(201).json({ user, token })
   } catch (error) {
      res.status(400).json(error.message)
   }
}

export const logout=(req,res,next)=>{
   res.clearCookie("token")
   res.redirect("/users/login")
}


// export const login = async (req, res, next) => {
//    const { name,email, password,} = req.body
//    try {
//       let existingEmailId = await userSchema.findOne({ email })

//       if (existingEmailId) {

//          const pwd= await userSchema.findOne({email})
        
//          bcrypt.compare(password, pwd.password, function(err, isres) {
//             if(err) res.status(401).json(err.message)

//                if(isres===true){
//                   res.status(200).json('pwd matched')
//                } else{
//                   res.status(401).json('pwd not matched')
//                }
//            console.log(isres);
          
//         });

//       } else {
//          res.status(400).json("Please register to use.")
//       }


//    } catch (error) {
//       res.status(400).json(error.message)
//    }
// }