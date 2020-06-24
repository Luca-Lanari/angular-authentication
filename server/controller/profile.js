const mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports.profileRead = (req, res) => {
  // If no user ID exists in the JWT return a 401
  if (!req.payload._id) {
    res.status(401).json({
      'error_code': '105',
      'message': 'UnauthorizedError'
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

module.exports.updateUserInfo = (req, res) => {
  if (!req.payload._id) {
    res.status(401).json({
      'error_code': '105',
      'message': 'UnauthorizedError'
    });
  } else {
    User.findByIdAndUpdate(req.payload._id, {
      $set: {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city

      }
    }).exec((err, user) => {
      if (err) {
        res.status(401).json({
          'error_code': '106',
          'message': 'Unable to update user info'
        });
      }
      res.status(200).json(user);
    });
  }
};
