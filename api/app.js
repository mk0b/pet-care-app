
//importing express
const express = require('express');
//executing express so we can create routes.
const app = express();
const mongoose = require('mongoose');
//below will give us access to what we have created in .env
require('dotenv/config');

//middleware
app.use(express.json());

//Import routes
const userRoutes = require('./routes/users');
const companyRoutes = require('./routes/companies');
const customerRoutes = require('./routes/customers');
const animalRoutes = require('./routes/animals');

//using routes
app.use('/users', userRoutes);
app.use('/companies', companyRoutes);
app.use('/customers', customerRoutes);
app.use('/animals', animalRoutes);


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

//listening to the server
app.listen(5000, () => {
    console.log('Listening on port 5000.');
});