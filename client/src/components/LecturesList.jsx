import React from 'react';
import Lecture from './Lecture';

const LecturesList = props => (
  <div>
    <hr/>
    <h1><u>Lectures:</u></h1>
    {props.lectures.map(lecture => (
      <Lecture lecture={lecture} />
    ))}
  </div>
);


export default LecturesList;
