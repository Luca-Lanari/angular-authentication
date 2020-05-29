let passport = require('passport');
let mongoose = require('mongoose');
let User = mongoose.model('User');


module.exports.login = (req, res) => {

  passport.authenticate('local', null, (err, user, info) => {
    let token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        'token' : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};
