const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function generateAuthToken() {
  return jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).email()
      .required(),
    password: Joi.string().min(5).max(255).required(),
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
