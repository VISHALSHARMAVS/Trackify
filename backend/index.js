const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./routes/user.route.js');
const connectionDB = require('./db.js');
const errorHandling = require('./middleware/errorHandling.js');

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/user', userRoute);

// Error handling middleware
app.use(errorHandling);

const PORT = process.env.PORT || 3000;

// Database connection and server start
connectionDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
});
