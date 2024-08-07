
import User from '../models/user.model.js';

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
      return res.status(500).json({ message: error.message });
    }
}

export  {registerUser}