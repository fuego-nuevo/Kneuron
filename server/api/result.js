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
    // where: { cohort_id: req.params.cohort_id },
    // include: [{
    //   model: db.Result,
    //   where: { student_id: req.params.student_id },
    // }],
  // })
  .then((lectures) => {
    // res.status(200).send(cohorts);
    // const obj = {};
    // const cohortArray = student.studentcohorts;
    // _.each(cohorts, (cohort) => {
    //   obj[cohort.cohort.subject] = util.overallCohortPerformance(cohort.cohort.results);
    // });
    console.log('this is the lectures in result route ', lectures)
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
  // db.Question.findAll({ where: { quiz_id: req.body.quiz_id } })
  //   .then((questions) => {
  //     return Promise.all(_.each(questions, (question) => {
  //       db.Answer.findOne({ where: { question_id: question.id, student_id: req.body.student_id } })
  //         .then((answer) => {
  //           arr.push(answer);
  //           console.log('this is the arr', arr);
  //           if (arr.length === questions.length) {
  //             req.body['cohort_id'] = req.body.cohort_id;
  //             req.body['quiz_id'] = req.body.quiz_id;
  //             req.body['student_id'] = req.body.student_id;
  //             req.body['percentage'] = util.quizResult(arr);
  //             db.Result.create(req.body)
  //               .then(data => res.status(200).send(data));
  //             // res.status(200).send(arr);
  //           }
  //         });
  //     }));
  //   })
    .catch(next);
});

module.exports = router;


// const fetchAnswers = async (req, res, next) => {
//   let arr = [];
//   const Quiz = await db.Quiz.findOne({ where: { id: req.params.quiz_id } })
//   const Questions = await db.Question.findAll({ where: { quiz_id: req.params.quiz_id } })
//   const Answers = _.each(Questions, (question) => {
//     console.log(question);
//     const Answer = await db.Answer.findOne({ where: { question_id: question.id, student_id: req.params.student_id } })
//     .then((data) => arr.push(data));
//     }
//   );
//   res.status(200).send(arr);
//   // req.body['student_id'] = req.body.student_id;
//   // req.body['quiz_id'] = req.body.quiz_id;
//   // db.Result.create(req.body)
//     // .then((data) => {
//     //   console.log('data for last then ', data);
//     //   res.status(200).send(arr)
//     // })
//     // .catch(next);
// };

// router.get('/:quiz_id/:student_id', fetchAnswers)

