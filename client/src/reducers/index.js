import { combineReducers } from 'redux';
import CurrentProfile from './CurrentProfileReducer';
import lectures from './Lectures';
import currentLecture from './CurrentLecture';
import currentTopic from './CurrentTopicReducer';
import currentQuiz from './CurrentQuizReducer';
import AuthReducer from './AuthReducer';
import SearchReducer from './SearchReducer';
import currentLiveLecture from './CurrentLiveLectureReducer';

const RootReducer = combineReducers({
  profile: CurrentProfile,
  auth: AuthReducer,
  lectures,
  currentLecture,
  currentTopic,
  currentQuiz,
  searchedResults: SearchReducer,
  currentLiveLecture,
});

export default RootReducer;
