const mongoose = require('mongoose');

//TODO: This will get felshed out more but for now just company name

//create a schema | describing how the data should look
const CompanySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
});

//below creates the model gives it a name and tells it which schema to use for db atlas
module.exports = mongoose.model('Companies', CompanySchema);