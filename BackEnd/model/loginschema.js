const mongoose = require('mongoose');

const loginformat  = new mongoose.Schema({
    First: String,
    Last: String,
    Email: String,
    Password: String
})

const Userdata = mongoose.model('user',loginformat)
module.exports = Userdata