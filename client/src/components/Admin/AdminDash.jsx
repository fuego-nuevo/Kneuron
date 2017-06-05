import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      cohorts: [],
    };
  }
  componentDidMount() {
    axios.get(`/api/schools/${localStorage.getItem('id_token')}`)
      .then((data) => {
        this.setState({ user: data.data.user, cohorts: data.data.classes });
      })
      .catch((err) => {
        console.log('error finding the schools , ', err);
      });
  }
  render() {
    const { isAuthenticated } = this.props;
    console.log(this.state);
    if (isAuthenticated) {
      return (
        <div>
          ADMIN DASHBOARD THOT
          <div className="admin-info"></div>
        </div>
      );
    }
    return (
      <Redirect to="/" />
    );
  }
}

export default AdminDash;
