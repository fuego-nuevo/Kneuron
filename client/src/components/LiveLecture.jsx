import React, { Component } from 'react';
import TopicList from './TopicsList';

class LiveLecture extends Component {
  constructor() {
    super();
    this.state = {
      studentQuestions: [],
    };
  }

  componentDidMount() {
    firebase.database().refs(`lectures${this.props.lecture.id}/`).on('value', (snapshot) => {
      const currentQuestions = snapshot.val();
      if (currentQuestions != null) {
        this.setState({
          studentQuestions: currentQuestions,
        });
      }
    });
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
