import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-modal';
import { CurrentQuiz } from '../../../actions/CurrentQuiz';
import QuestionsList from '../../../components/Questions/QuestionsList';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '15%',
    left: '25%',
    border: 'none',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '7px',
    outline: 'none',
    width: '40%',
    height: '300px',
    transition: '1s',
    animation: 'bounce 0.8s',
    margin: '0',
  },
};

class SearchedDataQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteClass = this.deleteClass.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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
    console.log(this.props, 'quiiiiiiiz');
    return (
      <div className="cohort-entry animated bounceInUp">
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <QuestionsList questions={this.props.quiz.questions} />
        </Modal>
        <div id="quiz-entry" className="text-center ch-entry-header">{this.props.quiz.name}</div>
        <button onClick={this.openModal} className="lecture-button">See Questions</button>
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
};


const mapStateToProps = state => ({
  quizId: state.quizId,
});

export default connect(mapStateToProps, { CurrentQuiz })(SearchedDataQuiz);
