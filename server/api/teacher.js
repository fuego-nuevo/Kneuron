const router = require('express').Router();
const User = require('../db/models').User;
let bcrypt = require('bcrypt');
const saltRounds = 10;

//signup
router.post('/', (req, res, next) => {
  bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash(req.body.password, salt, function(err, hash){
        User.findOne({where: {username: req.body.username }}).then((person) => {
          if(person){
            console.log('That username is taken. Please try another username.');
            res.status(404).send(err);
          } else {
            User.create({
              username: req.body.username,
              password: hash
            })
            .then((newUser) => {
              res.status(201).send(newUser);
            })
          }
        });
      });
    });
});

//login
router.get('/:credentials', (req, res, next) => {
  const userInfo = JSON.parse(req.params.credentials);
  User.findOne({where: {username: userInfo.username }}).then((user) => {
    if(user){
      bcrypt.compare(userInfo.password, user.password, function(err, data){
        if(data){
          console.log("User Logged In");
          res.status(200).send(user);
        } else {
          console.log('Invalid Login Credentials');
          res.send('Invalid Login Credentials');
        }
      });
    } else {
      console.log('Invalid Login Credentials');
      res.send('User Does Not Exist');
    }
  });
});

module.exports = {
  signupUser,
  loginUser
}