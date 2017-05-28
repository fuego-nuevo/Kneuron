import React from 'react';
import SearchedDataLecture from './SearchedDataLecture';


const SearchedDataLectures = props => (
  <div>
    {props.lectures.map(lecture => (
      <SearchedDataLecture lecture={lecture} handleLectureClick={props.handleLectureClick} history={props.history} fetchTeacherInfo={props.fetchTeacherInfo}/>
    ))}
  </div>
);


export default SearchedDataLectures;
