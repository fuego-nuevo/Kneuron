import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import StudentQuestions from './StudentQuestions';
import LiveLectureTopics from './LiveLectureTopicsEntry';

const socket = io('http://localhost:5000');
// const socket = io({ path: '/io' });


class LiveLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentQuestions: [],
      filteredQuestions: [],
    };
    this.filterQuestions = this.filterQuestions.bind(this);
  }

  componentDidMount() {
    const { topics, email } = this.props;
    socket.emit('live-lecture', { topics, email });
    socket.on('student-question', (studentQuestions) => {
      this.setState({ studentQuestions: [studentQuestions, ...this.state.studentQuestions] });
      console.log('student questions');
    });
  }

  filterQuestions(id) {
    console.log('it ran when we clicked the button');
    const filteredQuestions = this.state.studentQuestions.filter(question => question.topicId === id);
    this.setState({ filteredQuestions });
  }

  render() {
    const { topics } = this.props;
    console.log(this.state.filteredQuestions);
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
              {topics.map(topic => <LiveLectureTopics filter={this.filterQuestions} topic={topic} />)}
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
