import { combineReducers } from 'redux';
import CurrentProfile from './currentProfileReducer';
import lectures from './lectures';
import currentLecture from './currentLecture';
import AuthReducer from './authReducer';


const RootReducer = combineReducers({
  profile: CurrentProfile,
  auth: AuthReducer,
  lectures,
  currentLecture
});

export default RootReducer;
