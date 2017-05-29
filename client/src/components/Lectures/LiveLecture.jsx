import React, { Component } from 'react';
import { connect } from 'react-redux';
import LiveLectureTopics from './LiveLectureTopicsEntry';
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
        <div className="class-nav">
          <button className="addC-left">Pop Quiz</button>
          <button className="addC-right">End Lecture</button>
        </div>
        <div className="lecture-filter">
          <div className="topic-filter">
            {topics.map(topic => <LiveLectureTopics topic={topic} />)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  email: state.profile.email,
});


export default connect(mapStateToProps)(LiveLecture);
