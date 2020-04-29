const mongoose = require('mongoose');

//create a schema | describing how the data should look
const AnimalSchema = mongoose.Schema({
    petName: {
        type: String,
        required: true
    },
    petType: {
        type: String,
        required: false
    },
    petBreed: {
        type: String,
        required: true
    },
    petImg: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    //db association with customer
    customer: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Customers'
    }
});

//below creates the model gives it a name and tells it which schema to use for db atlas
module.exports = mongoose.model('Animals', AnimalSchema);