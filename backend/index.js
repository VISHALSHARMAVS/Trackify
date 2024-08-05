const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectionDB = require('./db.js');

const app = express();

const PORT= process.env.PORT || 3000;
connectionDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
        
    })
}).catch((error)=>{
    console.log(error);
    
})
