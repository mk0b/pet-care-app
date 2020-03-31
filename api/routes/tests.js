const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Test Home Route');
});


module.exports = router;