const jwt = require('express-jwt');

let auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

module.exports = auth;
