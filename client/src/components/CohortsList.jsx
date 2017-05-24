import React from 'react';
import Cohort from './Cohort';


const CohortsList = (props) => {
  console.log(props);
  return (
    <div className="cohort-holder">
      {props.cohorts.map(cohort => <Cohort cohort={cohort} />)}
    </div>
  );
};


export default CohortsList;

