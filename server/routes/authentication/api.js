const express = require('express');
const router = express.Router();
const AuthController = require('../../controller/authentication');
const CtrlProfile = require('../../controller/profile');

const auth = require('../../config/jwt');

require('../../config/passport');

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
    if (!req.body.email)
      return res.status(401).send({error: 'You must enter an email address.'});

    if (!req.body.password)
      return res.status(401).send({error: 'You must enter a password.'});

    AuthController.register(req, res);
    // res.status(201).json({message: 'ok'});
  } catch (err) {
    console.log(err);
    res.status(401).send({error: err});
  }
});

router.post('/login', (req, res) => {
  try {
    if (!req.body.email)
      return res.status(401).send({error: 'You must enter an email address.'});

    if (!req.body.password)
      return res.status(401).send({error: 'You must enter a password.'});

    console.log('req.body login: ', req.body);
    AuthController.login(req, res);

  } catch (err) {
    res.status(401).send({error: err});
  }
});

router.get('/profile', auth, (req, res) => {
  try {
    console.log('req profile: ', req);
    CtrlProfile.profileRead(req, res);
  } catch (err) {
    res.status(401).send({error: err});
  }
});

module.exports = router;



