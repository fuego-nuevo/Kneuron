import React, { Component } from 'react';


class LiveLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentQuestions: [],
    };
  }

  componentDidMount() {
  }

  render() {
    const { topics } = this.props;
    return (
      <div>
        {topics.map(topic => <h1>{topic.name}</h1>)}
      </div>
    );
  }
}


export default LiveLecture;
