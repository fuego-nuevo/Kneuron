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
    })
    .catch(next);
});

router.get('/performanceForTopics/:cohort_id', (req, res, next) => {
  db.Lecutre.findAll({
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

module.exports = router;
