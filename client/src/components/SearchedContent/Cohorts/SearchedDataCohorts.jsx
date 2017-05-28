import React from 'react';
import SearchedDataCohort from './SearchedDataCohort';


const SearchedDataCohorts = props => (
  <div>
    {props.cohorts.map(cohort => (
      <SearchedDataCohort cohort={cohort} history={props.history} allLectures={props.allLectures} fetchTeacherInfo={props.fetchTeacherInfo}/>
    ))}
  </div>
);


export default SearchedDataCohorts;
