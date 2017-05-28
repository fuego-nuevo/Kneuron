import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import lectures from './Lectures';
import currentLecture from './CurrentLecture';
import currentLiveLecture from './CurrentLiveLectureReducer';
import CurrentProfile from './CurrentProfileReducer';
import currentQuiz from './CurrentQuizReducer';
import currentTopic from './CurrentTopicReducer';

const RootReducer = combineReducers({
  profile: CurrentProfile,
  auth: AuthReducer,
  lectures,
  currentLecture,
  currentTopic,
  currentQuiz,
  currentLiveLecture,
});

export default RootReducer;
