import React, { Component } from 'react';
<<<<<<< HEAD:client/src/components/Lectures/LiveLecture.jsx
import TopicList from '../../components/Topics/TopicsList';
=======
import TopicList from '../Topics/TopicsList';
>>>>>>> edeb15198d4cf381160e195e8aa682633f342e76:client/src/components/Lectures/LiveLecture.jsx

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
