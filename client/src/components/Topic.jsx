import React from 'react';
import { Link } from 'react-router-dom';

const Topic = props => {
  console.log(props, ' this is from topics');
  return (
    <div className="cohort-entry animated bounceInUp">
      <div id="topic-entry" className="ch-entry-header">{props.topic.name}</div>
      <button className="lecture-button">Quizzes</button>
    </div>
  );
}


export default Topic;
