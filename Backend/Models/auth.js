const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
})

const User = model("User", userSchema);

module.exports = User;