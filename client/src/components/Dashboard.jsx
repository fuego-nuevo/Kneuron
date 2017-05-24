import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateProfile } from '../actions/currentProfile';
import DashNav from '../components/DashboardNavBar';
import AddClass from '../components/AddClass';
import CohortsList from './CohortsList';
import Lecture from '../components/LecturesList';
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

  async fetchTeacherInfo() {
    try {
      const profile = await axios.get(`/api/teachers/${localStorage.getItem('id_token')}`);
      console.log(`/api/teachers/${localStorage.getItem('id_token')}`);
      this.setState({ profile: profile.data }, () => {
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
        <Route path="/dashboard/addClass" component={AddClass} />
        <Route path="/dashboard/class/lectures/" component={Lecture} />
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

