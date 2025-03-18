const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number },
    message: { type: String, required: true },
});

const Contactdata = mongoose.model('Contact', contactSchema);
module.exports = Contactdata;
