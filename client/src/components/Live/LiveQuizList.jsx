import React from 'react';
import LiveQuiz from './LiveQuiz';

const LiveQuizList = (props) => {
  console.log(props);
  return (
    <div>
      {props.quizzes.map(quiz => <LiveQuiz startQuiz={props.startQuiz} time={props.time} closeModal={props.closeModal} selectQuiz={props.selectQuiz} quiz={quiz} />)}
    </div>
  );
};

export default LiveQuizList;
