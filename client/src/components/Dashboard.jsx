import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProfile } from '../actions/currentProfile';
import DashNav from '../components/DashboardNavBar';
import AddClass from '../components/AddClass';
import CohortsList from '../components/CohortsList';
import CurrentLecture from '../components/CurrentLecture';
import LecturesList from '../components/LecturesList';
import { updateProfile } from '../actions/currentProfile';
import { allLectures, currentLecture } from '../actions/lectures';
// import CreateCohortModal from './CreateCohortModal';


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };

    this.fetchTeacherInfo = this.fetchTeacherInfo.bind(this);
    this.renderCohort = this.renderCohort.bind(this);
    this.renderLecturesList = this.renderLecturesList.bind(this);
    this.renderCurrentLecture = this.renderCurrentLecture.bind(this);
  }

  componentDidMount() {
    this.fetchTeacherInfo();
  }
  componentWillReceiveProps(nextProps) {
    console.log('component received new props');
    this.setState({ profile: nextProps });
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
    const { cohort } = this.props;
    return <CohortsList cohorts={cohort || []} />;
  }

  renderLecturesList(){
    const { lectures } = this.props.cohort;
    <LecturesList lectures={lectures} />
  }

  renderCurrentLecture(){
    const { lectureId, name, topics } = this.props;
    return <CurrentLecture id={lectureId} name={name} topics={topics}/>
  }

  render() {
    const { dispatch, lectureId } = this.props;
    console.log(this.state);
    console.log(this.props);
    const currentLectureRoute = `/dashboard/lectures/${this.props.lectureId}`;
    return (
      <div className="dashboard-content">
        <DashNav dispatch={dispatch} />
        <Route path="/dashboard/class" render={this.renderCohort} />
        <Route path="/dashboard/class/lectures" render={this.renderLecturesList} />
        <Route path="/dashboard/addClass" component={AddClass} />
        <Route path={currentLectureRoute} render={this.renderCurrentLecture} />
      </div>
    );
  }
}

const mapDispatchToProps = () => {
  let { dispatch } = this.props;
  let boundActionCreators = bindActionCreators({ updateProfile, allLectures, currentLecture }, dispatch);
  return boundActionCreators;
}

const mapStateToProps = (state) => {
  const { email, username, userType, fName, lName, cohort, lectureId, lectures, name, topics } = state.profile;
  return {
    email,
    username,
    userType,
    fName,
    lName,
    cohort,
    lectureId,
    lectures,
    name,
    topics,
  };
};

export default withRouter(connect(mapStateToProps, { mapDispatchToProps })(Dashboard));

