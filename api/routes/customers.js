const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

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

//create a new customer
router.post('/', asyncHelper(async(req, res) => {
    try {
        console.log('Req Body / POST: ', req.body);
        const customer = new Customer({
            customerName1: req.body.customerName1,
            customerName2: req.body.customerName2,
            phone: req.body.phone,
            emailAddress: req.body.emailAddress,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
        });
        await customer.save();
        res.status(201).location('/').end();
    } catch (error) {
        console.log('An error occurred: ', error.name);
        res.status(401).json({ message: error});
    }
}));


/* GET */

//get a list of all customers
router.get('/', asyncHelper(async(req, res) => {
    try {
        const customers = await Customer.find();
        res.send(customers);
    } catch (error) {
        res.json({ message: error });
    }
}));

//get a specific customer
router.get('/:customerId', asyncHelper(async(req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerId);
        res.json(customer);
    } catch (error) {
        res.json({ message: error });
    }
}));


/* PUT */

router.put('/:customerId', asyncHelper(async(req, res) => {
    try {
        const customer = await Customer.updateOne(
            { _id: req.params.customerId },
            { $set: {
                    customerName1: req.body.customerName1,
                    customerName2: req.body.customerName2,
                    phone: req.body.phone,
                    emailAddress: req.body.emailAddress,
                    streetAddress: req.body.streetAddress,
                    city: req.body.city,
                    state: req.body.state,
                    country: req.body.country,
                    }
            });
            res.status(204).end();
            console.log('User was updated!');
    } catch (error) {
        console.log({ message: error });
    }
}));

/* DELETE */

module.exports = router;

