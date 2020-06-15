const jwt = require('express-jwt');
require('dotenv').config();

let auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

module.exports = auth;
