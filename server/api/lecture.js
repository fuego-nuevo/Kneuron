const router = require('express').Router();
const db = require('../db/models');
const antiHasher = require('./util').antiHasher;
const redis = require('../db/redis');

const fetchLectures = async (req, res) => {
  try {
    const teacher = await db.User.findOne({ where: { email: antiHasher(req.params.auth_token) } });
    if (teacher) {
      const teachersCohort = await db.Cohort.findOne({ where: { id: req.params.cohort_id, subject: req.params.subject, teacher_id: teacher.id } });
      if (teachersCohort) {
        const lectures = await db.Lecture.findAll({ where: { cohort_id: teachersCohort.id } });
        if (lectures) {
          res.status(200).send(lectures);
        }
      } else {
        console.log(`${teacher.fName} ${teacher.lName}'s ${teachersCohort.subject} Cohort Does Not Have Any Lectures...}`);
        res.status(404).send();
      }
    } else {
      console.log('Could not Find Teacher...');
      res.status(404).send(`Couldn't Find Teacher`);
    }
  } catch (error) {
    console.log('Async Or Network Error: ', error);
    res.status(404).send(error);
  }
};

const postLecture = async (req, res) => {
  try {
    // const teacher = await db.User.findOne({ where: { email: antiHasher(req.body.auth_token) } });
    // if (teacher) {
    //   const teacherCohort = await db.Cohort.findOne({ where: { teacher_id: teacher.id, id: req.body.id } });
    //   if (teacherCohort) {
      console.log(req.body)
        const teacherLecture = await db.Lecture.findOne({ where: { cohort_id: req.body.cohort_id, name: req.body.name } });
        if (teacherLecture) {
          console.log(`${teacherLecture.name} Lecture for ${teacherCohort.subject} already exists for ${teacher.fName} ${teacher.lName}...`);
          res.status(422).send(`${teacherLecture.name} Lecture for ${teacherCohort.subject} already exists for ${teacher.fName} ${teacher.lName}...`);
        } else {
          const newLecture = await db.Lecture.create(req.body);
          console.log('Lecture Posted To DB: ', newLecture);
          redis.set('dbTeacherCheck', false);
          res.status(201).send(newLecture);
        }
    //   } else {
    //     console.log(`${teacher.fName} ${teacher.lName} Does Not Currently Have A ${req.body.subject} Cohort.`);
    //     res.status(404).send(`${teacher.fName} ${teacher.lName} Does Not Currently Have A ${req.body.subject} Cohort.`);
    //   }
    // } else {
    //   console.log(`Error finding Teacher with email: ${antiHasher(req.body.auth_token)}`);
    //   res.status(404).send(`Error finding Teacher with email: ${antiHasher(req.body.auth_token)}`);
    // }
  } catch (error) {
    res.status(404).send(error);
  }
};

const updateLecture = async (req, res) => {
  try {
    const teacher = await db.User.findOne({ where: { email: antiHasher(req.body.auth_token) } });
    if (teacher) {
      const teachersCohort = await db.Cohort.findOne({ where: { id: req.body.cohortId, subject: req.body.subject, teacher_id: teacher.id } });
      if (teachersCohort) {
        const lecture = await db.Lecture.findOne({ where: { name: req.body.lecture_name, cohort_id: teachersCohort.id } });
        if (lecture) {
          lecture.subject = req.body.subject;
          const updatedLecture = await db.Lecture.update({ subject: lecture.subject }, { where: { id: lecture.id } });
          if (updatedLecture) {
            redis.set('dbTeacherCheck', false);
            res.status(200).send(updatedLecture);
          } else {
            console.log(`Error Updating ${lecture.name} Lecture For ${teachersCohort.subject} Cohort`);
            res.status(404).send();
          }
        } else {
          console.log(`${teacher.fName} ${teacher.lName}'s ${teachersCohort.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error:`);
          res.status(404).send(`${teacher.fName} ${teacher.lName}'s ${teachersCohort.subject} doesn't have a ${req.body.lecture_name} lecture in the DB or Network Error`);
        }
      } else {
        console.log(`${teacher.fName} ${teacher.lName} doesn't have a ${req.body.subject} cohort in the DB or Network Error`);
        res.status(404).send(`${teacher.fName} ${teacher.lName} doesn't have a ${req.body.subject} cohort in the DB or Network Error`);
      }
    } else {
      console.log(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db`);
      res.status(404).send(`Teacher By The Name Of ${req.body.fName} ${req.body.lName} Does Not Exist In The Db`);
    }
  } catch (error) {
    console.log('ASYNC issue ', error);
    res.status(500).send(error);
  }
};

const deleteLecture = async (req, res) => {
  try {
    const lecture = await db.Lecture.findOne({ where: { id: req.params.lecture_id } });
    lecture.destroy({ force: true });
    redis.set('dbTeacherCheck', false);
    res.status(201).send(`${lecture} was destroyed from DB`);
  } catch (error) {
    console.log('ASYNC issue ', error);
    res.status(500).send(error);
  }
};

router.get('/:cohort_id/:auth_token/:subject', fetchLectures);
router.post('/', postLecture);
router.put('/', updateLecture);
router.delete('/:lecture_id', deleteLecture);

module.exports = router;
