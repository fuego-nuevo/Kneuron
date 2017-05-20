const router = require('express').Router();
const User = require('../db/models').User;
const Class = require('../db/models').Class;


//Get All Classes For A Given Teacher
router.get('/', (req, res, next) => {
  User.findOne({where: { email: req.params.email }})
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






module.exports = router;
