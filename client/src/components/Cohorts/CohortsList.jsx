import React from 'react';
import { Link } from 'react-router-dom';
import Cohort from './Cohort';


const CohortsList = props => (
  <div>
    <div id="single-nav" className="class-nav">
      <button className="single-hit"><Link to="/dashboard/addClass">Add Class</Link></button>
    </div>
    <div className="cohort-holder">
      {props.cohorts.map(cohort =>
          (<Cohort
            history={props.history}
            fetchTeacherInfo={props.fetchTeacherInfo}
            key={cohort.id}
            cohort={cohort} updateCohort={props.updateCohorts}
            allLectures={props.allLectures}
            currentLecture={props.currentLecture}
          />))}
    </div>
  </div>
  );


export default CohortsList;

