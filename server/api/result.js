const db = require('../db/models');
const router = require('express').Router();
const Promise = require('bluebird');
const _ = require('lodash');
const util = require('../utils');

router.get('/lectureResults/:cohort_id/:student_id', (req, res, next) => {
  db.Lecture.findAll({
    where: { cohort_id: req.params.cohort_id },
    include: [{
      model: db.Result,
      where: { student_id: req.params.student_id },
    }],
  })
  .then((lectures) => {
    console.log('These are the lectures in result route ', lectures);
    res.status(200).send(lectures);
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  req.body['cohort_id'] = req.body.cohort_id;
  req.body['quiz_id'] = req.body.quiz_id;
  req.body['student_id'] = req.body.student_id;
  req.body['lecture_id'] = req.body.lecture_id;
  req.body['percentage'] = req.body.percentage;
  db.Result.create(req.body)
    .then(data => res.status(200).send(data))
    .catch(next);
});

module.exports = router;
