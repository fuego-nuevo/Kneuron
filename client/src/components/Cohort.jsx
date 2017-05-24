import React, { Component } from 'react';
import '../styles/main.css';

class Cohort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      lectures: [],
    };
  }
  render() {
    console.log(this.props, ' props from the mfuckin line 13 cohort entry');
    return (
      <div className="cohort-entry animated bounceInUp" >
        <div className="ch-entry-header">{this.props.cohort.subject}</div>
        <h3>{this.props.cohort.time}</h3>
        <button>Lectures</button>
      </div>
    );
  }
}

export default Cohort;
