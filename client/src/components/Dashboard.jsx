import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TestOne from '../components/TestOne';
import TestTwo from '../components/TestTwo';
import axios from 'axios';
import CohortsList from './CohortsList';
import CreateCohortModal from './CreateCohortModal';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test',
      email: 'test',
      fName: 'test',
      lName: 'test',
      cohorts: [],
      subject: '',
    };

    this.createCohort = this.createCohort.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchCohorts();
  }

  async fetchUser() {
    try {
      const user = await axios.get(`/api/users/${localStorage.getItem('id_token')}`);
      this.setState({ username: res.data.username, email: res.data.email, fName: res.data.fName, lName: res.data.lName });
    } catch (error) {
      console.log('Error in fetchUsers in UserProfile: ', err);
    }
  }

  async fetchCohorts() {
    try {
      const cohorts = await axios.get(`/api/cohorts/${localStorage.getItem('id_token')}`);
      console.log(`Grabbed the cohorts for ${this.state.fName}: `, cohorts);
      this.setState({ cohorts: cohorts.data });
    } catch (error) {
      console.log(`Error retrieving cohorts for ${this.state.fName}: `, error);
    }
  }

  async handleCohortCreate(subject) {
    try {
      this.setState({ subject: this.state.subject });
      console.log('Got state info from create song modal input');
    } catch (error) {
      console.log('Error creating getting input data from create song modal: ', error);
    }
  }

  async createCohort() {
    try {
      const newCohort = await axios.post('/api/cohorts/', { subject: this.state.subject, auth_token: localStorage.getItem('id_token') });
      console.log('Post Route went through: ', newCohort.data);
      this.setState({ subject: '' });
    } catch (error) {
      console.log('Error Posting New Cohort To DB: ', error);
    }
  }


  render() {
    return (
      <div>
        HITS THE DASHBOARD
        {/* <CohortsList*/}
        {/* cohorts={this.state.cohorts}*/}
        {/* currentUser={{ username: this.state.username, email: this.state.email, fName: this.state.fName, lName: this.state.lName }}*/}
        {/* />*/}
        <Route path="/dashboard/test1" component={TestOne} />
        <Route path="/dashboard/test2" component={TestTwo} />
      </div>
    );
  }
}

export default Dashboard;
