import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { updateProfile } from '../actions/currentProfile';
import { connect } from 'react-redux';
import DashNav from '../components/DashboardNavBar';
import Performance from '../components/performance';
import CohortsList from './CohortsList';
import Lecture from './Lecture';
// import CreateCohortModal from './CreateCohortModal';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };

    this.renderCohorts = this.renderCohorts.bind(this);
    this.fetchTeacherInfo = this.fetchTeacherInfo.bind(this);
  }

  componentDidMount() {
    this.fetchTeacherInfo();
  }
  

  async fetchTeacherInfo() {
    try {
      const profile = await axios.get(`/api/teachers/${localStorage.getItem('id_token')}`);
      console.log(`/api/teachers/${localStorage.getItem('id_token')}`);
      this.setState({ profile: profile.data }, () => {
        console.log('profile broski line 33 ', profile);
        this.props.updateProfile(profile);
      });
    } catch (error) {
      console.log('error with your fetch teacher shit ,', error);
    }
  }

  renderCohorts() {
    console.log('line 41 dashboard jsx , ', this.props.cohort);
    return (
      <div>
        <p>Yoooo</p>
        <CohortsList
        cohorts={this.props.cohort || []} 
        currentUser={this.props.username || ''}
        />
      </div>
    );
  }


  render() {
    const { dispatch } = this.props;
    console.log(this.props);
    return (
      <div className="dashboard-content">
        <DashNav dispatch={dispatch} />
        <Route path="/dashboard/class" render={this.renderCohorts} />
        <Route path="/dashboard/performance" component={Performance} />
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

