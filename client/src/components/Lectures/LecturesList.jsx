import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Lecture from './Lecture';

const LecturesList = props => (
  <div>
    <div id="single-nav" className="class-nav">
      <button className="single-hit"><Link to="/dashboard/addLecture">Add Lecture</Link></button>
    </div>
    <div className="cohort-holder">
      {props.lectures.map(lecture => (
        <Lecture selectedLecture={props.selectedLecture} history={props.history} fetchTeacherInfo={props.fetchTeacherInfo} lecture={lecture} handleLectureClick={props.handleLectureClick} />
        ))}
    </div>
  </div>
  );

export default LecturesList;
