import { combineReducers } from 'redux';
import CurrentProfile from './currentProfileReducer';
import lectures from './lectures';
import AuthReducer from './authReducer';


const RootReducer = combineReducers({
  profile: CurrentProfile,
  auth: AuthReducer,
  lectures,
});

export default RootReducer;
