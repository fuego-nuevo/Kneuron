import React from 'react';
import { Link } from 'react-router-dom';
import Quiz from './Quiz';

const QuizList = props => (
  <div>
    <div className="class-nav">
      <button className="addC-left"><Link to="/dashboard/addQuiz">Add Quiz</Link></button>
      <button className="addC-right"><Link to="/dashboard/editQuiz">Edit Quiz</Link></button>
    </div>
    <div className="cohort-holder">
      {props.quizzes.map(quiz => <Quiz history={props.history} fetchTeacherInfo={props.fetchTeacherInfo} quiz={quiz} />)}
    </div>
  </div>
);

export default QuizList;
