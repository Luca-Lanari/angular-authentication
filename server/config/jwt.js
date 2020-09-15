import Jwt from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();

const auth = Jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

export default auth;


/*const jwt = require('express-jwt');
require('dotenv').config();

let auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

module.exports = auth;*/
