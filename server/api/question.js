// const Question = require('../db/models/index').Question;
// const User = require('../db/models').User;
// const router = require('express').Router();
// const antiHasher = require('./util').antiHasher;
//
//
// const fetchQuestions = async (req, res) => {
//   try {
//     const user = await User.findOne({ where: { email: antiHasher(req.body.auth_Token) } });
//     if(user) {
//      const questions = await Question.findAll( { });
//     } else {
//
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
//
// const postQuestions = async (req, res) => {
//
// };
//
// router.get('/', fetchQuestions);
// router.post('/', postQuestions);
