const mongoose = require('mongoose');

//create a schema | describing how the data should look
const CustomerSchema = mongoose.Schema({
    customerName1: {
        type: String,
        required: true
    },
    customerName2: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
});

//below creates the model gives it a name and tells it which schema to use for db atlas
module.exports = mongoose.model('Customers', CustomerSchema);