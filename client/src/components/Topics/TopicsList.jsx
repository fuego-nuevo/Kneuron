import React from 'react';
import { Link } from 'react-router-dom';

import Topic from './Topic';

const TopicsList = props => (
  <div>
    <div id="single-nav" className="class-nav">
      <button className="single-hit"><Link to="/dashboard/addTopic">Add Topic</Link></button>
    </div>
    <div className="cohort-holder">
      {props.topics.map(topic => (
        <Topic
          topic={topic}
          lectureId={props.lectureId}
          fetchTeacherInfo={props.fetchTeacherInfo}
          history={props.history}
        />
      ))}
    </div>
  </div>
);

export default TopicsList;
