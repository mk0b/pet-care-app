const express = require('express');
const router = express.Router();
const User = require('../models/User');

//create a new user
router.post('/', (req, res) => {
    console.log(req.body);
    const user = new User({
        
    });
});


module.exports = router;

