const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const mongooseUtils = require('../../mongoUtils');
// const passport = require('passport');

const AuthController = require('../../controller/authentication');
const CtrlProfile = require('../../controller/profile');
const auth = require('../../config/jwt');
// const expressSession = require('express-session');
// const jwt = require('../../jwt');
// const middlewareAuth = require('server/config/passport');

// Error handling
// const sendError = (err, res) => {
//   response.status = 501;
//   response.message = typeof err === 'object' ? err.message : err;
//   res.status(501).json(response);
// };
//
// let response = {
//   status: 200,
//   data: [],
//   message: null
// };

router.post('/register', (req, res) => {
  try {
    console.log(req.body);
    AuthController.register(req, res);
  } catch (err) {
    console.log(err);
    return res.json({
      status: err.status,
      error: err.error,
      message: err.message
    });
  }
});

router.post('/login', (req, res) => {
  try {
  } catch (err) {
    return res.json({
      error: err
    });
  }
});

router.get('/profile', auth, (req, res) => {
  try {
    console.log('req profile: ', req.body);
    CtrlProfile.profileRead(req, res);
  } catch (err) {
    res.status(401).json({
      error: err
    })
  }
});

module.exports = router;



