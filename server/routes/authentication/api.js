const express = require('express');
const router = express.Router();

const AuthController = require('../../controller/authentication');
const CtrlProfile = require('../../controller/profile');
const auth = require('../../config/jwt');
require('../../config/passport');

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

    AuthController.login(req, res);
  } catch (err) {
    res.status(401).send({error: err});
  }
});

router.get('/profile', auth, (req, res) => {
  try {
    CtrlProfile.profileRead(req, res);
  } catch (err) {
    res.status(401).send({error: err});
  }
});

router.post('/update-user-info', auth, (req, res) => {
  try {
    CtrlProfile.updateUserInfo(req, res);
  } catch (err) {
    res.status(401).send({error: err});
  }
});

module.exports = router;



