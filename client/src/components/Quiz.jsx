import React, { Component } from 'react';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
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
