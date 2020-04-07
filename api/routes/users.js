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
//add more error handling?

//TODO: Add auth handling

//TODO: Add password hashing with bcryptjs

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
        console.log('User successfully created!');
    } catch (error) {
        console.log('An error occurred: ', error.name);
        res.status(401).json({ message: error});
    }
}));

/* GET */

//get a list of all users
router.get('/', asyncHelper(async(req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.json({ message: error });
    }
}));

//get a specific user
router.get('/:userId', asyncHelper(async(req, res) => {
    try {
        //getting the userId from the URL
        console.log('User ID: ', req.params.userId);
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        res.json({ message: error });
    }
}))


/* PUT */

//basically patch is a partial update only what has been changed and put replaces all items

//PATCH - if I put all of the items there and only one is updated the others show as null.

//I think I am going to switch this to put for now.

router.put('/:userId', asyncHelper(async(req, res) => {
    try {
        const user = await User.updateOne(
            { _id: req.params.userId },
            { $set: { firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        emailAddress: req.body.emailAddress,
                        password: req.body.password
                    } 
        });
        res.status(204).end();
        console.log(`${user} was updated!`);
    } catch (error) {
        console.log({ message: error});
    }
}));

/* DELETE */

//delete a user
router.delete('/:userId', asyncHelper(async(req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params.userId }, (err) => {
            if (err) {
                return handleError(err);
            }
        });
        res.status(204).end();
        console.log(`${user} was successfully deleted.`);
    } catch (error) {
        console.log({ message: error});
    }
}));


module.exports = router;

