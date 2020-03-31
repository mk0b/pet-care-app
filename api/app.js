
//importing express
const express = require('express');
//executing express so we can create routes.
const app = express();
const mongoose = require('mongoose');
//below will give us access to what we have created in .env
require('dotenv/config');

//Middleware


//Routes
app.get('/', (req, res) => {
    res.send('Welcome to my pet care app API!');
});

//Connect to db
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Succesfully connected to MongoDB Atlas!')
);

//TODO: Add a message to the console saying that the server has started and the port iti s listening on. Switch this to 8000?
//listening to the server
app.listen(5000);