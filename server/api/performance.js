const db = require('../db/models');
const router = require('express').Router();
const redis = require('../db/redis');

router.get('/performanceForEveryStudentForAllCohorts/:user_id', (req, res, next) => {
<<<<<<< HEAD
  redis.get(`allPerformance${req.params.user_id}`)
    .then((data) => {
      const allPerformanceData = JSON.parse(data);
      if (allPerformanceData !== null) {
        res.status(202).send(allPerformanceData);
      } else {
        db.Cohort.findAll({
          where: {
            teacher_id: req.params.user_id,
          },
          include: [{
            model: db.StudentCohort,
            include: [{
              model: db.User,
              include: [{
                model: db.Result,
              }],
            }],
          }],
        })
          .then((performanceData) => {
            redis.setex(`allPerformance${req.params.user_id}`, 3600, JSON.stringify(performanceData));
            res.status(201).send(performanceData);
          })
          .catch(next);
      }
=======
  // if (redis.get('performance')) {
  //   const data = redis.get('performance');
  //   res.status(202).send(data);
  // }
  db.Cohort.findAll({
    where: {
      teacher_id: req.params.user_id,
    },
    include: [{
      model: db.StudentCohort,
      include: [{
        model: db.User,
        include: [{
          model: db.Result,
        }],
      }],
    }],
  })
    .then((data) => {
      // redis.set('performance');
      res.status(201).send(data);
>>>>>>> 75409684222ec0f0a88f9ebf7d6cea870b72aeb0
    })
    .catch(next);
});

router.get('/performanceForTopics/:cohort_id', (req, res, next) => {
<<<<<<< HEAD
  db.Lecture.findAll({
=======
  db.Lecutre.findAll({
>>>>>>> 75409684222ec0f0a88f9ebf7d6cea870b72aeb0
    where: {
      cohort_id: req.params.cohort_id,
    },
    include: [{
      model: db.Topic,
      include: [{
        model: db.Quiz,
        include: [{
          model: db.Result,
        }],
      }],
    }],
  })
    .then(data => res.status(201).send(data))
    .catch(next);
});

<<<<<<< HEAD
router.get('/performanceForCohorts/:user_id', (req, res, next) => {
   redis.get(`cohortsPerformance${req.params.user_id}`)
    .then((data) => {
      const allPerformanceData = JSON.parse(data);
      if (allPerformanceData !== null) {
        res.status(202).send(allPerformanceData);
      } else {
        db.Cohort.findAll({
          where: { 
            teacher_id: req.params.user_id 
          },
          include: [{
            model: db.Result,
          }],
        })
          .then((performanceData) => {
            redis.setex(`cohortsPerformance${req.params.user_id}`, 3600, JSON.stringify(performanceData));
            res.status(201).send(performanceData);
          })
          .catch(next);
      }
    })
    .catch(next);
});

=======
>>>>>>> 75409684222ec0f0a88f9ebf7d6cea870b72aeb0
module.exports = router;
