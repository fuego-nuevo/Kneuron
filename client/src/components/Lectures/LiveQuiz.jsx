import React, { Component } from 'react';

class LiveQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {this.props.quiz.name}
      </div>
    );
  }
}

export default LiveQuiz;
