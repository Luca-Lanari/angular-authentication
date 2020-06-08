'use strict';

let passport = require('passport');
// let mongoose = require('mongoose');
// let User = mongoose.model('User');
const User = require('../models/users');

module.exports.register = (req, res) => {
  try {

    if (!req.body.email)
      return res.status(401).send({ error: 'You must enter an email address.'});

    if (!req.body.password)
      return res.status(401).send({ error: 'You must enter a password.'});

    User.findOne({email: req.body.email}, (err, existingUser) => {
      if (err)
        return res.status(401).send({ error: err});

      if (existingUser)
        return res.status(422).send({ error: 'That email address is already in use.'});

      let user = new User();
      user.name = req.body.name;
      user.surname = req.body.surname;
      user.email = req.body.email;
      user.setPassword(req.body.password);

      user.save((err, user) => {
        if (err) {
          console.log(err);
          return res.status(401).send({ error: err});
        }

        let token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          'user': user,
          'token': token
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports.login = (req, res) => {

  passport.authenticate('local', null,(err, user, info) => {
    let token;

    // If Passport throws/catches an error
    if (err) {
      return res.status(404).json(err);
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};
