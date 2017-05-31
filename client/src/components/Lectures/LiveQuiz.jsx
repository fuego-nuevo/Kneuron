import React, { Component } from 'react';
import Swal from 'sweetalert';


class LiveQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { selectQuiz, closeModal, quiz, time } = this.props;
    console.log(this.props);
    return (
      <div
        onClick={() => {
          selectQuiz(quiz.id);
          closeModal();
          Swal(`students have ${time} minute to take the quiz`);
        }} className="pop-quiz"
      >
        {this.props.quiz.name}
      </div>
    );
  }
}

export default LiveQuiz;
