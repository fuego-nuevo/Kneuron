import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Performance extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/performance')
  }

  render() {
    return (
      <div>
        Hello there
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Performance);
