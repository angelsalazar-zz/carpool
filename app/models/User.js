//const config = require('../configs/setup');
const serviceLocator = require('../lib/service_locator');
const mongoose = serviceLocator.get('mongoose');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        trim : true,
        required : true,
        unique: true
    },
    firstname : {
        type : String, 
        trim : true,
        required : true
    },
    lastname : {
        type : String,
        trim : true,
        required : true
    },
    phone : {
        type : String, 
        trim : true,
        required : true
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('Users', userSchema);