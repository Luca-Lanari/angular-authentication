import passport from 'passport';
import LocalStrategy from 'passport-local';
import mongoose from 'mongoose';

const localStrategy = LocalStrategy.Strategy;
const User = mongoose.model('User');

passport.use(new localStrategy({
  usernameField: 'email'
}, (username, password, done) => {
  User.findOne({ email: username }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      return done(null, false, {
        error_code: '101',
        message: 'User not found!',
      });
    }

    if (!user.validPassword(password)) {
      return done(null, false, {
        error_code: '102',
        message: 'Password is wrong'
      })
    }

    return done(null, user);
  });
}));

/*const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, (username, password, done) => {
  User.findOne({ email: username }, (err, user) => {
    if (err) { return done(err); }

    if (!user) {
      return done(null, false, {
        error_code: '101',
        message: 'User not found!',
      });
    }

    if (!user.validPassword(password)) {
      return done(null, false, {
        error_code: '102',
        message: 'Password is wrong'
      })
    }

    return done(null, user);
  });
})); */



