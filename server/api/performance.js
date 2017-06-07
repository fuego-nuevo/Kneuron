const db = require('../db/models');
const router = require('express').Router();
const redis = require('../db/redis');

router.get('/performanceForEveryStudentForAllCohorts/:user_id', (req, res, next) => {
  redis.get(`allPerformance${req.params.user_id}`)
    .then((data) => {
      const allPerformanceData = JSON.parse(data);
      if (allPerformanceData !== null) {
        res.status(202).send(allPerformanceData);
      } else {
        db.Cohort.findAll({
          where: { teacher_id: req.params.user_id },
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
    })
    .catch(next);
});

router.get('/performanceForTopics/:lecture_id/:student_id', (req, res, next) => {
  db.Lecture.findOne({
    where: { id: parseInt(req.params.lecture_id, 10) },
    include: [{
      model: db.Topic,
      include: [{
        model: db.Quiz,
        include: [{
          model: db.Result,
          where: { student_id: req.params.student_id },
        }],
      }],
    }],
  })
    .then(data => res.status(201).send(data))
    .catch(next);
});

router.get('/performanceForCohorts/:user_id', (req, res, next) => {
  redis.get(`cohortsPerformance${req.params.user_id}`)
    .then((data) => {
      const allPerformanceData = JSON.parse(data);
      if (allPerformanceData !== null) {
        res.status(202).send(allPerformanceData);
      } else {
        db.Cohort.findAll({
          where: { teacher_id: req.params.user_id },
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

module.exports = router;
