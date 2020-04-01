const mongoose = require('mongoose');

//create a schema | describing how the data should look
const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

//below creates the model gives it a name and tells it which schema to use for mlabs
module.exports = mongoose.model('Users', UserSchema);