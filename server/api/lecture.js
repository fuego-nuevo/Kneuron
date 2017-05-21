const router = require('express').Router();
const User = require('../db/models').User;
const Class = require('../db/models').Class;
const Lecture = require('../db/models').Lecture;
const antiHasher = require('./util').antiHasher;


//Post A Lecture For A Given Class From A Given Teacher
router.post('/', (req, res, next) => {
  User.findOne({ where: { email: antiHasher(req.body.auth_token) }})
    .then(teacher => {
      Class.findOne({ where: { teacherId: teacher.id, id: req.body.id, subject: req.body.subject }})
        .then(klass => {
          Lecture.findOne({ where: { classId: klass.id, name: req.body.name }})
            .then(lecture => {
              if(lecture){
                console.log(`${lecture.name} Lecture for ${klass.subject} already exists for ${teacher.fName} ${teacher.lName}...`);
                res.status(422).send(`${lecture.name} Lecture for ${klass.subject} already exists for ${teacher.fName} ${teacher.lName}...`);
              } else {
                Lecture.create({
                  name: req.body.name,
                  classId: req.body.id
                })
                .then(lecture => {
                  console.log("Lecture Posted To DB: ", lecture);
                  rest.status(201).send(lecture);
                })
                .catch(error => {
                  console.log("Error Posting To DB: ", error);
                  res.status(404).send();
                });
              }
            });
        })
        .catch(error => {
          console.log(`${teacher.fName} ${teacher.lName} Does Not Currently Have A ${klass.subject} Class.`);
          res.status(404).send();
        })
    })
    .catch(error => {
      console.log(`Error finding Teacher with email: ${antiHasher(req.body.auth_token)}`);
      res.status(404).send();
    })
});


//Get All Lectures For A Given Class From A Given Teacher
router.get('/:class_id/:auth_token/:subject', (req, res, next) => {
  //Find A Teacher With Their token_id From The Body
  User.findOne({where: { email: antiHasher(req.params.auth_token)}})
    .then(teacher => {
      //Find All Of Said Teacher's Classes
      Class.findOne({ where: { id: req.params.class_id, subject: req.params.subject, teacherId: teacher.id }})
        .then(klass => {
          //Find All Lectures With Class ID's
          Lecture.findAll({ where: { classId: klass.id }})
            .then(lectures => {
              //Return Lectures
              res.status(200).send(lectures);
            })
            .catch(error => {
              console.log(`${teacher.fName} ${teacher.lName}'s ${klass.subject} Class Does Not Have Any Lectures...}`);
              res.status(404).send();
            });
        })
    })
    .catch(error => {
      console.log(`Couldn't Find Teacher...`);
      res.status(404).send(`Couldn't Find Teacher`);
    })
});


//Update A Lecture For A Given Class From A Given Teacher
router.put('/', (req, res, next) => {
  User.findOne({ where: { email: antiHasher(req.body.auth_token)}})
    .then(teacher => {
      Class.findOne({ where: { id: req.body.class_id, subject: req.body.subject, teacherId: teacher.id}})
        .then(klass => {
          Lecture.findOne({ where: {name: req.body.lecture_name, classId: klass.id}})
            .then(lecture => {
              lecture.subject = req.body.subject;
              Lecture.update({
                subject: lecture.subject
              }, {
                where: { id: lecture.id}
              })
              .then(result => {
                res.status(200).send(result);
              })
              .catch(error => {
                console.log(`Error Updating ${lecture.name} Lecture For ${klass.subject} Class`);
                res.status(404).send();
              })
            })
            .catch(err => {
              console.log(`${teacher.fName} ${teacher.lName}'s ${klass.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error: `, err);
              res.status(404).send(`${teacher.fName} ${teacher.lName}'s ${klass.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error: `, err)
            })
        })
        .catch(error => {
          console.log(`${teacher.fName} ${teacher.lName} doesn't have a ${req.body.subject} class in the DB or Network Error: `, err);
          res.status(404).send(`${teacher.fName} ${teacher.lName} doesn't have a ${req.body.subject} class in the DB or Network Error: `, err)
        })
    })
    .catch(error => {
      console.log(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
      res.status(404).send(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
    })
})


//Delete A Lecture For A Given Class From A Given Teacher
router.delete('/', (req, res, next) => {
  Lecture.findOne({ where: { classId: req.body.class_id}})
    .then(lecture => {
      res.status(202).send(`${lecture} was marked for deletion...`);
      lecture.destroy({ force: true });
      res.status(204).send(`${lecture} was destroyed from DB`);
    })
    .catch(error => {
      console.log("Error Deleting Selected Lecture: ", error);
      res.status(404).send("Error Deleting Selected Lecture...");
    })
});


module.exports = router;
