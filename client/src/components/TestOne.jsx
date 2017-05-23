import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class TestOne extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="testone">
        TEST ONE
      </div>
    );
  }
}

export default withRouter(TestOne);
