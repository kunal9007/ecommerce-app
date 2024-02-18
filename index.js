//project start file
//starts DB, http server, adds routes

const mongoose = require('mongoose');
const express = require('express');

//get config from .env
require('dotenv').config()
const appConstants = require('./constants/app_constants');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

const MONGODB_URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT || 3001;

const options = {
    connectTimeoutMS: 30000,
};

//connect to mongoDB
mongoose.connect(MONGODB_URL, options).then(() => {

    console.log("Connected to %s", MONGODB_URL);
    console.log("App is running ... \n");
    console.log("Press CTRL + C to stop the process. \n");

}).catch(err => {
    console.error("App starting error:", err.message);
    process.exit(1);
});
const db = mongoose.connection;

//start express server
const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.sendStatus(200).end());

//add routes
app.use('/auth', authRoutes);
app.use('/product', productRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

//listen to this port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
