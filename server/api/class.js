const router = require('express').Router();
const User = require('../db/models').User;
const Class = require('../db/models').Class;


//Get All Classes For A Given Teacher
router.get('/', (req, res, next) => {
  User.findOne({where: { email: req.params.email }})
    .then(teacher => {

    })
    .catch(err => {
      console.log("That Teacher Does Not Exist In DB: ", err);
    })
})
