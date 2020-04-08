const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

//TODO: set app up for this

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

//create a company
router.post('/', asyncHelper(async(req, res) => {
    try {
        console.log('Req Body / POST: ', req.body);
        const company = new Company({
            companyName: req.body.companyName
        });
        await company.save();
        res.status(201).location('/').end();
    } catch (error) {
        console.log('An error occurred: ', error.name);
        res.status(401).json({ message: error });
    }
}));

/* GET */

//get a list of all companies
router.get('/', asyncHelper(async(req,res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.json({ message: error });
    }
}));

//get a specific company
router.get('/:companyId', asyncHelper(async(req, res) => {
    try {
        const company = await Company.findById(req.params.companyId);
        res.json(company);
    } catch (error) {
        res.json({ message: error });
    }
}));

/* PUT */

//update a company
router.put('/:companyId', asyncHelper(async(req, res) => {
    try {
        const company = await Company.updateOne(
            { _id: req.params.companyId},
            { $set: { companyName: req.body.companyName} }
        );
        res.status(204).end();
        console.log({ message: error });
    } catch (error) {
        console.log({ message: error });
    }
}));

/* DELETE */

router.delete('/:companyId', asyncHelper(async(req, res) => {
    try {
        const company = await Company.deleteOne({ _id: req.params.companyId });
        res.status(204).end();
        console.log('Company was deleted.');
    } catch (error) {
        console.log({ message: error });
    }
}));

module.exports = router;