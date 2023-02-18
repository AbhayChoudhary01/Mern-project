const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    username: {type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required: true},
    date: {type: Date, required: true},
}, {
    timstamps: true,           //when the schema was created and modified
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;