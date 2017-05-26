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
        <p>YOOOOO</p>
        <TopicsList topics={this.props.topics || []} />
      </div>
    );
  }
}


export default CurrentLecture;
