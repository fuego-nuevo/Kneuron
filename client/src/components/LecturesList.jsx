import React, { Component } from 'react';
import Lecture from './Lecture';


const LecturesList = props => (
  <div>
    {props.lectures.map(lecture => (

      <Lecture className="cohort-holder" lecture={lecture} handleLectureClick={props.handleLectureClick}/>
    ))}
  </div>
)


export default LecturesList;
