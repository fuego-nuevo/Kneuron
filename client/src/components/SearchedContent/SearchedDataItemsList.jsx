import React from 'react';
import SearchedDataCohorts from './SearchedDataCohorts';
import SearchedDataLectures from './SearchedDataLectures';
import SearchedDataTopics from './SearchedDataTopics';
import SearchedDataQuizzes from './SearchedDataQuizzes';


const SearchedDataItemsList = props => (
  <div>
    <h1>Cohorts</h1>
    <SearchedDataCohorts cohorts={props.searchedContentResults[0]} />;
    <hr/>
    <h1>Lectures</h1>
    <SearchedDataLectures lectures={props.searchedContentResults[1]} />;
    <hr/>
    <h1>Topics</h1>
    <SearchedDataTopics topics={props.searchedContentResults[2]} />;
    <hr/>
    <h1>Quizzes</h1>
    <SearchedDataQuizzes quizzes={props.searchedContentResults[3]} />;
  </div>
);


export default SearchedDataItemsList;
