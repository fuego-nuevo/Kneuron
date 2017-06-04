const router = require('express').Router();
const bcrypt = require('bcrypt');
const util = require('./util');
const faker = require('faker');
const db = require('../db/models');

const saltRounds = 10;
let password;
const postSchool = (req, res) => {
  console.log(req.body, 'line 8 for sure');
  bcrypt.genSalt(saltRounds)
      .then((salt) => {
        bcrypt.hash(req.body.password, salt)
          .then((hash) => {
          console.log(hash, 'line fifteeeeeen');
            password = hash;
            console.log('passs line seeenteeen, ', password);
          });
      })
      .then(() => {
        console.log('do we get past hashing password line 14 ,', password);
        db.User.findOrCreate({ where: { email: req.body.email },
          defaults: {
            email: req.body.email.toLowerCase(),
            password,
            userType: 2,
            fName: req.body.fName,
            lName: req.body.lName,
            school_id: req.body.school_id,
          } })
          .spread((newUser, created) => {
          console.log('do we get past user creation  , ', newUser);
            if (created) {
              console.log('Signed Up New User: ', { user: newUser, id_token: util.hasher(req.body.email) });
              db.School.findOrCreate({ where: { name: req.body.school.toUpperCase(), code: `${faker.hacker.adjective()}${faker.hacker.noun()}` } })
                .spread((school, made) => {
                  if (made) {
                    console.log('posted school ', school);
                    res.status(201).send({ user: newUser, id_token: util.hasher(req.body.email) });
                  } else {
                    console.log('fucked up making school');
                    db.User.destroy({ where: { email: req.body.email } })
                      .then(() => {
                        res.status(400).send('the school is already there bruh damn!!!!');
                      });
                  }
                });
            } else {
              console.log('That email is taken. Please try another email.');
              res.status(404).send('That email is taken. Please try another email.');
            }
          })
          .catch((err) => {
            console.log('some mayhem with your find or create method :( ,', err);
          });
      });
};


// const postSchool = async (req, res) => {
//   db.School.findOne({where: {name: req.body.school.toUpperCase()}})
//     .then((res) => {
//       req.body['name'] = req.body.name;
//       const newSchool = await db.School.create(req.body);
//       console.log('School created');
//       res.status(200).send(newSchool);
//     })
//     .catch((err) => {
//       console.log('School already exists');
//       res.status(404).send('School already exists');
//     });
//
// };

const updateSchool = async (req, res) => {
  try {
    const school = await db.School.findOne({ where: { id: req.params.school_id } });
    if (school) {
      req.body['name'] = req.body.name;
      const updatedSchool = school.update(req.body);
      console.log('School updated');
      res.status(200).send(updatedSchool);
    } else {
      console.log('School not found');
      res.status(404).send('School not found');
    }
  } catch (error) {
    console.log('Error in updateSchool');
    res.status(500).send(error);
  }
};

router.post('/', postSchool);
router.put('/:school_id', updateSchool);

module.exports = router;
