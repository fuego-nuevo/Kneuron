const _ = require('lodash');

// For Performance
const overallCohortPerformance = (cohorts) => {
  // let sum = 0
  // for (let i = 0; i < scoresArray.length; i++) {
  //   sum += scoresArray[i].percentage;
  // }
  // _.each(cohorts, (cohort.cohort) => {

  // })
  const sum = cohorts.reduce((acc, score) => acc + score.percentage, 0);
  return sum / cohorts.length;
};

const quizResult = (studentAnswers) => {
  let numberCorrect = 0;
  _.each(studentAnswers, (answer) => {
    return answer.isCorrect === true && answer !== null ? numberCorrect++ : null;
  });
  return numberCorrect / studentAnswers.length;
};

module.exports = {
  overallCohortPerformance,
  quizResult,
};
