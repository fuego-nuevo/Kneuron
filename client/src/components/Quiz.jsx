import React, { Component } from 'react';
import axios from 'axios';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.deleteClass = this.deleteClass.bind(this);
  }

  async deleteClass() {
    try {
      const removed = await axios.delete(`/api/quizzes/${this.props.quiz.id}`);
      if (removed) {
        this.props.fetchTeacherInfo()
          .then(() => {
            this.props.history.push('/dashboard/quiz');
          })
          .catch((err) => {
            console.log('error with deleting quiz , ERR: ', err);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    console.log(this.props, 'quiiiiiiiz')
    return (
      <div className="cohort-entry animated bounceInUp">
        <div id="quiz-entry" className="text-center ch-entry-header">{this.props.quiz.name}</div>
        <button className="lecture-button">Questions</button>
        <button onClick={this.deleteClass} className="delete-class"><img
          alt="delete"
          src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png"
          width="25px" height="25px"
        /></button>
      </div>
    );
  }
}


export default Quiz;
