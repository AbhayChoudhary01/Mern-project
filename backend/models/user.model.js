const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timstamps: true,           //when the schema was created and modified
});

const User = mongoose.model('User', userSchema);
module.exports = User;
