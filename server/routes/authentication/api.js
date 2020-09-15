/*const express = require('express');
const router = express.Router();

const AuthenticationController = require('../../controller/authentication');
const CtrlProfile = require('../../controller/profile');
const auth = require('../../config/jwt');
require('../../config/passport');
*/

import Express from 'express';
import auth  from '../../config/jwt';
import AuthenticationController from '../../controller/authentication';
import { CtrlProfile } from '../../controller/profile';

const router = new Express.Router();

router.post('/register', (req, res) => {
  try {
    if (!req.body.email)
      return res.status(401).send({
        error_code: '103',
        error: 'You must enter an email address.',

      });

    if (!req.body.password)
      return res.status(401).send({
        error_code: '104',
        error: 'You must enter a password.'
      });

    AuthenticationController.register(req, res);

  } catch (err) {
    console.log(err);
    res.status(401).send({error: err});
  }
});

router.post('/login', (req, res, next) => {
  console.log(req.body);
  try {
    if (!req.body.email)
      return res.status(401).send({
        error_code: '103',
        error: 'You must enter an email address.'
      });

    if (!req.body.password)
      return res.status(401).send({
        error_code: '104',
        error: 'You must enter a password.'
      });
    
    AuthenticationController.login(req, res, next);
  } catch (err) {
    console.log('catch', err);
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

export default router;
// module.exports = router;



