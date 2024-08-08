import bcrypt from 'bcryptjs'
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const generateToken = (id)=>{
return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'1d'})
}

// regiser user 
const registerUser = async(req,res)=>{
  const {name,email,password} = req.body
    
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all required fields");

    }
    if (password.length<8) {
        res.status(400);
        throw new Error("Password shold be 8 characters");   
    }
    try {
        
      const existedUser = await User.findOne({
        $or:[{name},{email}]
  
    })
      if (existedUser) {
        res.status(400);
        throw new Error("Email or name has already been registered");
      }


      
      const user = await User.create({
        name,email,password
      })

      // generate access token 
      const token = generateToken(user._id)
      //send HTTP-Only Cookie
      res.cookie('token',token,{
        path:'/',
        httpOnly:true,
        expires: new Date(Date.now()+1000*86400), // 1 day
        sameSite:"none",
        secure:true
      })
      if (user) {
          const {_id,name,email,photo,bio,phone}= user;
        res.status(201).json({
            _id,name,token,email,photo,bio,phone
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid user data")
    }

      
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
}

//login user 
const loginUser = async (req,res)=>{
const {email,password} = req.body;

if (!email || !password) {
  res.status(400);
  throw new Error("Please add email or password")
}
const user = await User.findOne({email})
if (!user) {
  res.status(400);
  throw new Error("User not found ")
}


const isPasswordValid = await user.isPasswordCorrect(password);
if (!isPasswordValid) {
  res.status(404)
  throw new Error("Invalid User Credentials");
}
 // generate access token 
 const token = generateToken(user._id)
 //send HTTP-Only Cookie
 res.cookie('token',token,{
   path:'/',
   httpOnly:true,
   expires: new Date(Date.now()+1000*86400), // 1 day
   sameSite:"none",
   secure:true
 })
const {_id,name,photo,phone, bio}= user
if (user) {
  res.status(200).json({
    _id,name,photo,phone,email,bio,token
  })
}else {
  res.status(400)
  throw new Error("Invalid email or password")
}
}

// logout user 
const logoutUser = async (req,res)=>{
  res.cookie('token',"",{
    path:'/',
    httpOnly:true,
    expires: new Date(0),
    sameSite:"none",
    secure:true
  })
  return res.status(200).json({
    message:"Logout Successfully "
  })
}

//Get user Data
const getUser = async(req,res)=>{
  const user = await User.findById(req.user._id)
  if (user) {
    const {_id,email,name,phone,photo,bio} = user;
    res.status(200).json({
      _id,email,name,phone,photo,bio
    })
  }
  else{
    res.status(400);
    throw new Error("User not found ")
  }
}
const loginStatus = async (req,res)=>{
  const token = req.cookies.token;
  if (!token) {
    return res.json(false);

    const verified = jwt.verify(token,process.env.JWT_SECRET);
    if (verified) {
      return res.json(true)
    }
    return res.json(false)
  }
}

const updateUser = async (req,res)=>{
const user = await User.findById(req.user._id);
if (user) {
  const {phone,photo,
    email,bio,name
  } = user;

  user.email = email;
  user.name = req.body.name || name
  user.phone = req.body.phone || phone
  user.bio = req.body.bio || bio
  user.photo = req.body.photo || photo

  const updatedUser = await user.save();
  res.status(200).json({
    _id : updateUser._id,
    name : updateUser.name,
    email : updateUser.email,
    photo : updateUser.photo,
    phone : updateUser.phone,
    bio : updateUser.bio
  })
}
else {
  res.status(404);
  throw new Error("User Not Found ")
}
}

export  {registerUser,loginUser,logoutUser,getUser,loginStatus,updateUser}