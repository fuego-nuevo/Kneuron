const router = require('express').Router();
const User = require('../db/models').User;
const Cohort = require('../db/models').Cohort;
const Lecture = require('../db/models').Lecture;
const antiHasher = require('./util').antiHasher;


// Post A Lecture For A Given Cohort From A Given Teacher
router.post('/', (req, res) => {
  User.findOne({ where: { email: antiHasher(req.body.auth_token) } })
    .then((teacher) => {
      Cohort.findOne({ where: { teacherId: teacher.id, id: req.body.id, subject: req.body.subject } })
        .then((cohort) => {
          Lecture.findOne({ where: { cohortId: cohort.id, name: req.body.name } })
            .then((lecture) => {
              if (lecture) {
                console.log(`${lecture.name} Lecture for ${cohort.subject} already exists for ${teacher.fName} ${teacher.lName}...`);
                res.status(422).send(`${lecture.name} Lecture for ${cohort.subject} already exists for ${teacher.fName} ${teacher.lName}...`);
              } else {
                Lecture.create({
                  name: req.body.name,
                  cohortId: req.body.id,
                })
                .then((lecture) => {
                  console.log('Lecture Posted To DB: ', lecture);
                  res.status(201).send(lecture);
                })
                .catch((error) => {
                  console.log('Error Posting To DB: ', error);
                  res.status(404).send();
                });
              }
            });
        })
        .catch((error) => {
          console.log(`${teacher.fName} ${teacher.lName} Does Not Currently Have A ${cohort.subject} Cohort.`);
          res.status(404).send(error);
        });
    })
    .catch((error) => {
      console.log(`Error finding Teacher with email: ${antiHasher(req.body.auth_token)}`);
      res.status(404).send(error);
    });
});


// Get All Lectures For A Given Cohort From A Given Teacher
router.get('/:cohort_id/:auth_token/:subject', (req, res) => {
  // Find A Teacher With Their token_id From The Body
  User.findOne({where: { email: antiHasher(req.params.auth_token) } })
    .then((teacher) => {
      // Find All Of Said Teacher's Cohort
      Cohort.findOne({ where: { id: req.params.cohort_id, subject: req.params.subject, teacherId: teacher.id } })
        .then((cohort) => {
          // Find All Lectures With Cohort ID's
          Lecture.findAll({ where: { cohortId: cohort.id } })
            .then((lectures) => {
              // Return Lectures
              res.status(200).send(lectures);
            })
            .catch((error) => {
              console.log(`${teacher.fName} ${teacher.lName}'s ${cohort.subject} Cohort Does Not Have Any Lectures...}`);
              res.status(404).send();
            });
        });
    })
    .catch((error) => {
      console.log('Could not Find Teacher...');
      res.status(404).send(`Couldn't Find Teacher: ${error}`);
    });
});


// Update A Lecture For A Given Cohort From A Given Teacher
router.put('/', (req, res) => {
  User.findOne({ where: { email: antiHasher(req.body.auth_token) } })
    .then((teacher) => {
      Cohort.findOne({ where: { id: req.body.cohort_id, subject: req.body.subject, teacherId: teacher.id } })
        .then((cohort) => {
          Lecture.findOne({ where: {name: req.body.lecture_name, cohortId: cohort.id } })
            .then((lecture) => {
              lecture.subject = req.body.subject;
              Lecture.update({
                subject: lecture.subject,
              }, {
                where: { id: lecture.id },
              })
              .then((result) => {
                res.status(200).send(result);
              })
              .catch((error) => {
                console.log(`Error Updating ${lecture.name} Lecture For ${cohort.subject} Cohort`);
                res.status(404).send(error);
              })
            })
            .catch((err) => {
              console.log(`${teacher.fName} ${teacher.lName}'s ${cohort.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error: `, err);
              res.status(404).send(`${teacher.fName} ${teacher.lName}'s ${cohort.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error: `, err);
            })
        })
        .catch((error) => {
          console.log(`${teacher.fName} ${teacher.lName} doesn't have a ${req.body.subject} cohort in the DB or Network Error: `, error);
          res.status(404).send(`${teacher.fName} ${teacher.lName} doesn't have a ${req.body.subject} cohort in the DB or Network Error: `, error);
        });
    })
    .catch((error) => {
      console.log(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
      res.status(404).send(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
    });
});


// Delete A Lecture For A Given Cohort From A Given Teacher
router.delete('/', (req, res) => {
  Lecture.findOne({ where: { cohortId: req.body.cohort_id } })
    .then((lecture) => {
      res.status(202).send(`${lecture} was marked for deletion...`);
      lecture.destroy({ force: true });
      res.status(204).send(`${lecture} was destroyed from DB`);
    })
    .catch((error) => {
      console.log('Error Deleting Selected Lecture: ', error);
      res.status(404).send('Error Deleting Selected Lecture...');
    });
});


module.exports = router;
