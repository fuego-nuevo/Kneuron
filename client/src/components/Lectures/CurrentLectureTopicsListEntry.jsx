import React from 'react';
<<<<<<< HEAD:client/src/components/Lectures/CurrentLectureTopicsListEntry.jsx
import QuestionsList from '../../components/Questions/QuestionsList';
=======
import QuestionsList from '../Questions/QuestionsList';
>>>>>>> edeb15198d4cf381160e195e8aa682633f342e76:client/src/components/Lectures/CurrentLectureTopicsListEntry.jsx

const CurrentLectureTopicsListEntry = props => (
  <div>
    <p>{props.topic.name}</p>
    /* This are the Quizzes Underneath Everything Renders Now */
      {props.topic.quizzes.map(quiz => (
        <QuestionsList questions={quiz.questions}/>
      ))}
  </div>
);


export default CurrentLectureTopicsListEntry;


