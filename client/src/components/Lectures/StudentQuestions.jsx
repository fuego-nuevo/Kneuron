import React from 'react';

const StudentQuestion = (props) => {
  console.log(props);
  return (
    <div className="question-container">
      <div className="question-bubble">
        <em>{props.question.name}:</em> {props.question.question}
      </div>
    </div>
  );
};

export default StudentQuestion;
