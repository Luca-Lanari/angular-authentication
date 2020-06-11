const mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports.profileRead = (req, res) => {
  // If no user ID exists in the JWT return a 401
  console.log('req.payload._id: ', req.payload._id);
  if (!req.payload._id) {
    res.status(401).json({
      "message": "UnauthorizedError: private profile"
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
