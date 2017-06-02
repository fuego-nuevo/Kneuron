import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateProfile } from '../../actions/CurrentProfile';
import DashNav from './DashboardNavBar';
import Home from './Home';
import AddClass from '../../components/Cohorts/AddClass';
import AddLecture from '../../components/Lectures/AddLecture';
import CohortsList from '../../components/Cohorts/CohortsList';
import CurrentLecture from '../../components/Lectures/CurrentLecture';
import LecturesList from '../../components/Lectures/LecturesList';
import QuizList from '../../components/Quizzes/QuizList';
import AddQuiz from '../../components/Quizzes/AddQuiz';
import LiveLecture from '../../components/Lectures/LiveLecture';
import { allLectures } from '../../actions/Lectures';
import { currentLecture } from '../../actions/CurrentLecture';
import { reduxDataSearch } from '../../actions/Search';
import AddTopic from '../../components/Topics/AddTopic';
import AddQuestion from '../Questions/AddQuestion';
import SearchedDataItemsList from '../../components/SearchedContent/SearchedDataItemsList';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      selectedLecture: this.props.currentLecture.lectureId || '',
      lat: 0,
      lng: 0,
      alt: 0,
    };

    this.fetchTeacherInfo = this.fetchTeacherInfo.bind(this);
    this.handleLectureClick = this.handleLectureClick.bind(this);
    this.getUserCoordinates = this.getUserCoordinates.bind(this);
    this.getSeaLevelAmount = this.getSeaLevelAmount.bind(this);
  }
  componentDidMount() {
    this.getUserCoordinates();
    this.fetchTeacherInfo()
    .then(() => {
      this.setState({ selectedLecture: this.props.currentLecture.lectureId });
    })
      .catch((err) => {
        console.log('error in initial fetch , ', err);
      });
  }

  componentDidUpdate(){
    this.getSeaLevelAmount();
  }

  getUserCoordinates() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log("INSIDE NAV LOC FUNCTION: ", position.coords.latitude);
        this.setState({ lat: position.coords.latitude, lng: position.coords.longitude });
      });
    }
  }

  async getSeaLevelAmount() {
    console.log("State in dashboard is: ", this.state)
    try {
      const body = {
        lat: this.state.lat.toString(),
        lng: this.state.lng.toString(),
      };
      const altitude = await axios.post('/api/teachers/elevation', body);
      console.log('GOOGLE RESPONSE IS: ', altitude);
    } catch (error) {
      console.log("FUCK, IT DIDN'T GET BACK THE DATA!!!!");
    }
  }

  async fetchTeacherInfo() {
    try {
      const profile = await axios.get(`/api/teachers/${localStorage.getItem('id_token')}`);
      console.log('fetch teacher info ran');
      this.setState({ profile: profile.data }, () => {
        this.props.updateProfile(profile);
      });
    } catch (error) {
      console.log('error with your fetch teacher shit ,', error);
    }
  }

  handleLectureClick(lectureId) {
    const { lectures } = this.props;
    this.setState({ selectedLecture: lectureId }, () => this.props.currentLecture(lectures.filter(lecture => lecture.id === this.state.selectedLecture)));
  }

  render() {
    const { dispatch, history, cohort, lectures, lectureId, liveLectureTopics, quizzes, currentCohortId, name, quizId, topics, searchedResults } = this.props;
    const currentLectureRoute = `/dashboard/lectures${this.props.lectureId}`;
    console.log(this.props);
    console.log("LAT AND LNG ARE: ", this.state.lat);
    console.log("LAT AND LNG ARE: ", this.state.lng);
    return (
      <div className="dashboard-content">
        <DashNav dispatch={dispatch} history={history} cohort={cohort || []} fetchTeacherInfo={this.fetchTeacherInfo} reduxDataSearch={this.props.reduxDataSearch} />
        <Route path="/dashboard/home" component={Home} />
        <Route
          path="/dashboard/class" component={() => (<CohortsList
            fetchTeacherInfo={this.fetchTeacherInfo}
            history={history}
            cohorts={cohort || []}
            allLectures={this.props.allLectures}
            currentLecture={this.props.currentLecture.lectureId}
          />)}
        />
        <Route
          path="/dashboard/lectures"
          component={() => (<LecturesList
            lectures={lectures || []}
            history={history}
            fetchTeacherInfo={this.fetchTeacherInfo}
            selectedLecture={lectureId}
            handleLectureClick={this.handleLectureClick}
          />)}
        />
        <Route path="/dashboard/livelecture" component={() => (<LiveLecture history={history} topics={liveLectureTopics || []} />)} />
        <Route path="/dashboard/addClass" component={() => (<AddClass history={history} fetchTeacherInfo={this.fetchTeacherInfo} />)} />
        <Route path="/dashboard/addQuiz" component={() => (<AddQuiz history={history} fetchTeacherInfo={this.fetchTeacherInfo} />)} />
        <Route path="/dashboard/quiz" component={() => (<QuizList history={history} fetchTeacherInfo={this.fetchTeacherInfo} quizzes={quizzes || []} />)} />
        <Route path="/dashboard/addLecture" component={() => (<AddLecture history={history} cohortId={currentCohortId} fetchTeacherInfo={this.fetchTeacherInfo} />)} />
        <Route path="/dashboard/addTopic" component={() => (<AddTopic history={history} lectureId={lectureId} name={name} fetchTeacherInfo={this.fetchTeacherInfo} />)} />
        <Route path="/dashboard/addQuestion" component={() => (<AddQuestion history={history} fetchTeacherInfo={this.fetchTeacherInfo} quizId={quizId} />)} />
        <Route
          path={currentLectureRoute}
          component={props => (<CurrentLecture
            location={props.location}
            lectureId={lectureId || ''}
            history={history}
            fetchTeacherInfo={this.fetchTeacherInfo}
            name={name || ''}
            topics={topics || []}
          />)}
        />
        <Route
          path="/dashboard/search"
          component={() => (<SearchedDataItemsList
            history={history}
            lectureId={lectureId || ''}
            handleLectureClick={this.handleLectureClick}
            searchedContentResults={searchedResults || []}
            allLectures={this.props.allLectures}
            fetchTeacherInfo={this.fetchTeacherInfo}
          />)}
        />
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => bindActionCreators({
  updateProfile,
  allLectures,
  currentLecture,
  reduxDataSearch,
}, dispatch);

const mapStateToProps = (state) => {
  const { email, username, userType, fName, lName, cohort, image, id } = state.profile;
  const { lectures, currentCohortId } = state.lectures;
  const { lectureId, name, topics } = state.currentLecture;
  const { liveLectureId, liveLectureName, liveLectureTopics } = state.currentLiveLecture;
  const { topicId, quizzes } = state.currentTopic;
  const { searchedResults } = state.searchedResults;
  const { quizId } = state.currentQuiz;
  return {
    id,
    email,
    username,
    userType,
    fName,
    lName,
    cohort,
    lectureId,
    lectures,
    liveLectureId,
    liveLectureName,
    liveLectureTopics,
    currentCohortId,
    name,
    topics,
    topicId,
    quizzes,
    quizId,
    searchedResults,
    image,
  };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
