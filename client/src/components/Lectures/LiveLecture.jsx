import React, { Component } from 'react';
import TopicList from '../../components/Topics/TopicsList';

class LiveLecture extends Component {
  constructor() {
    super();
    this.state = {
      studentQuestions: [],
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <TopicList sQuestions={this.state.studentQuestions} />
      </div>
    );
  }
}


export default LiveLecture;
