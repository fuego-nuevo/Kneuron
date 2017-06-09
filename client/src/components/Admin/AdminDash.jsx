import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logoutUser } from '../../actions/Login';
import PerformanceList from './PerformanceList';

class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      cohorts: [],
      school: {},
    };
  }

  componentDidMount() {
    axios.get(`/api/schools/${localStorage.getItem('id_token')}`)
      .then((data) => {
        this.setState({ user: data.data.user, cohorts: data.data.classes, school: data.data.school[0] });
      })
      .catch((err) => {
        console.log('Error finding the schools , ', err);
      });
  }

  render() {
    const { isAuthenticated, logoutUser } = this.props;
    const { fName, lName } = this.state.user;
    const { name, code } = this.state.school;
    if (isAuthenticated) {
      return (
        <div className="admin-contain">
          <div className="admin-banner">Kneuron</div>
          <div className="admin-info">
            <div className="badge-info">
              <div className="badge-header" />
              <div className="pic-background" />
              <img alt="profile" src="http://mdepinet.org/wp-content/uploads/person-placeholder.jpg" />
              <h2>Hi {fName} {lName} </h2>
              <hr />
              <div>
                <h4>school admin for </h4>
                <h3 className="text-center school">{ name }</h3>
              </div>
              <button onClick={logoutUser} className="ad-logout" type="button">
                Logout
              </button>
            </div>
          </div>
          <div className="performance-info" >
            <div className="performance-holder">
              <div className="perf-header">Classroom Performances
              <div className="perf-code">Code: {code} </div>
              </div>
              <PerformanceList cohorts={this.state.cohorts || []} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <Redirect to="/" />
    );
  }
}

export default connect(null, { logoutUser })(AdminDash);
