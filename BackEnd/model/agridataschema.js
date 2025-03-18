const mongoose = require('mongoose');

const agridataSchema = new mongoose.Schema({
    name: { type: String, required: true }, 
    location: { type: String, required: true }, 
    district: { type: String, required: true },
    farmsize: { type: Number, required: true }, 
    soil: { type: String, required: true }, 
    irrigation: { type: String, required: true }, 
    preferredcrop: { type: String, required: true },
    prevcrop: { type: String }, 
    date: { type: Date, default: Date.now }, 
    pdhistory: { type: String }, 
    budget: { type: Number, required: true }, 
});

const Agridata = mongoose.model('Agridata', agridataSchema);

module.exports = Agridata;
