import React from 'react';
import axios from 'axios';


const CohortsList = props => (
  <div>
    <h1>{props.currentUser.username}'s Cohorts</h1>
    {props.cohorts.map(cohort => {
      <Cohort cohort={cohort}/>
    })}
  </div>
);


export default CohortsList
