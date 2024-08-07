
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

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
        default:"https://www.shutterstock.com/shutterstock/photos/2294125351/display_1500/stock-photo-digital-nomad-in-bali-a-man-on-a-business-trip-or-vacation-takes-a-coffee-break-in-a-busy-cafe-2294125351.jpg"
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

userSchema.pre("save",async function (next) {
   if (this.isModified('password')) {
      return next();
   }
   
   const salt = await bcrypt.genSalt(10);
   const hashedPassword =  bcrypt.hash(this.password, salt);
   this.password = hashedPassword;
})

const User = mongoose.model('User',userSchema);
export default User