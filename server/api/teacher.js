const router = require('express').Router();
const bcrypt = require('bcryptjs');
const axios = require('axios');
const db = require('../db/models');
const hasher = require('./util').hasher;
const antiHasher = require('./util').antiHasher;

const saltRounds = 10;

// Controllers
// Fetch ALL INFORMATION on Teacher
const fetchAllTeacherData = async (req, res) => {
  try {
    const email = antiHasher(req.params.auth_token);
    const allData = await db.User.findOne({
      where: {
        email,
        userType: 0,
      },
      include: [{
        model: db.Cohort,
        as: 'cohort',
        include: [{
          model: db.Lecture,
          include: [{
            model: db.Topic,
            include: [{
              model: db.Quiz,
              include: [{
                model: db.Question,
              }],
            }],
          }],
        }],
      }],
    });
    console.log('All information front loaded ', allData);
    res.status(200).send(allData);
  } catch (error) {
    console.log('Some shit went wrong ', error);
    res.status(500).send(error);
  }
};

// Login Teach with Async
const fetchTeacher = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { email: req.params.email, userType: 0 } });
    const data = await bcrypt.compare(req.params.creds, user.password);
    if (data) {
      // console.log('User Logged In: ', { user: user, id_token: hasher(`${req.params.email}`) });
      res.status(200).send({ user, id_token: hasher(req.params.email) });
    } else {
      res.status(404).send('Credentials incorrect');
    }
  } catch (error) {
    console.log('User Does Not Exist');
    res.status(404).send(error);
  }
};

// Sign Up Teacher with Async
const postTeacher = async (req, res) => {
  try {
    console.log('this is the req.body in postTeacher ', req.body);
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt, 'ok this that new salt fool');
    const hash = await bcrypt.hash(req.body.password, salt);
    console.log('ok this that new password  ', hash);
    const person = await db.User.findOne({ where: { email: req.body.email } });
    if (person) {
      console.log('That email is taken. Please try another email.');
      res.status(404).send('That email is taken. Please try another email.');
    } else {
      const newUser = await db.User.create({
        email: req.body.email.toLowerCase(),
        password: hash,
        userType: 0,
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
        image: req.body.image,
      });
      if (newUser) {
        console.log('Signed Up New User: ', { user: newUser, id_token: hasher(req.body.email) });
        res.status(201).send({ user: newUser, id_token: hasher(req.body.email) });
      } else {
        console.log('Invalid Data In Req.Body: ', newUser);
      }
    }
  } catch (error) {
    console.log('Invalid Login Credentials');
    res.status(404).send(error);
  }
};

// Update Teacher with Async
const updateTeacher = async (req, res) => {
  try {
    console.log(antiHasher(req.params.auth_token));
    const teacher = await db.User.findOne({ where: { email: antiHasher(req.params.auth_token) } });
    if (teacher) {
      const updatedTeacher = await teacher.update({
        email: req.body.email,
        // password: hasher(req.body.password),
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
      });
      if (updatedTeacher) {
        console.log('Teacher successfully updated ', updatedTeacher);
        res.status(200).send({ teacher: updatedTeacher, auth_token: hasher(updatedTeacher.email) });
      } else {
        console.log('Missing a parameter');
        res.status(500).send('Missing a parameter');
      }
    } else {
      console.log('Teacher not found');
      res.status(404).send('Teacher not found');
    }
  } catch (error) {
    console.log('Error with async in updateTeacher ', error);
    res.status(500).send(error);
  }
};

// Delete Teacher
const deleteTeacher = async (req, res) => {
  try {
    const teacher = await db.User.findOne({ where: { email: antiHasher(req.params.auth_token) } });
    if (teacher) {
      teacher.destroy({ force: true });
      console.log('Teacher deleted');
      res.status(200).send(teacher);
    } else {
      console.log('Teacher not found');
      res.status(404).send('Teacher not found');
    }
  } catch (error) {
    console.log('ASYNC Error: ', error);
    res.status(500).send(error);
  }
};

const getElevation = async (req, res) => {
  try {
    const elevation = await axios.post(`https://maps.googleapis.com/maps/api/elevation/json?locations=${req.body.lat},${req.body.lng}&key=${process.env.GOOGLE_ELEVATION_API_KEY}`);
    console.log('DATA RESTURNED FROM GOOGLE IS: ', elevation.data.results[0].elevation);
    res.json(elevation.data.results[0].elevation);
    // save this alt and lat and lng to db and compare on the students side for real proximity
    // need to find cartesian coordinates with sin and cosin
  } catch (error) {
    console.log('ERROR FOR ELEVATION DATA IS: ', error);
  }
};

// Controllers
router.get('/:auth_token', fetchAllTeacherData);
router.get('/:email/:creds', fetchTeacher);
router.post('/', postTeacher);
router.put('/:auth_token', updateTeacher);
router.delete('/:auth_token', deleteTeacher);
router.post('/elevation', getElevation);

module.exports = router;
