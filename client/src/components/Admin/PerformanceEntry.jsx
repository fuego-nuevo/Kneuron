import React, { Component } from 'react';

class PerformanceEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sum: 'no results',
    };
  }
  componentDidMount() {
    const { results } = this.props.cohort;
    let sum = 0;
    if (results.length) {
      results.forEach((el) => {
        console.log(el);
        sum += el.percentage;
      });
      sum /= results.length;
      this.setState({ sum: sum.toString() });
    }
  }
  render() {
    const { subject, semester, results } = this.props.cohort;
    console.log(this.props);
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
          <h4>{this.state.sum}</h4>
          {/* <h4>{(results.reduce((acc, el) => { console.log(acc); return acc.percentage + el.percentage}, 0) / results.length).toString()}</h4>*/}
        </div>
      </div>
    );
  }
}
// results.reduce((a, b) => {
//
// }, 0);
export default PerformanceEntry;
