import React from 'react';
import { Link } from 'react-router-dom';
import Cohort from './Cohort';


const CohortsList = (props) => {
  console.log(props);
  return (
    <div>
      <div className="class-nav">
        <button className="addC-left"><Link to="/dashboard/addClass">Add Class</Link></button>
        <button className="addC-right"><Link to="/dashboard/editClass">Edit Class</Link></button>
      </div>
    <div className="cohort-holder">
      {props.cohorts.map(cohort => <Cohort history={props.history} key={cohort.id} cohort={cohort} allLectures={props.allLectures} currentLecture={props.currentLecture}/>)}
    </div>
  </div>
  );
};


export default CohortsList;

