const express = require('express');
const router = express.Router();
const mongo = require('../../mongoUtils');
const passport = require('passport');
// const expressSession = require('express-session');
// const jwt = require('../../jwt');
// const middlewareAuth = require('server/config/passport');
// const authController = require('/server/controller/authentication').register;

// Error handling
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err === 'object' ? err.message : err;
  res.status(501).json(response);
};

let response = {
  status: 200,
  data: [],
  message: null
};

router.post('/registration', (req, res) => {
  try {
    mongo.connection(db => {
      console.log('REQ.BODY: ', req.body);

      // authController.register(req, res);
      let user = {
        name: req.body.name,
        email: req.body.email,
        // password: btoa(req.body.password)
        password: req.body.password
      };

      db.collection('users').findOne({email: req.body.email})
        .then(result => {
          if (!result) {
            db.collection('users')
              .insertOne(user);
            response.data = user;
            return res.json(response);
          } else {
            response.data = null;
            response.message = 'email already exists';
          }
          return res.json(response);
        });
    });
  } catch (err) {
    sendError(err, res);
  }
});

router.post('/login', (req, res) => {
  try {
    mongo.connection(db => {

    });
  } catch (err) {
    sendError(err, res);
  }

});

module.exports = router;



