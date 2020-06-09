const express = require('express');
const router = express.Router();
const AuthController = require('../../controller/authentication');
const CtrlProfile = require('../../controller/profile');

const auth = require('../../config/jwt');


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
    console.log('REGISTER REQ.BODY', req.body);

    if (!req.body.email)
      return res.status(401).send({error: 'You must enter an email address.'});

    if (!req.body.password)
      return res.status(401).send({error: 'You must enter a password.'});





    AuthController.register(req, res);
    res.status(201).json({message: 'ok'});
  } catch (err) {
    console.log(err);
    res.json({
      status: err.status,
      error: err.error,
      message: err.message
    });
  }
});

router.post('/login', (req, res) => {
  try {
    AuthController.login(req, res);
    res.status(201).json({message: 'ok'});
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
    res.status(201).json({message: 'ok'});
  } catch (err) {
    res.status(401).json({
      error: err
    })
  }
});

module.exports = router;



