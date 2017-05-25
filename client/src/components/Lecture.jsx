import React from 'react';
import { Link } from 'react-router-dom';
import TopicsList from './TopicsList';

const Lecture = props => {
  const currentLectureRoute = `/dashboard/lectures/${props.selectedLecture}`;
  return(
    <div>
      <u>
        <Link
        to={currentLectureRoute}
        selectedLecture={props.selectedLecture || props.lecture.id}
        onMouseEnter={() => props.handleLectureClick(props.lecture.id)}>
          {props.lecture.name}
        </Link>
      </u>
      <TopicsList
        topics={props.lecture.topics}
        lectureName={props.lecture.name}
      />
    </div>
  );
};



export default Lecture;
