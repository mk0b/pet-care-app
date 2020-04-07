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
router.post();


/* GET */

/* PUT */

/* DELETE */

module.exports = router;

