import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ProfileReducer from './profileReducer';
import Auth0 from './Auth0Reducer';
import authReducer from './Auth0Reducer';

const rootReducer = combineReducers({
  routing,
  ProfileReducer,
  auth: authReducer,
});

export default rootReducer;
