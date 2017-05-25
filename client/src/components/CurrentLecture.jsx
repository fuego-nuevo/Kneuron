import React, { Component } from 'react';
import CurrentLectureTopicsList from './CurrentLectureTopicsList';

class CurrentLecture extends Component {
  constructor(props){
    super(props);
    this.state = {
      lecture: [],
    };

  }


  render(){
    return(
      <div>
        <p>{this.props.name}</p>
        <CurrentLectureTopicsList topics={this.props.topics || []}/>
      </div>
    );
  }
};


export default CurrentLecture;
