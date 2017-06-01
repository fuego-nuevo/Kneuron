import React from 'react';
import { Link } from 'react-router-dom';
import Quiz from './Quiz';

const QuizList = props => (
  <div>
    <div id="single-nav" className="class-nav">
      <button className="single-hit"><Link to="/dashboard/addQuiz">Add Quiz</Link></button>
    </div>
    <div className="cohort-holder">
      {props.quizzes.map(quiz => <Quiz history={props.history} fetchTeacherInfo={props.fetchTeacherInfo} quiz={quiz} />)}
    </div>
  </div>
);

export default QuizList;
