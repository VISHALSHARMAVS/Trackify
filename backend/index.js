import { configDotenv } from "dotenv";
import connectDB from "./db.js";
import {app} from "./app.js"

configDotenv({
    path:'./env'
})
const port = process.env.PORT || 4000;

connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server is running at port : ${port}`);
    })
})
.catch((error)=>{
    console.log("MongoDB connection failed ",error);
})