import React from 'react';
import axios from 'axios';
import Cohort from './Cohort';

const CohortsList = props => {
  console.log(props);
  return(
    <div>
      <h1><u>{props.currentUser}'s Cohorts:</u></h1>
      {props.cohorts.map(cohort => (
        <Cohort cohort={cohort}/>
      ))}
    </div>
  );
};


export default CohortsList
