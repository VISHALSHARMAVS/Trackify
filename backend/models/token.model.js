import mongoose from "mongoose";
// import User from "./user.model";

const tokenSchema = mongoose.Schema({

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    token:{
        type:String,
        required:true,
         
    },
    createdAt:{
        type:Date,
        required:true
    },
    expireAt:{
        type:Date,
        required:true
    }
})

const Token = mongoose.model('Token',tokenSchema)
export default Token