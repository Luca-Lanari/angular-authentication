const mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports.profileRead = (req, res) => {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      'message': 'UnauthorizedError: private profile'
    });
  } else {
    // Otherwise continue
    User
      .findById(req.payload._id)
      .exec((err, user) => {
        res.status(200).json(user);
      });
  }
};

// TODO fix update values into db
module.exports.updateUserInfo = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      'message': 'UnauthorizedError: to get updateUserInfo'
    });
  } else {
    console.log('req body: ', req.body);
    User.findByIdAndUpdate(req.payload._id, {$set: req.body}, (err, user) => {
      if (err) {
        res.status(401).json(err);
      }
      res.status(200).json(user);
    });
  }
    // User.findById(req.payload._id)
    //   .exec((err, user) => {
    //     res.status(200).json(user);
    //   });


};
