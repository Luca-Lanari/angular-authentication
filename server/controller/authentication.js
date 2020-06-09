'use strict';

let passport = require('passport');
const User = require('../models/users');
require('../config/passport');

module.exports.register = (req, res) => {
  try {

    //TODO Fix connection to mongoose
    console.log('quiiiiiiiiiiii');
    let user = new User();
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.email = req.body.email;
    user.setPassword(req.body.password);

    user.save((err, user) => {
      console.log('sei nel save di mongoose');
      if (err) {
        console.log(err);
        return res.status(401).send({error: err});
      }

      let token;
      token = user.generateJwt();
      res.status(200);
      return res.json({
        'user': user,
        'token': token
      });
    });

    // User.findOne({email: req.body.email}, (err, existingUser) => {
    //   console.log('inizio findOne');
    //   if (err)
    //     return res.status(401).send({error: err});
    //
    //   if (existingUser)
    //     return res.status(422).send({error: 'That email address is already in use.'});
    //   console.log('quii prima di User');
    //
    //   let user = new User();
    //   user.name = req.body.name;
    //   user.surname = req.body.surname;
    //   user.email = req.body.email;
    //   user.setPassword(req.body.password);
    //
    //   user.save((err, user) => {
    //     console.log('sei nel save di mongoose');
    //     if (err) {
    //       console.log(err);
    //       return res.status(401).send({error: err});
    //     }
    //
    //     let token;
    //     token = user.generateJwt();
    //     res.status(200);
    //     res.json({
    //       'user': user,
    //       'token': token
    //     });
    //   });
    // });
  } catch (err) {
    console.log(err);
  }
};

module.exports.login = (req, res) => {

  passport.authenticate('local', null, (err, user, info) => {
    let token;
    console.log('You are inside custom passport local');
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
