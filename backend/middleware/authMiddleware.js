import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

const authMiddleware = async (req,res,next)=>{
try {
    const token = req.cookies.token

    if (!token) {
        res.status(401);
        throw new Error("Not Authorized , please login ")
    }
    // verify token 
    const verified = jwt.verify(token,process.env.JWT_SECRET);

    // get user id from token 
   const user = await User.findById(verified.id).select('-password');
   if (!user) {
    res.status(401)
    throw new Error("User not found ")
   }
   req.user = user;
   next();
} catch (error) {
    console.error(error)
}
}
export default authMiddleware