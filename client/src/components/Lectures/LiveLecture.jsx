import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

const socket = io();


class LiveLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentQuestions: [],
    };
  }

  componentDidMount() {
    const { topics, email } = this.props;
    socket.emit('live-lecture', { topics, email });
    socket.on('student-question', (questions) => {
      console.log(questions);
    });
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

const mapStateToProps = state => ({
  email: state.profile.email,
});


export default connect(mapStateToProps)(LiveLecture);
