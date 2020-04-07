const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');

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

/* POST */

//create a new animal
router.post('/', asyncHelper(async(req, res) => {
    try {
        console.log('Req Body / POST: ', req.body);
        const animal = new Animal({
            petName: req.body.petName,
            petType: req.body.petType,
            petBreed: req.body.petBreed,
            petImg: req.body.petImg,
            notes: req.body.notes
        });
        await animal.save();
        res.status(201).location('/').end();
    } catch (error) {
        console.log('An error occurred: ', error.name);
        res.status(401).json({ message: error });
    }
}));

/* GET */

//get a list of all animals
router.get('/', asyncHelper(async(req, res) => {
    try {
        const animals = await Animal.find();
        res.json(animals);
    } catch (error) {
        res.json({ message: error });
    }
}));

//get a specific animal
router.get('/:animalId', asyncHelper(async(req, res) => {
    try {
        const animal = await Animal.findById(req.params.animalId);
        res.json(animal);
    } catch (error) {
        res.json({ message: error });
    }
}));

/* PUT */

//update an animal
router.put('/:animalId', asyncHelper(async(req, res) => {
    try {
        const animal = await Animal.updateOne(
            { _id: req.params.animalId },
            { $set: {
                petName: req.body.petName,
                petType: req.body.petType,
                petBreed: req.body.petBreed,
                petImg: req.body.petImg,
                notes: req.body.notes
            }}
        );
        res.status(204).end();
        console.log('Animal was updated!');
    } catch (error) {
        console.log({ message: error });
    }
}));


/* DELETE */

module.exports = router;