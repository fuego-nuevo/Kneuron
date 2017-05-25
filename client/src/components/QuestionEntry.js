import React from 'react';

const QuestionEntry = props => (
  <div>
    <h1>{props.name}</h1>
    <ol>
      <li>{props.choices[0]}</li>
      <li>{props.choices[1]}</li>
      <li>{props.choices[2]}</li>
      <li>{props.choices[3]}</li>
    </ol>
  </div>
);


export default QuestionEntry;
