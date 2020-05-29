let passport = require('passport');
let mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports.register = (req, res) =>  {
  let user = new User();

  user.name = req.body.name;
  user.surname = req.body.surname;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(() => {
    let token;
    token = user.generateJwt();
    try {
      res.status(200);
      res.json({
        'token': token
      });
    } catch (err) {
      console.log(err);
      res.status(401).json(err);
    }
  });
};
