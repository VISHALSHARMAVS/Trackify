import express from 'express'
import contactUs from '../controllers/contact.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
const router = express.Router();


router.post("/", authMiddleware, contactUs);

export default router;