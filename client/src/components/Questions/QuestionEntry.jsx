import React from 'react';

const QuestionEntry = props => (
  <div className="quest-entry">
    <h1 className="text-center">{props.name}</h1>
    <div className="quest-ls">
      <ol>
        <li>{props.choices[0]}</li>
        <li>{props.choices[1]}</li>
        <li>{props.choices[2]}</li>
        <li>{props.choices[3]}</li>
      </ol>
    </div>
  </div>
);

export default QuestionEntry;
