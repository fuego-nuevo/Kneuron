import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class AdminDash extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      return (
        <div>
          ADMIN DASHBOARD THOT
        </div>
      );
    }
    return (
      <Redirect to="/" />
    );
  }
}

export default AdminDash;
