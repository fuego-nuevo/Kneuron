const router = require('express').Router();
const User = require('../db/models').User;
const Class = require('../db/models').Class;
const antiHasher = require('./util').antiHasher;
const async = require('asyncawait/async');
const await = require('asyncawait/await');




//Create A New Class For A Given Teacher
// router.post('/', (req, res, next) => {
//   User.findOne({where: { email: antiHasher(req.body.auth_token) }})
//     .then(teacher => {
//       console.log("Found Teacher: ", teacher);
//       console.log(antiHasher(req.body.auth_token));

//       Class.findOne({where: {teacher_id: teacher.id, subject: req.body.subject }})
//         .then(klass => {
//           if(klass){
//             console.log(`${teacher.fName} ${teacher.lName} already has a ${klass.subject} class`, klass);
//             res.status(204).send(`${teacher.fName} ${teacher.lName} already has a ${klass.subject} class`);
//           } else {
//             console.log("Need to Create Class for teacher: ", antiHasher(req.body.auth_token));
//             Class.create({ subject: req.body.subject, teacher_id: teacher.id})
//               .then(newClass => {
//                 console.log(`${teacher.fName} ${teacher.lName} just added a new ${newClass.subject} class to their schedule.`, newClass);
//                 res.status(201).send(newClass);
//               })
//               .catch(err => {
//                 console.log(err);
//               })
//           }
//         });
//     })
//     .catch(error => {
//       console.log('Teacher Does Not Exist In The DB...');
//       res.status(404).send();
//     })
// });


//Create a New Class with Async
router.post('/', async((req, res, next) => {
  //Find a Teacher by their email and see if they are in the DB or Not...
  const teacher = await(User.findOne({where: { email: antiHasher(req.body.auth_token) }}));
  if(teacher){
    //If Teacher Found the  Find Their Class where subject === req.body.subject and their teacherId: as their id
    console.log("Found Teacher: ", teacher);
    console.log(antiHasher(req.body.auth_token));
    const teacherClass = await(Class.findOne({where: {teacherId: teacher.id, subject: req.body.subject, userId: teacher.id }}));
    if(teacherClass){
      //If That class found then say class already exists
      console.log(`${teacher.fName} ${teacher.lName} already has a ${klass.subject} class`, klass);
      res.status(204).send(`${teacher.fName} ${teacher.lName} already has a ${klass.subject} class`);
    } else {
      //Else Create the Class
      console.log("Need to Create Class for teacher: ", antiHasher(req.body.auth_token));
      const newClass = await(Class.create({ subject: req.body.subject, teacherId: teacher.id, userId: teacher.id}));
      console.log(`${teacher.fName} ${teacher.lName} just added a new ${newClass.subject} class to their schedule.`, newClass);
      res.status(201).send(newClass);
    }
  } else {
    //Teacher wasn't found in DB
    console.log('Teacher Does Not Exist In The DB...');
    res.status(404).send();
  }
}));


//Get All Classes For A Given Teacher
router.get('/:auth_token', (req, res, next) => {
  User.findOne({where: { email: antiHasher(req.params.auth_token) }})
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
    .then(klass => {
      console.log("Class Was Successfully Deleted: ", klass);
      res.status(202).send(`${klass} was marked for deletion...`);
      klass.destroy({ force: true });
      res.status(204).send(`${klass} was destroyed from DB`);
    })
    .catch(err => {
      console.log("Error Deleting Selected Class... Class Does Not Exist: ", err);
      res.status(404).send("Error Deleting Selected Class... Class Does Not Exist...");
    })
});


//Update Information Of A Given Class From A Given Teacher
router.put('/', (req, res, next) => {
  User.findOne({where: { email: antiHasher(req.body.auth_token) }})
    .then(teacher => {
      Class.findOne({where: {id: req.body.class_id, teacherId: teacher.id}})
      .then(klass => {
        res.status(202).send(`${klass} was marked for updating...`);
        klass.subject = req.body.subject;
        Class.update({
          subject: klass.subject
        }, {
          where: { id: klass.id }
        })
        .then(result => {
          res.status(200).send(result);
        })
        .catch(error => {
          console.log(`Couldn't update ${teacher.fName} ${teacher.lName}'s ${klass.subject} class because: `, error);
          res.status(204).send(`Couldn't update ${teacher.fName} ${teacher.lName}'s ${klass.subject} class because: `, error);
        })
      })
      .catch(err => {
        console.log(`${teacher.fName} ${teacher.lName} doesn't exist in the DB or Network Error: `, err);
        res.status(404).send(`${teacher.fName} ${teacher.lName}'s class doesn't exist in the DB or Network Error: `, err)
      })
    })
    .catch(error => {
      console.log(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
      res.status(404).send(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db: `, error);
    });
});


module.exports = router;
