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
      studentQuestions: [],
      filteredQuestions: [],
    };
    this.filterQuestions = this.filterQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const { topics, email } = this.props;
    socket.emit('join', { id: this.props.profile });
    socket.emit('live-lecture', { topics, email });
    socket.on('student-question', (studentQuestions) => {
      console.log('student questions');
      this.setState({ studentQuestions: [studentQuestions, ...this.state.studentQuestions] });
      console.log('student questions ', this.state.studentQuestions);
    });
    this.props.topics.forEach((topic) => {
      console.log(topic);
      topic.quizzes.forEach((quiz) => {
        console.log(quiz);
        this.setState({ quizzes: [quiz, ...this.state.quizzes] });
      });
    });
  }
  // componentDidUpdate() {
  //
  // }

  filterQuestions(id) {
    console.log('it ran when we clicked the button');
    const filteredQuestions = this.state.studentQuestions.filter(question => question.topicId === id);
    this.setState({ filteredQuestions });
  }

  handleClick() {
    this.setState({ isShowingModal: true });
  }
  handleClose() {
    this.setState({ isShowingModal: false });
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
                <h1>Dialog Content</h1>
                {/* <LiveQuizList quiz={this.state.quizzes} />*/}
              </ModalDialog>
            </ModalContainer>
          }
        </div>;
        <div className="class-nav animated fadeInDownBig">
          <button onClick={this.handleClick} className="addC-left">Pop Quiz</button>
          <button className="addC-right">End Lecture</button>
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
});


export default connect(mapStateToProps)(LiveLecture);
