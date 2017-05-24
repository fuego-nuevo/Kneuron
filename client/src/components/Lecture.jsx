import React from 'react';
import { Link } from 'react-router-dom';
import TopicsList from './TopicsList';

const Lecture = props =>(
  <div>
    <hr/>
    <u><Link to="/dashboard/class/lectures">{props.lecture.name}</Link></u>
    <TopicsList topics={props.lecture.topics} lectureName={props.lecture.name}/>
  </div>
);



export default Lecture;
