const router = require('express').Router();
const User = require('../db/models').User;
const Class = require('../db/models').Class;
const antiHasher = require('./util').antiHasher;




//Create A New Class For A Given Teacher
router.post('/', (req, res, next) => {
  User.findOne({where: { email: antiHasher(req.body.auth_token) }})
    .then(teacher => {

      Class.findOne({where: {id: teacher.id}})
        .then(class => {
            console.log(`${teacher.fName teacher.lName} already has a ${class.subject} class`, class);
            res.status(204).send(`${teacher.fName teacher.lName} already has a ${class.subject} class`);
        });

      Class.create({ subject: req.body.subject, teacherId: teacher.id})
        .then(newClass => {
          console.log(`${teacher.fName teacher.lName} just added a new ${newClass.subject} class to their schedule.`, newClass);
          res.status(201).send(newClass);
        })

    })
    .catch(error => {
      console.log('Teacher Does Not Exist In The DB...');
      res.status(404).send();
    })
});


//Get All Classes For A Given Teacher
router.get('/:auth_token', (req, res, next) => {
  User.findOne({ where: { email: antiHasher(req.params.auth_token) }})
    .then(teacher => {
      Class.findAll({where: { teacherId: teacher.id }})
        .then(classes => {
          console.log(`${teacher.fName} ${teacher.lName}'s Classes Grabbed: `, classes);
          res.status(200).send(classes);
        })
        .catch(err => {
          console.log(`Coudn't Get ${teacher.fName}'s Classes Because: `, err);
          res.status(404).send();
        })
    })
    .catch(err => {
      console.log("That Teacher Does Not Exist In DB: ", err);
      res.status(404).send();
    })
});


//Delete A Given Class From A Teachers List of Classes
router.delete('/', (req, res, next) => {
  Class.findOne({where: {id: req.body.class_id}})
    .then(class => {
      console.log("Class Was Successfully Deleted: ", class);
      res.status(202).send(`${class} was marked for deletion...`);
      class.destroy({ force: true });
      res.status(204).send(`${class} was destroyed from DB`);
    })
    .catch(err => {
      console.log("Error Deleting Selected Class... Class Does Not Exist: ", err);
      res.status(404).send("Error Deleting Selected Class... Class Does Not Exist...");
    })
});


//Update Information Of A Given Class From A Given Teacher
router.put('/', (req, res, next) => {
  User.findOne{ where: { email: antiHasher(req.body.auth_token) }}
    .then(teacher => {
      Class.findOne({where: {id: req.body.class_id, teacherId: teacher.id}})
      .then(class => {
        res.status(202).send(`${class} was marked for updating...`);
        class.subject = req.body.subject;
        Class.update({
          subject: class.subject;
        }, {
          where: { id: class.id }
        })
        .then(result => {
          res.status(200).send(result);
        })
        .catch(error => {
          console.log(`Couldn't update ${teacher.fName teacher.lName}'s ${class.subject} class because: `, error);
          res.status(204).send(`Couldn't update ${teacher.fName teacher.lName}'s ${class.subject} class because: `, error);
        })
      })
      .catch(err => {
        console.log(`${teacher.fName teacher.lName} doesn't exist in the DB or Network Error: `, err);
        res.status(404).send(`${teacher.fName teacher.lName}'s class doesn't exist in the DB or Network Error: `, err)
      })
    })
    .catch(error => {
      console.log(`Teacher By The Name Of ${req.body.fName req.body.lName} Does Not Exist In The Db: `, error);
      res.status(404).send(`Teacher By The Name Of ${req.body.fName req.body.lName} Does Not Exist In The Db: `, error);
    })
});


module.exports = router;
