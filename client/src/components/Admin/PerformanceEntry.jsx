import React, { Component } from 'react';

class PerformanceEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    const { subject, semester, results } = this.props.cohort;
    return (
      <div className="perf-entry">
        <h1>{semester}</h1>
        <h2>{subject}</h2>
      </div>
    );
  }
}

export default PerformanceEntry;

