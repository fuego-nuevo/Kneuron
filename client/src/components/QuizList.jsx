import React from 'react';

const QuizList = props => (
  <div>
    {props.quizzes.map(quiz => <Quiz quiz={quiz} />)}
  </div>
);

export default QuizList;
