import mongoose from 'mongoose';

const User = mongoose.model('User');

class ProfileController {
  static profileRead(req, res) {
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
      res.status(401).json({
        'error_code': '105',
        'message': 'UnauthorizedError'
      });
    } else {
      // Otherwise continue
      // User
      //   .findById(req.payload._id)
      //   .exec((err, user) => {
      //     res.status(200).json(user);
      //   });
      User.findById(req.payload._id)
      .then(user => {
        res.status(200).json(user);
      }).catch(err => {
        res.status(401).json({
          'error_code': '105',
          'message': 'UnauthorizedError',
          'err' : err
        });
      })
    }
  };

  static updateUserInfo(req, res) {
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
      }).then(user => {
        res.status(200).json(user);
      }).catch(err => {
          res.status(401).json({
            'error_code': '106',
            'message': 'Unable to update user info',
            'err': err
          });
      });

      // User.findByIdAndUpdate(req.payload._id, {
      //   $set: {
      //     name: req.body.name,
      //     surname: req.body.surname,
      //     email: req.body.email,
      //     address: req.body.address,
      //     city: req.body.city
  
      //   }
      // }).exec((err, user) => {
      //   if (err) {
      //     res.status(401).json({
      //       'error_code': '106',
      //       'message': 'Unable to update user info'
      //     });
      //   }
      //   res.status(200).json(user);
      // });
    }
  };
}

export default ProfileController;




/*const mongoose = require('mongoose');
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
};*/
