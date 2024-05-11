import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
    
}
// login user 
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email})
        
        if(!user){
            return res.json({success:false,message: "User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password) // comparint the req password with stored password 

        if(!isMatch){
            return res.json({success:false,message: "invalid credentials"})
        }

        const tokken = createToken(user._id);
        res.json({success:true,tokken})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// register user 
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try{

        // checking if user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message: "User already exists"})
        }

        // valdating email format and strong passwrod   
        if(!validator.isEmail(email)){
            return res.json({success:false,message: "please enter valid email"})
        }
        
        if(password.length < 8){
            return res.json({success:false,message: "Please enter strong password "})
        }

        // hashing user password 
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser  = new userModel(
            {
                name: name,
                email: email,
                password: hashedPassword,
            }
        )

        const user  = await newUser.save() // new user will be saves using this
        const token = createToken(user._id)

        res.json({success:true})

    }
    catch(error){
        console.log(error);
        res.json({success:false,message: "Error"})
    }
 
}

export {loginUser,registerUser}