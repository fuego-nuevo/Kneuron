const db = require('../db/models');
const router = require('express').Router();
const bcrypt = require('bcrypt');

const redis = require('../db/redis');
const antiHasher = require('../utils');
const hasher = require('../utils');

const saltRounds = 10;

const fetchAllStudentData = async (req, res) => {
  try {
    // let redisStudentData = await redis.get('allStudentData');
    // const checker = await redis.get('dbStudentCheck');
    // redisStudentData = JSON.parse(redisStudentData);
    const email = antiHasher(req.params.auth_token);
    // if (redisStudentData !== null && redisStudentData.email === email && checker === 'true') {
    // if (redisStudentData !== null && checker === 'true') {
      // res.status(200).send(redisStudentData);
    // } else {
      const allData = await db.User.findOne({
        where: {
          email: email,
          // id: req.params.id,
          userType: 1,
        },
        include: [{
          model: db.StudentCohort,
          include: [{
            model: db.Cohort,
            include: [{
              model: db.Lecture,
              include: [{
                model: db.Topic,
                include: [{
                  model: db.Quiz,
                  include: [{
                    model: db.Question,
                    // include: [{
                    //   model: db.Answer,
                    //   include: [{
                    //     model: db.Question
                    //   }]
                    // }],
                  }],
                }],
              }],
            }],
          }],
        }],
      });
      console.log('All information front loaded ', allData);
      // redis.set('allStudentData', JSON.stringify(allData));
      // redis.set('dbStudentCheck', true);
      res.status(200).send(allData);
    // }
  } catch (error) {
    console.log('Some shit went wrong ', error);
    res.status(500).send(error);
  }
};

const fetchStudent = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { email: req.params.email } });
    const data = await bcrypt.compare(req.params.creds, user.password);
    if (data) {
      console.log('User Logged In: ', { user: user, id_token: hasher(`${req.params.email}`) });
      res.status(200).send({ user: user, id_token: hasher(req.params.email) });
    } else {
      res.status(404).send('Credentials incorrect');
    }
  } catch (error) {
    console.log('Error in fetchStudent');
    res.status(500).send(error);
  }
};

const postStudent = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(req.body.password, salt);
    const person = await db.User.findOne({ where: { email: req.body.email } });
    if (person) {
      console.log('That email is taken. Please try another email.');
      res.status(404).send('That email is taken. Please try another email.');
    } else {
      const newUser = await db.User.create({
        email: req.body.email,
        password: hash,
        userType: 1,
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
        school_id: req.body.school_id,
      });
      console.log('Signed Up New User: ', { user: newUser, id_token: hasher(req.body.email) });
      // redis.set('dbStudentCheck', false);
      res.status(201).send({ user: newUser, id_token: hasher(req.body.email) });
    }
  } catch (error) {
    console.log('Error in postStudent');
    res.status(500).send(error);
  }
};

const updateStudent = async (req, res) => {
  try {
    console.log(antiHasher(req.params.auth_token));
    const student = await db.User.findOne({ where: { email: antiHasher(req.params.auth_token) } });
    if (student) {
      const updatedStudent = await student.update({
        // email: req.body.email,
        // password: hasher(req.body.password),
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
      });
      if (updatedStudent) {
        console.log('Student successfully updated ', updatedStudent);
        // redis.set('dbStudentCheck', false);
        res.status(200).send({ student: updatedStudent, auth_token: hasher(updatedStudent.email) });
      } else {
        console.log('Missing a parameter');
        res.status(500).send('Missing a parameter');
      }
    } else {
      console.log('Student not found');
      res.status(404).send('Student not found');
    }
  } catch (error) {
    console.log('Error with async in updateStudent ', error);
    res.status(500).send(error);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await db.User.findOne({ where: { email: antiHasher(req.params.auth_token) } });
    if (student) {
      student.destroy({ force: true });
      console.log('Student deleted');
      // redis.set('dbStudentCheck', false);
      res.status(200).send(student);
    } else {
      console.log('Student not found');
      res.status(404).send('Student not found');
    }
  } catch (error) {
    console.log('ASYNC Error: ', error);
    res.status(500).send(error);
  }
};

// router.get('/:id', fetchAllStudentData);
router.get('/:auth_token', fetchAllStudentData);
router.get('/:email/:creds', fetchStudent);
router.post('/', postStudent);
router.put('/:auth_token', updateStudent);
router.delete('/:auth_token', deleteStudent);

module.exports = router;
