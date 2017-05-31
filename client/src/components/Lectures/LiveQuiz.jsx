import React, { Component } from 'react';
import Swal from 'sweetalert';


class LiveQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { selectQuiz, closeModal, quiz, time, startQuiz } = this.props;
    console.log(this.props);
    return (
      <div
        onClick={async () => {
          await selectQuiz(quiz.id);
          await startQuiz();
          closeModal();
          Swal(`students have ${time / 60} minute to take the quiz`);
        }} className="pop-quiz"
      >
        {quiz.name}
      </div>
    );
  }
}

export default LiveQuiz;
