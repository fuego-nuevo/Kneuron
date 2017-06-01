const router = require('express').Router();
const db = require('../db/models');
const redis = require('../db/redis');

// Change Line 10 so that we can grab the student_id directly off the params_blank
// so that we don't need to do another query to find the student's id
const postAnswer = async (req, res) => {
  try {
    const question = await db.Question.findOne({ where: { id: req.body.question_id } });
    if (question) {
      if (question.correct === req.body.selected) {
        req.body['question_id'] = question.id;
        req.body['student_id'] = req.body.student_id;
        req.body['selected'] = req.body.selected;
        req.body['isCorrect'] = true;
        const postedAnswer = await db.Answer.create(req.body);
        res.status(200).send(postedAnswer);
      } else {
        req.body['question_id'] = question.id;
        req.body['student_id'] = req.body.student_id;
        req.body['selected'] = req.body.selected;
        req.body['isCorrect'] = false;
        const postedAnswer = await db.Answer.create(req.body);
        console.log('Answer created!');
        res.status(200).send(postedAnswer);
      }
    } else {
      console.log('Question not found');
      res.status(404).send('Question not found');
    }
  } catch (error) {
    console.log('Error in postAnswer ', error);
    res.status(500).send(error);
  }
};

// Maybe no need
const updateAnswer = async (req, res) => {
  try {
    const answer = await db.Answer.findOne({ where: { id: req.params.answer_id } });
    if (answer) {
      req.body['selected'] = req.body.selected;
      const updatedAnswer = await answer.update(req.body);
      console.log('Answer updated!');
      res.status(200).send(updatedAnswer);
    } else {
      console.log('Answer not found');
      res.status(404).send('Answer not found');
    }
  } catch (error) {
    console.log('Error in updateAnswer');
    res.status(500).send(error);
  }
};
// Maybe no need

// Change /:student_id to whatever is semantically correct to use the student's_id
// like if we're using auth_token then change it to that
router.post('/', postAnswer);
router.put('/:answer_id', updateAnswer);

module.exports = router;
