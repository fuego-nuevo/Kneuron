import React from 'react';

import SearchedDataCohorts from './Cohorts/SearchedDataCohorts';
import SearchedDataLectures from './Lectures/SearchedDataLectures';
import SearchedDataTopics from './Topics/SearchedDataTopics';
import SearchedDataQuizzes from './Quizzes/SearchedDataQuizzes';

const SearchedDataItemsList = (props) => {
  const cohortsClassName = props.searchedContentResults[0].length ? 'searched-cohorts' : 'hidden';
  const lecturesClassName = props.searchedContentResults[1].length ? 'searched-lectures' : 'hidden';
  const topicsClassName = props.searchedContentResults[2].length ? 'searched-topics' : 'hidden';
  const quizzesClassName = props.searchedContentResults[3].length ? 'searched-quizzes' : 'hidden';
  return (
    <div>
      <div className="searched-container">
        <div className={cohortsClassName}>
          <h1>Cohorts</h1>
          <hr/>
          <SearchedDataCohorts fetchTeacherInfo={props.fetchTeacherInfo} history={props.history} allLectures={props.allLectures} cohorts={props.searchedContentResults[0]} />
        </div>
        <div className={lecturesClassName}>
          <h1>Lectures</h1>
          <hr/>
          <SearchedDataLectures handleLectureClick={props.handleLectureClick} fetchTeacherInfo={props.fetchTeacherInfo} history={props.history} lectures={props.searchedContentResults[1]} />
        </div>
        <div className={topicsClassName}>
          <h1>Topics</h1>
          <hr/>
          <SearchedDataTopics fetchTeacherInfo={props.fetchTeacherInfo} history={props.history} topics={props.searchedContentResults[2]} />
        </div>
        <div className={quizzesClassName}>
          <h1>Quizzes</h1>
          <hr/>
          <SearchedDataQuizzes fetchTeacherInfo={props.fetchTeacherInfo} history={props.history} quizzes={props.searchedContentResults[3]} />
        </div>
      </div>
    </div>
  );
};

export default SearchedDataItemsList;
