import React from 'react';
import LiveQuiz from './LiveQuizList';

const LiveQuizList = (props) => {
  return (
  <div>
    <LiveQuiz quiz={props.quiz} />
  </div>
  );
};

export default LiveQuizList;
