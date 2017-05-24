import React from 'react';
import axios from 'axios';
import LecturesList from './LecturesList';


const Cohort = props => (
  <div>
    <h1><u>{props.cohort.subject}</u></h1>
    <LecturesList lectures={props.cohort.lectures}/>
  </div>
);

export default Cohort;
