const jwt = require('express-jwt');
require('dotenv').config();

//TODO FIX process.env
console.log('process env: ', process.env.JWT_SECRET);
let auth = jwt({
  secret: 'mySecretKey_22',
  userProperty: 'payload'
});

module.exports = auth;
