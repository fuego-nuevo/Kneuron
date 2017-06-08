import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import ReactCountdownClock from 'react-countdown-clock';
import StudentQuestions from '../Lectures/StudentQuestions';
import LiveLectureTopics from './LiveLectureTopicsEntry';
import LiveQuizList from './LiveQuizList';
import BarChart from './BarChart';
import AttendanceList from './AttendanceList';
import AttendanceEntry from './AttendanceEntry';

const socket = io();


class LiveLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isQuizLive: false,
      isShowingQuizModal: false,
      isShowingTimeModal: false,
      quizzes: [],
      time: 1,
      currentTopic: 0,
      selectedQuiz: {},
      studentQuestions: [],
      filteredQuestions: [],
      studentAnswer: [],
      trackingAttendance: false,
      attendanceTime: 30,
      studentsPresent: [],
    };
    this.filterQuestions = this.filterQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.selectQuiz = this.selectQuiz.bind(this);
    this.sendPopQuiz = this.sendPopQuiz.bind(this);
    this.startAttendance = this.startAttendance.bind(this);
    this.endPopQuiz = this.endPopQuiz.bind(this);
    this.setTopic = this.setTopic.bind(this);
    this.endAttendance = this.endAttendance.bind(this);
    this.handleAttendanceModalClick = this.handleAttendanceModalClick.bind(this);
    this.handleAttendanceModalClose = this.handleAttendanceModalClose.bind(this);
    this.handleTimeDropdown = this.handleTimeDropdown.bind(this);
    this.trackAttendance = this.trackAttendance.bind(this);
  }

  componentDidMount() {
    const { topics, email, profile } = this.props;
    const quizzes = [];
    socket.emit('join', { id: profile });
    socket.emit('live-lecture', { topics, email });
    socket.on('student-question', (studentQuestions) => {
      this.setState({ studentQuestions: [studentQuestions, ...this.state.studentQuestions] });
    });
    socket.on('student-answers', (studentAnswer) => {
      console.log('i heard you stu ansas, ', studentAnswer);
      this.setState({ studentAnswer: [studentAnswer, ...this.state.studentAnswer] });
    });
    socket.on('student-track', (data) => {
      console.log(`the student ${data.name} is present? ${data.present}`);
    });
    topics.forEach((topic) => {
      topic.quizzes.forEach((quiz) => {
        quizzes.push(quiz);
      });
    });
    this.setState({ quizzes });
  }
  handleClick() {
    this.setState({ isShowingQuizModal: true });
  }
  handleAttendanceModalClick() {
    this.setState({ isShowingTimeModal: true });
  }
  handleAttendanceModalClose() {
    this.setState({ isShowingTimeModal: false });
  }
  handleModalClose() {
    this.setState({ isShowingQuizModal: false });
  }

  handleDropdownChange(e) {
    this.setState({ time: e.target.value * 60 });
  }

  handleTimeDropdown(e) {
    this.setState({ attendanceTime: e.target.value * 60 });
  }

  selectQuiz(id) {
    const selectedQuiz = this.state.quizzes.filter(quiz => quiz.id === id);
    this.setState({ selectedQuiz });
  }
  endAttendance() {
    this.setState({ trackingAttendance: false });
  }

  sendPopQuiz() {
    const { profile, cohort_id } = this.props;
    socket.emit('pop-quiz', {
      time: this.state.time,
      questions: JSON.stringify(this.state.selectedQuiz[0].questions),
      cohort_id,
      topic: this.state.selectedQuiz[0].topic_id,
      id: profile,
    });
    this.setState({ isQuizLive: true });
  }
  endPopQuiz() {
    this.setState({ isQuizLive: false }, () => {
      this.setState({ studentAnswer: [] });
    });
  }
  setTopic(currentTopic) {
    this.setState({ currentTopic });
  }
  filterQuestions(id) {
    const filteredQuestions = this.state.studentQuestions.filter(question => question.topicId === id);
    this.setState({ filteredQuestions });
  }
  startAttendance() {
    console.log('it happened starting attendance ,');
    this.handleAttendanceModalClick();
  }
  trackAttendance() {
    this.handleAttendanceModalClose();
    this.setState({ trackingAttendance: true }, () => {
      socket.emit('attendance', { id: this.props.profile });
    });
  }

  render() {
    const { topics } = this.props;
    console.log(this.state);
    if (this.state.trackingAttendance) {
      return (
        <div>
          <div className="popquiz-container">
            <div className="pop-quiz-clock">
              <ReactCountdownClock
                seconds={this.state.attendanceTime}
                color="#F0C463"
                alpha={0.8}
                size={200}
                onComplete={this.endAttendance}
              />
            </div>
          </div>
          <div className="students-present">
            <AttendanceEntry students={this.state.studentsPresent || []} />
          </div>
        </div>
      );
    }
    if (!this.state.isQuizLive) {
      return (
        <div>
          <div>
            {
              this.state.isShowingTimeModal &&
              <ModalContainer onClose={this.handleAttendanceModalClose}>
                <ModalDialog onClose={this.handleAttendanceModalClose}>
                  <h2 className="text-center">How long before students are late?</h2>
                  <select className="pop-quiz" onChange={this.handleTimeDropdown}>
                    <option value="1">1 minutes</option>
                    <option value="2">2 minutes</option>
                    <option value="3">3 minutes</option>
                    <option value="4">4 minutes</option>
                    <option value="5">5 minutes</option>
                  </select>
                  <button onClick={this.trackAttendance} className="track-attendance" type="button">Start Tracking</button>
                </ModalDialog>
              </ModalContainer>
            }
          </div>
          <div>
            {
              this.state.isShowingQuizModal &&
              <ModalContainer onClose={this.handleModalClose}>
                <ModalDialog onClose={this.handleModalClose}>
                  <h2 className="text-center">How much time for students to take quiz?</h2>
                  <select className="pop-quiz" onChange={this.handleDropdownChange}>
                    <option value="1">1 minutes</option>
                    <option value="2">2 minutes</option>
                    <option value="3">3 minutes</option>
                    <option value="4">4 minutes</option>
                    <option value="5">5 minutes</option>
                    <option value="6">6 minutes</option>
                    <option value="7">7 minutes</option>
                    <option value="8">8 minutes</option>
                    <option value="9">9 minutes</option>
                    <option value="10">10 minutes</option>
                  </select>
                  <LiveQuizList
                    startQuiz={this.sendPopQuiz}
                    time={this.state.time}
                    closeModal={this.handleModalClose}
                    selectQuiz={this.selectQuiz}
                    quizzes={this.state.quizzes || []}
                  />
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
                {topics.map(topic => (<LiveLectureTopics
                  setTopic={this.setTopic}
                  filter={this.filterQuestions}
                  topic={topic}
                />))}
              </div>
            </div>
            <div className="student-question-filter">
              <div id="student-header" className="topic-header">Student Questions</div>
              <div id="student-questions" className="scroll-topics">
                {this.state.studentQuestions.filter(question => question.topicId === this.state.currentTopic)
                  .map(filteredQuestion => <StudentQuestions question={filteredQuestion} />)
                }
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="popquiz-container">
          <div className="pop-quiz-clock">
            <ReactCountdownClock
              seconds={this.state.time}
              color="#81aff9"
              alpha={0.9}
              size={200}
              onComplete={this.endPopQuiz}
            />
          </div>
          <div className="livedata">
            <div id="legend" className="quiz-line">
              Legend
              <div> scored less than 60 % <div id="fail" className="legend-keys" /> </div>
              <div> scored between 60 and 80 percent <div id="pass" className="legend-keys" /> </div>
              <div> scored greater than 80 percent <div id="exceed" className="legend-keys" /> </div>
            </div>
            <BarChart data={this.state.studentAnswer.map(student => [student.name, student.correct])} size={[300, 300]} />
            <div className="quiz-line">
              Pop Quiz Results
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
