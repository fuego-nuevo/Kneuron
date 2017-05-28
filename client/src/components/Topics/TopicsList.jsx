import React from 'react';
import Topic from './Topic';
import { Link } from 'react-router-dom';

const TopicsList = props => (
  <div>
    <div className="class-nav">
      <button className="addC-left"><Link to="/dashboard/addTopic">Add Topic</Link></button>
      <button className="addC-right"><Link to="/dashboard/editTopic">Edit Topic</Link></button>
    </div>
    <div className="cohort-holder">
      {props.topics.map(topic => (
        <Topic
          topic={topic}
          lectureId={props.lectureId}
          fetchTeacherInfo={props.fetchTeacherInfo}
          history={props.history}/>
      ))}
    </div>
  </div>
);


export default TopicsList;
