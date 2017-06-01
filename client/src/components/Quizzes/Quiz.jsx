import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { CurrentQuiz } from '../../actions/CurrentQuiz';
import QuestionsList from '../../components/Questions/QuestionsList';



class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
    };
    this.deleteClass = this.deleteClass.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClick() {
    this.setState({ isShowingModal: true });
  }
  handleClose() {
    this.setState({ isShowingModal: false });
  }
  async deleteClass() {
    try {
      const removed = await axios.delete(`/api/quizzes/${this.props.quiz.id}`);
      const push = this.props.fetchTeacherInfo();
      this.props.history.push('/dashboard/class');
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="cohort-entry animated bounceInUp">
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1 className="text-center">Questions</h1>
                <QuestionsList questions={this.props.quiz.questions} />
              </ModalDialog>
            </ModalContainer>
          }
        </div>
        <div id="quiz-entry" className="text-center ch-entry-header">{this.props.quiz.name}</div>
        <button onClick={this.handleClick} className="lecture-button">See Questions</button>
        <button onClick={this.deleteClass} className="delete-class"><img
          alt="delete"
          src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png"
          width="25px"
          height="25px"
        /></button>
        <button id="add-question" className="lecture-button">
          <Link onClick={() => this.props.CurrentQuiz(this.props.quiz.id)} to="/dashboard/addQuestion" >
            Add Question
          </Link>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  quizId: state.quizId,
});

export default connect(mapStateToProps, { CurrentQuiz })(Quiz);
