import express from 'express';
import { registerUser,loginUser, logoutUser, getUser,loginStatus ,updateUser} from '../controllers/user.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getuser',authMiddleware, getUser);
router.get('/loggedin', loginStatus);
router.patch('/updateuser',authMiddleware,updateUser);

export default router;
