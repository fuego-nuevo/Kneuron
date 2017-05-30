import React from 'react';

const StudentQuestion = (props) => {
  console.log(props);
  return (
    <div className="question-container">
      <div className="question-bubble">
        {props.question.name}: {props.question.question}
      </div>
    </div>
  );
};

export default StudentQuestion;
