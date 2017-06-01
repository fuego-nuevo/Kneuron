import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import StudentQuestions from './StudentQuestions';
import LiveLectureTopics from './LiveLectureTopicsEntry';
import LiveQuizList from './LiveQuizList';

// const socket = io('http://localhost:5000');
const socket = io();


class LiveLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      quizzes: [],
      time: 1,
      selectedQuiz: {},
      studentQuestions: [],
      filteredQuestions: [],
    };
    this.filterQuestions = this.filterQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.selectQuiz = this.selectQuiz.bind(this);
    this.sendPopQuiz = this.sendPopQuiz.bind(this);
    this.startAttendance = this.startAttendance.bind(this);
  }

  componentDidMount() {
    const { topics, email } = this.props;
    const quizzes = [];
    socket.emit('join', { id: this.props.profile });
    socket.emit('live-lecture', { topics, email });
    socket.on('student-question', (studentQuestions) => {
      this.setState({ studentQuestions: [studentQuestions, ...this.state.studentQuestions] });
    });
    this.props.topics.forEach((topic) => {
      topic.quizzes.forEach((quiz) => {
        quizzes.push(quiz);
      });
    });
    this.setState({ quizzes });
  }
  filterQuestions(id) {
    const filteredQuestions = this.state.studentQuestions.filter(question => question.topicId === id);
    this.setState({ filteredQuestions });
  }

  handleClick() {
    this.setState({ isShowingModal: true });
  }
  handleClose() {
    this.setState({ isShowingModal: false });
  }

  handleDropdownChange(e) {
    this.setState({ time: e.target.value * 60 });
  }
  selectQuiz(id) {
    const selectedQuiz = this.state.quizzes.filter(quiz => quiz.id === id);
    this.setState({ selectedQuiz });
  }
  sendPopQuiz() {
    const { profile, cohort_id } = this.props;
    socket.emit('pop-quiz', {
      time: this.state.time,
      cohort_id,
      questions: JSON.stringify(this.state.selectedQuiz[0].questions),
      id: profile,
    });
  }
  startAttendance() {
    console.log('it happened starting attendance ,');
    socket.emit('attendance', { id: this.props.profile });
  }

  render() {
    const { topics } = this.props;
    return (
      <div>
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h2 className="text-center">How much time for students to take quiz?</h2>
                <select className="pop-quiz" onChange={this.handleDropdownChange}>
                  <option value="1">1 minutes</option>
                  <option value="2">2 minutes</option>
                  <option value="3">3 minutes</option>
                </select>
                <LiveQuizList startQuiz={this.sendPopQuiz} time={this.state.time} closeModal={this.handleClose} selectQuiz={this.selectQuiz} quizzes={this.state.quizzes || []} />
              </ModalDialog>
            </ModalContainer>
          }
        </div>
        <div className="class-nav animated fadeInDownBig">
          <button id="lecleft" onClick={this.handleClick} className="addC-left">Pop Quiz</button>
          <button id="lecmid" className="addC-right">End Lecture</button>
          <button id="lecright" onClick={this.startAttendance} className="addC-right">Track Attendance</button>
        </div>
        <div className="lecture-filter animated fadeInUpBig">
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
  profile: state.profile.id,
  cohort_id: state.lectures.currentCohortId,
});


export default connect(mapStateToProps)(LiveLecture);
