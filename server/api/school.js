const router = require('express').Router();
const bcrypt = require('bcrypt');
const util = require('./util');
const faker = require('faker');
const db = require('../db/models');

const saltRounds = 10;
let password;

const fetchSchoolInfo = (req, res) => {
  db.User.findOne({ where: { email: util.antiHasher(req.params.auth_token) } })
    .then((user) => {
      db.Cohort.findAll({
        where: {
          school_id: user.school_id,
        },
        include: [{ model: db.Result }],
      })
        .then((classes) => {
          console.log('found classes ,', classes);
          res.status(200).send(classes);
        })
        .catch((err) => {
          console.log('could not find classes ,', err);
          res.status(500).send('could not find any classes');
        });
    })
    .catch((err) => {
      console.log('could not find user, auth token maybe wrong? ,', err);
      res.status(500).send('could not find user');
    });
};

const postSchool = (req, res) => {
  console.log(req.body, 'line 8 for sure');
  bcrypt.genSalt(saltRounds)
    .then((salt) => {
      bcrypt.hash(req.body.password, salt)
        .then((hash) => {
          password = hash;
        })
        .then(() => {
          console.log('do we get past hashing password line 14 ,', password);
          db.User.findOrCreate({
            where: { email: req.body.email },
            defaults: {
              email: req.body.email.toLowerCase(),
              password,
              userType: 2,
              fName: req.body.fName,
              lName: req.body.lName,
            },
          })
            .spread((newUser, created) => {
              console.log('user was created');
              if (created) {
                console.log('was the user actually created?');
                db.School.findOrCreate({
                  where: { name: req.body.school.toUpperCase() },
                  defaults: {
                    code: `${faker.hacker.adjective()}${faker.hacker.noun()}`,
                  },
                })
                  .spread((school, made) => {
                    console.log('did we get in the spread at least line 39!!!!!!!! , ', school);
                    if (made) {
                      console.log('school was created');
                      newUser.update({ school_id: school.id })
                        .then(() => {
                          res.status(201).send({ user: newUser, id_token: util.hasher(req.body.email) });
                        })
                        .catch((err) => {
                          console.log('error updating school dude  , ', err);
                        });
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
    });
};

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

router.get('/:auth_token', fetchSchoolInfo);
router.post('/', postSchool);
router.put('/:school_id', updateSchool);

module.exports = router;

