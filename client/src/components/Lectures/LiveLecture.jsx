import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import StudentQuestions from './StudentQuestions';
import LiveLectureTopics from './LiveLectureTopicsEntry';

const socket = io();


class LiveLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentQuestions: [
        { name: 'Mariano Okpalefe', question: 'who is George Washington?', topicId: 1 },
      ],
      filteredQuestions: [
        { name: 'Mariano Okpalefe', question: 'who is George Washington lets make this question really fucking long bro just to be extra obnoxious about it?', topicId: 1 },
      ],
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
            <div className="topic-header">TOPICS</div>
            <div className="scroll-topics">
              {topics.map(topic => <LiveLectureTopics topic={topic} />)}
            </div>
          </div>
          <div className="student-question-filter">
            <div id="student-header" className="topic-header">Student Questions</div>
            <div id="student-questions" className="scroll-topics">
              {this.state.filteredQuestions.map(question => <StudentQuestions question={question} />)}
            </div>
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
