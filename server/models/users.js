import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      surname: {
        type: String,
        required: true
      },
      address: {
        type: String,
        default: '',
      },
      city: {
        type: String,
        default: '',
      },
      hash: String,
      salt: String
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512',).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {

  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    surname: this.surname,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET);
};

const User = mongoose.model('User', userSchema);

export default User;

/* const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema ({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  address: {
    type: String,
    default: '',
  },
  city: {
    type: String,
    default: '',
  },
  hash: String,
  salt: String
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function (password) {
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512',).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {

  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    surname: this.surname,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET);
};

const User = mongoose.model('User', userSchema);
module.exports =  User;*/

