const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: String,
    password: String,
    mobile_no: Number
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel
