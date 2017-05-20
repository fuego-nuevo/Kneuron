const router = require('express').Router();
const User = require('../db/models').User;
let bcrypt = require('bcrypt');
const saltRounds = 10;

//signup
router.post('/', (req, res, next) => {
  bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash(req.body.password, salt, function(err, hash){
        User.findOne({where: {email: req.body.email }}).then((person) => {
          if(person){
            console.log('That email is being used. Please try another email.');
            res.status(404).send(err);
          } else {
            User.create({
              email: req.body.email,
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
  User.findOne({where: {email: userInfo.email }}).then((user) => {
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
