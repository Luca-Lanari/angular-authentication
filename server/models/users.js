const mongoose = require('mongoose');
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
  hash: String,
  salt: String
});

// TODO Fix salt and hash
userSchema.methods.setPassword = (password) => {
  this.salt = 'salt';
  this.hash = 'hash';
  // this.salt = crypto.randomBytes(16).toString('hex');
  // this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = (password) => {
  console.log('password: ', password);
  let hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512',).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = () => {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET");
};

const User = mongoose.model('User', userSchema);
module.exports =  User;

