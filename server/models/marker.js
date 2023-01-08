const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PinSchema = new Schema({
    lng: {type: Number, required: true},
    lat: {type: Number, required: true},
    title: {type: String, required: true},
    pinType: {type: String, required: true},
    contents: {type: String},
    tags: [{type: String, required: true}],
    author: {type: mongoose.Types.ObjectId},
});

module.exports = mongoose.model("Marker", PinSchema);