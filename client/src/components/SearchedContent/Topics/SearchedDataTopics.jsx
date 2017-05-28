import React from 'react';
import SearchedDataTopic from './SearchedDataTopic';


const SearchedDataTopics = props => (
  <div>
    {props.topics.map(topic => (
      <SearchedDataTopic topic={topic} history={props.history} lectureId={props.lectureId} fetchTeacherInfo={props.fetchTeacherInfo}/>
    ))}
  </div>
);


export default SearchedDataTopics;
