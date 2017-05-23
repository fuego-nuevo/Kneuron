// import { CURRENT_PROFILE } from '../actions/login';

const currentProfile = (state = {
  profile: null,
  loginComplete: false,
}, action) => {
  console.log("this is actoin in reducer!!!!!!!!! ", action)
  // console.log('told you jason current profile is undefined', CURRENT_PROFILE)
  switch (action.type) {
    case 'CURRENT_PROFILE':
      // return action.payload;
      return Object.assign({}, state, {
        profile: action.payload,
      });
    case 'loginComplete':
    return Object.assign({}, state, {
      loginComplete: true,
    })
    default:
      return state;
  }
};

export default currentProfile;
