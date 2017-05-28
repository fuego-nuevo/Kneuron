import React from 'react';
import SearchedDataCohorts from './SearchedDataCohorts';
import SearchedDataLectures from './SearchedDataLectures';
import SearchedDataTopics from './SearchedDataTopics';
import SearchedDataQuizzes from './SearchedDataQuizzes';


const SearchedDataItemsList = props => (
  <div>
    <div>
      <h1>Cohorts</h1>
      <SearchedDataCohorts fetchTeacherInfo={props.fetchTeacherInfo} history={props.history} allLectures={props.allLectures} cohorts={props.searchedContentResults[0]} />
    <hr/>
    <br/>
    </div>
    <div>
      <h1>Lectures</h1>
      <SearchedDataLectures handleLectureClick={props.handleLectureClick} fetchTeacherInfo={props.fetchTeacherInfo} history={props.history} lectures={props.searchedContentResults[1]} />
    <hr/>
    <br/>
    </div>
    <div>
      <h1>Topics</h1>
      <SearchedDataTopics fetchTeacherInfo={props.fetchTeacherInfo} history={props.history} topics={props.searchedContentResults[2]} />
    <hr/>
    <br/>
    </div>
    <div>
      <h1>Quizzes</h1>
      <SearchedDataQuizzes fetchTeacherInfo={props.fetchTeacherInfo} history={props.history} quizzes={props.searchedContentResults[3]} />
    </div>
  </div>
);


export default SearchedDataItemsList;
