import React, { Component } from 'react';
import d3 from 'd3';

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <g>
        <rect />
        <rect />
        <text></text>
      </g>
    );
  }
}

export default Bar;
