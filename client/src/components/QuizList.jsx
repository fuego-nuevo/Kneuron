import React from 'react';
import { Link } from 'react-router-dom';
import Quiz from '../components/Quiz';

const QuizList = props => (
  <div>
    <div className="class-nav">
      <button className="addC-left"><Link to="/dashboard/addClass">Add Quiz</Link></button>
      <button className="addC-right"><Link to="/dashboard/editClass">Edit Quiz</Link></button>
    </div>
    <div className="cohort-holder">
      {props.quizzes.map(quiz => <Quiz quiz={quiz} />)}
    </div>
  </div>
);

export default QuizList;
