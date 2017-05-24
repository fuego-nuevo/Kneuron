import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { updateProfile } from '../actions/currentProfile';
import { connect } from 'react-redux';
import DashNav from '../components/DashboardNavBar';
import Performance from '../components/performance';
import CohortsList from './CohortsList';
// import CreateCohortModal from './CreateCohortModal';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };

    // this.createCohort = this.createCohort.bind(this);
    this.fetchTeacherInfo = this.fetchTeacherInfo.bind(this);
    this.renderCohort = this.renderCohort.bind(this);
  }

  componentDidMount() {
    this.fetchTeacherInfo();
  }
  //
  // async fetchUser() {
  //   try {
  //     const user = await axios.get(`/api/users/${localStorage.getItem('id_token')}`);
  //     this.setState({ username: res.data.username, email: res.data.email, fName: res.data.fName, lName: res.data.lName });
  //   } catch (error) {
  //     console.log('Error in fetchUsers in UserProfile: ', err);
  //   }
  // }
  //
  // async fetchCohorts() {
  //   try {
  //     const cohorts = await axios.get(`/api/cohorts/${localStorage.getItem('id_token')}`);
  //     console.log(`Grabbed the cohorts for ${this.state.fName}: `, cohorts);
  //     this.setState({ cohorts: cohorts.data });
  //   } catch (error) {
  //     console.log(`Error retrieving cohorts for ${this.state.fName}: `, error);
  //   }
  // }
  //
  // async handleCohortCreate(subject) {
  //   try {
  //     this.setState({ subject: this.state.subject });
  //     console.log('Got state info from create song modal input');
  //   } catch (error) {
  //     console.log('Error creating getting input data from create song modal: ', error);
  //   }
  // }
  //
  // async createCohort() {
  //   try {
  //     const newCohort = await axios.post('/api/cohorts/', { subject: this.state.subject, auth_token: localStorage.getItem('id_token') });
  //     console.log('Post Route went through: ', newCohort.data);
  //     this.setState({ subject: '' });
  //   } catch (error) {
  //     console.log('Error Posting New Cohort To DB: ', error);
  //   }
  // }

  async fetchTeacherInfo() {
    try {
      const profile = await axios.get(`/api/teachers/${localStorage.getItem('id_token')}`);
      console.log(`/api/teachers/${localStorage.getItem('id_token')}`);
      this.setState({ profile: profile.data }, () => {
        console.log('line 70 ', profile);
        this.props.updateProfile(profile);
      });
    } catch (error) {
      console.log('error with your fetch teacher shit ,', error);
    }
  }
  renderCohort() {
    const { cohort } = this.props
    return <CohortsList cohorts={cohort || []} />;
  }

  render() {
    const { dispatch } = this.props;
    console.log(this.props);
    return (
      <div className="dashboard-content">
        <DashNav dispatch={dispatch} />
        <Route path="/dashboard/class" render={this.renderCohort} />
        <Route path="/dashboard/performance" component={Performance} />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  const { email, username, userType, fName, lName, cohort } = state.profile;
  return {
    email,
    username,
    userType,
    fName,
    lName,
    cohort,
  };
}

export default withRouter(connect(mapStateToProps, { updateProfile })(Dashboard));

