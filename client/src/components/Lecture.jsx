import React from 'react';
import { Link } from 'react-router-dom';
import TopicsList from './TopicsList';


const Lecture = (props) => {
  const currentLectureRoute = `/dashboard/lectures/${props.selectedLecture}`;
  return (
    <div className="cohort-entry animated bounceInUp">
      <div className="ch-entry-header">{props.lecture.name}</div>
      <button className="lecture-button">
        <Link
          to={currentLectureRoute}
          selectedLecture={props.selectedLecture || props.lecture.id}
          onMouseEnter={() => props.handleLectureClick(props.lecture.id)}
        >
          {props.lecture.name}
        </Link>
      </button>
      <TopicsList
        topics={props.lecture.topics}
        lectureName={props.lecture.name}
      />
    </div>
  );
};

export default Lecture;
