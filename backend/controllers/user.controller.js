const User = require('../models/user.model.js')
const bcrypt = require('bcryptjs');

const registerUser = async(req,res)=>{
    const {name,email,password}= req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all required fields");

    }
    if (password.length<8) {
        res.status(400);
        throw new Error("Password shold be 8 characters");   
    }
    try {
        
      const userExists=  await User.findOne({email});
      if (userExists) {
        res.status(400);
        throw new Error("Email has already been registered");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);


      const user = await User.create({
        name,email,password:hashedPassword
      })
      if (user) {
          const {_id,name,email,photo,bio,phone}= req.body;
        res.status(201).json({
            _id,name,email,photo,bio,phone
        })
    }
    else {
        res.status(400);
        throw new Error("Invalid user data")
    }

      
    } catch (error) {
        
    }
}

module.exports = {registerUser}