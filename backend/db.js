import mongoose from 'mongoose';

import { configDotenv } from 'dotenv';

configDotenv()
const URI = process.env.MONGODB_URI;
const connectDB =()=> mongoose.connect(URI )

export default connectDB