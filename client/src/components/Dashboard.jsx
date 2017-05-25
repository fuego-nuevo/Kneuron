import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProfile } from '../actions/currentProfile';
import DashNav from '../components/DashboardNavBar';
import AddClass from '../components/AddClass';
import EditClass from '../components/EditClass';
import CohortsList from '../components/CohortsList';
import CurrentLecture from '../components/CurrentLecture';
import LecturesList from '../components/LecturesList';
import { allLectures, currentLecture } from '../actions/lectures';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      selectedLecture: '',
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
    const { cohort, history } = this.props;
    return (<CohortsList
      history={history}
      cohorts={cohort || []}
      allLectures={this.props.allLectures.bind(this)}
    />);
  }

  renderLecturesList() {
    const { lectures } = this.props;
    return <LecturesList lectures={lectures || []} handleLectureClick={this.handleLectureClick} />;
  }

  renderCurrentLecture() {
    const { lectureId, name, topics, lectures } = this.props;
    return <CurrentLecture pickedLecture={lectures.filter(lecture => lecture.id === this.state.selectedLecture) || []} />;
  }

  render() {
    const { dispatch } = this.props;
    console.log(this.state);
    console.log('these are the props ', this.props);
    console.log('these are the lectures ', this.props.lectures);
    const currentLectureRoute = `/dashboard/lectures/${this.state.selectedLecture}`;
    console.log(currentLectureRoute);
    return (
      <div className="dashboard-content">
        <DashNav dispatch={dispatch} />
        <Route path="/dashboard/class" render={this.renderCohort} />
        <Route path="/dashboard/lectures" render={this.renderLecturesList} />
        <Route path="/dashboard/addClass" component={AddClass} />
        <Route path="/dashboard/editClass" component={EditClass} />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  updateProfile,
  allLectures,
  currentLecture,
}, dispatch);

const mapStateToProps = (state) => {
  const { email, username, userType, fName, lName, cohort } = state.profile;
  const { lectureId, name, topics, lectures } = state.lectures;
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));

