const router = require('express').Router();
const User = require('../db/models').User;
let bcrypt = require('bcrypt');
const saltRounds = 10;
const hasher = require('./util').hasher;

//signup
router.post('/', (req, res, next) => {
  bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash(req.body.password, salt, function(err, hash){
        User.findOne({where: {email: req.body.email }}).then((person) => {
          if(person){
            console.log('That email is taken. Please try another email.');
            res.status(404).send(err);
          } else {
            User.create({
              email: req.body.email,
              password: hash,
              userType: req.body.userType,
              fName: req.body.fName,
              lName: req.body.lName,
              username: req.body.username
            })
            .then((newUser) => {
              console.log("Signed Up New User: ", newUser);
              res.status(201).send(newUser);
            })
          }
        })
        .catch(err => {
          console.log("Network Error: ", err);
        })
      });
    });
});

//login
router.get('/:email/:creds', (req, res, next) => {
  console.log(req.params.email);
  User.findOne({where: {email: req.params.email }}).then((user) => {
    if(user){
      bcrypt.compare(req.params.creds, user.password, function(err, data){
        if(data){
          console.log("User Logged In: ", {user: user, id_token: hasher('MarianoAlexJustinJason')});
          res.status(200).send({user: user, id_token: hasher('MarianoAlexJustinJason')});
        } else {
          console.log('Invalid Login Credentials');
          res.send('Invalid Login Credentials');
        }
      });
    } else {
      console.log('User Does Not Exist');
      res.status(404).send('User Does Not Exist');
    }
  });
});

module.exports = router;
