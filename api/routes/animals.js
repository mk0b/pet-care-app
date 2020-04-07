const express = require('express');
const router = express.Router();
const Animal = require('../models/Customer');

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

/* GET */

/* PUT */

/* DELETE */

module.exports = router;