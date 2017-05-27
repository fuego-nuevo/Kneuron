import React from 'react';
import Quiz from './Quiz';

const QuizList = props => (
  <div>
    {props.quizzes.map(quiz => <Quiz quiz={quiz} />)}
  </div>
);

export default QuizList;
