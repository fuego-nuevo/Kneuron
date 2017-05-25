import React, { Component } from 'react';

class LiveLecture extends Component {
  constructor() {
    super();
    this.state = {
      studentQuestions: [],
    }
  }

  componentDidMount() {
    firebase.database().refs().on('value', (snapshot) => {
      const currentQuestions = snapshot.val();

      if (currentQuestions != null) {
        this.setState({
          studentQuestions: currentQuestions,
        });
      }
    });
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}


export default LiveLecture;
