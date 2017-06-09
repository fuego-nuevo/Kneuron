import React from 'react';

import QuestionsList from '../../components/Questions/QuestionsList';

const CurrentLectureTopicsListEntry = props => (
  <div>
    <p>{props.topic.name}</p>
      {props.topic.quizzes.map(quiz => (
        <QuestionsList questions={quiz.questions} />
      ))}
  </div>
);

export default CurrentLectureTopicsListEntry;
