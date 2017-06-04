import React, { Component } from 'react';
import swal from 'sweetalert';


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
          swal({
            title: 'Quiz Sent!',
            text: `${time / 60} minute(s) to take the quiz`,
            type: 'success',
          });
        }} className="pop-quiz"
      >
        {quiz.name}
      </div>
    );
  }
}

export default LiveQuiz;
