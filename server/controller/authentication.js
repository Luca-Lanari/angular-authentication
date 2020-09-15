'use strict';

import passport from 'passport';
import User from '../models/users';

class AuthenticationController {
  static register(req, res) {
    console.log(req.body);
    User.findOne({email: req.body.email})
    .then(result => {
      if (result) {
        return res.status(422).send({
          error_code: '107'
        });
      } else {
        let user = new User();
        console.log('USERRRRRRRR -----> ', user);
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.setPassword(req.body.password);
  
        user.save((err, user) => {
          if (err) {
            console.log(err);
            res.status(401).send({error: err});
          }
          let token;
          token = user.generateJwt();
          res.status(200).json({
            'user': {
              name: user.name,
              surname: user.surname,
              email: user.email
            },
            'token': token
          });
        });
      }
    }).catch(err => {
      console.log(err);
      res.status(401).send({error: err});
    });
  };
  
  static login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      let token;
  
      // If Passport throws/catches an error
      if (err) {
        res.status(404).json(err);
        return;
      }
  
      // If a user is found
      if (user) {

        token = user.generateJwt();
        res.status(200);
        res.json({
          'token': token
        });
      } else {
        // If user is not found
        res.status(401).json(info);
      }
    })(req, res, next);
  };
}

export default AuthenticationController;




/*
let passport = require('passport');
const User = require('../models/users');

module.exports.register = (req, res) => {

  User.findOne({email: req.body.email})
    .then(result => {
      if (result) {
        return res.status(422).send({
          error_code: '107'
        });
      } else {
        let user = new User();
        user.name = req.body.name;
        user.surname = req.body.surname;
        user.email = req.body.email;
        user.setPassword(req.body.password);

        user.save((err, user) => {
          if (err) {
            console.log(err);
            res.status(401).send({error: err});
          }
          let token;
          token = user.generateJwt();
          res.status(200).json({
            'user': {
              name: user.name,
              surname: user.surname,
              email: user.email
            },
            'token': token
          });
        });
      }
    }).catch(err => {
    console.log(err);
    res.status(401).send({error: err});
  });
};

module.exports.login = (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    let token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        'token': token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
}; */
