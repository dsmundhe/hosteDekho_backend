const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hashPassword: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    booking: {
        type: Array,
        required: false
    }
}, { timestamps: true });

const userModel = new mongoose.model('user', schema);
module.exports = userModel;