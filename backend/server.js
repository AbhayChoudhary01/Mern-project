const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();     //So that we can have our variable in dotenv file 

const app = express();          // this is how we create the express server 
const port = process.env.PORT || 5000; //The port of service is on 

app.use(cors());                // the cors middle ware
app.use(express.json());        // this is going to allow us to parse json because server will be sending and receiving json

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const exercisesRouter = require('./router/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.listen(port, () => {                             
    console.log(`Server is running on port: ${port}`); //it starts the server/start listening to the server
});