import { combineReducers } from 'redux';
import lectures from './Lectures';
import currentLecture from './CurrentLecture';
import CurrentProfile from './CurrentProfileReducer';
import currentQuiz from './CurrentQuizReducer';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import currentLiveLecture from './CurrentLiveLectureReducer';
import currentTopic from './CurrentTopicReducer';
import isLive from './IsLectureLive';

const RootReducer = combineReducers({
  profile: CurrentProfile,
  auth: AuthReducer,
  lectures,
  currentLecture,
  currentTopic,
  currentQuiz,
  searchedResults: SearchReducer,
  currentLiveLecture,
  isLive,
});

export default RootReducer;
