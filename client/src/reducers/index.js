import { combineReducers } from 'redux';
import CurrentProfile from './CurrentProfileReducer';
import lectures from './Lectures';
import currentLecture from './CurrentLecture';
import currentTopic from './CurrentTopicReducer';
import AuthReducer from './AuthReducer';


const RootReducer = combineReducers({
  profile: CurrentProfile,
  auth: AuthReducer,
  lectures,
  currentLecture,
  currentTopic,
});

export default RootReducer;
