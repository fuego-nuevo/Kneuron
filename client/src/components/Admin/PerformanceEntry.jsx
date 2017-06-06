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
        <div className="ent-header">
          <h3>Semester</h3>
          <h3>Subject</h3>
          <h3>Performance</h3>
        </div>
        <div className="stats">
          <h4>{semester}</h4>
          <h4>{subject}</h4>
          <h4>school results</h4>
        </div>
      </div>
    );
  }
}

export default PerformanceEntry;

