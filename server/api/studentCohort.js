const router = require('express').Router();
const db = require('../db/models');

router.post('/', (req, res, next) => {
  req.body['student_id'] = req.body.student_id;
  req.body['cohort_id'] = req.body.cohort_id;
  db.StudentCohort.create(req.body)
    .then(data => res.status(200).send(data))
    .catch(next);
});

module.exports = router;
