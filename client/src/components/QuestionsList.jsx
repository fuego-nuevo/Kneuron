import React from 'react';
import QuestionEntry from './QuestionEntry';

const QuestionList = props => (
  <div>
    {props.questions.map(question => (
      <QuestionEntry name={question.name} choices={question.choices} />
    ))}
  </div>
);



export default QuestionList;
