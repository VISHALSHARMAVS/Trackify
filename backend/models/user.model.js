const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
     name :{
        type:String,
        required:[true,'Please add a name'],
     },
     email:{
        type:String,
        required:true,
        unique:true,
        trim : true,
        match:[
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,"Please enter an valid email"
        ]
     },
     password:{
        type:String,
        required:[true,'Please add a password'],
        minLength:[8,"password must be up to 8 characters"],
      //   maxLength:[18,"password must not be more than 18 characters"]
     },
     photo:{
        type:String,
        required:[true,'Please add a Photo'],
        default:""
     },
     phone:{
        type:String,
        default:"+91"
     },
     bio:{
        type:String,
        maxLength:[250,"Bio must not be more than 250 characters"],
        default:"bio"

     }

},{timestamps:true})

const User = mongoose.model('User',userSchema);
module.exports = User