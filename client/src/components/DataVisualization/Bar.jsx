import React, { Component } from 'react';
import d3 from 'd3';

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  

  render() {
    const { student_id, cohort_id, name, average, quizCount } = this.props;
    return (
      <svg>
        <rect />
        <rect />
        <text>{name}</text>
      </svg>
    );
  }
}

export default Bar;
