import React from 'react';
import LiveQuiz from './LiveQuizList';

const LiveQuizList = props => (
  <div>
    {props.quizzes.map(quiz => <LiveQuiz quiz={quiz} />)}
  </div>
  );

export default LiveQuizList;
