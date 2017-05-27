import React, { Component } from 'react';
import TopicsList from './TopicsList';

class CurrentLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lecture: [],
    };
  }


 render() {
    console.log("IN CURRENT LECTURE COMP: ", this.props);
    return (
      <div>
        <TopicsList
          topics={this.props.topics || []}
          lectureId={this.props.lectureId}
          fetchTeacherInfo={this.props.fetchTeacherInfo}
          history={this.props.history}/>
      </div>
    );
  }
}


export default CurrentLecture;
