const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const URI = process.env.MONGODB_URI;


const connectDB =()=> mongoose.connect(URI )

module.exports = connectDB