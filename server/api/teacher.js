const router = require('express').Router();
const User = require('../db/models').User;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const hasher = require('./util').hasher;
const async = require('asyncawait/async');
const await = require('asyncawait/await');

//signup with Promises
// router.post('/', (req, res, next) => {
//   bcrypt.genSalt(saltRounds, function(err, salt){
//       bcrypt.hash(req.body.password, salt, function(err, hash){
//         User.findOne({where: {email: req.body.email }}).then((person) => {
//           if(person){
//             console.log('That email is taken. Please try another email.');
//             res.status(404).send(err);
//           } else {
//             User.create({
//               email: req.body.email,
//               password: hash,
//               userType: req.body.userType,
//               fName: req.body.fName,
//               lName: req.body.lName,
//               username: req.body.username
//             })
//             .then((newUser) => {
//               console.log("Signed Up New User: ", newUser);
//               res.status(201).send(newUser);
//             })
//           }
//         })
//         .catch(err => {
//           console.log("Network Error: ", err);
//         })
//       });
//     });
// });


//signup with async await
router.post('/', async ((req, res, next) => {
  try{
    const salt = await (bcrypt.genSalt(saltRounds));
    const hash = await (bcrypt.hash(req.body.password, salt));
    const person = await (User.findOne({where: {email: req.body.email }}));
    if(person){
        console.log('That email is taken. Please try another email.');
        res.status(404).send();
      } else {
        const newUser = await (User.create({
          email: req.body.email,
          password: hash,
          userType: req.body.userType,
          fName: req.body.fName,
          lName: req.body.lName,
          username: req.body.username
        }));
        console.log("Signed Up New User: ", {user: newUser, id_token: hasher(req.body.email)});
        res.status(201).send({user: newUser, id_token: hasher(req.body.email)});
      }
    } catch(e) {
      console.log("Invalid Login Credentials")
      res.status(404).send('Invalid Login Credentials');
    }
}));


// //login with Promises
// router.get('/:email/:creds', (req, res, next) => {
//   User.findOne({where: {email: req.params.email }}).then((user) => {
//     if(user){
//       bcrypt.compare(req.params.creds, user.password, function(err, data){
//         if(data){
//           console.log("User Logged In: ", {user: user, id_token: hasher(`${req.params.email}`)});
//           res.status(200).send({user: user, id_token: hasher(req.params.email)});
//         } else {
//           console.log('Invalid Login Credentials');
//           res.status(404).send('Invalid Login Credentials');
//         }
//       });
//     } else {
//       console.log('User Does Not Exist');
//       res.status(404).send('User Does Not Exist');
//     }
//   });
// });


//login with async
router.get('/:email/:creds', async((req, res, next) => {
  try{
    const user = await (User.findOne({where: {email: req.params.email }}));
    const data = await(bcrypt.compare(req.params.creds, user.password));
    console.log("User Logged In: ", {user: user, id_token: hasher(`${req.params.email}`)});
    res.status(200).send({user: user, id_token: hasher(req.params.email)});
  } catch(e) {
    console.log('User Does Not Exist');
    res.status(404).send('User Does Not Exist or Invalid Login Credentials');
  }
}));

module.exports = router;
