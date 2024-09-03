const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  picture: {
    type: String
  },
  verified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const User = model("User", userSchema);

module.exports = User;
