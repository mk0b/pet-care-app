const express = require('express');
const router = express.Router();
const User = require('../models/User');

/* HELPER FUNCTIONS */

/* Helper function to cut down on code for each route to handle async requests.*/
function asyncHelper(callback){
    return async(req, res, next) => {
        try {
            await callback(req, res, next)
        } catch(error){
            res.status(500).json({ message: error.message });
        }
    }
}

//TODO: Add appropriate status codes and error messaging

/* POST */

//create a new user
router.post('/', asyncHelper(async(req, res) => {
    try {
        console.log('Req Body / Post: ', req.body);
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            emailAddress: req.body.emailAddress,
            password: req.body.password
        });
        await user.save();
        //setting the status code to 201 and setting the location and responding with nothing back.
        res.status(201).location('/').end();
        console.log('User succesfully created!');
    } catch (error) {
        console.log('An error occurred: ', error.name);
        //only putting 500 for bad request for now.
        res.status(500).json({ message: error});
    }
}));

/* GET */

router.get('/', asyncHelper(async(req, res) => {
    try {
        //get all of the users
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.json({ message: error });
    }
}));


/* PUT */

/* DELETE */

module.exports = router;

