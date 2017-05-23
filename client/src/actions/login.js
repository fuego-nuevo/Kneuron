import axios from 'axios';
// <<<<<<< HEAD
import { forceRefresh } from '../utils/forceRefresh';
// =======
// import currentProfile from './currentProfile';
// const requestLogin = (creds) => {
//   return {
//     type: 'LOGIN_REQUEST',
//     isFetching: true,
//     isAuthenticated: false,
//     creds
//   }
// }
// >>>>>>>  created actions for current user and reducer thingy
// =======
// import currentProfile from './currentProfile';
// const requestLogin = (creds) => {
//   return {
//     type: 'LOGIN_REQUEST',
//     isFetching: true,
//     isAuthenticated: false,
//     creds
//   }
// }
// >>>>>>>  created actions for current user and reducer thingy

const requestLogin = creds => ({
  type: 'LOGIN_REQUEST',
  isFetching: true,
  isAuthenticated: false,
  creds,
});

const receiveLogin = user => ({
  type: 'LOGIN_SUCCESS',
  isFetching: false,
  isAuthenticated: true,
  id_token: user.id_token,
});

const loginError = message => ({
  type: 'LOGIN_FAILURE',
  isFetching: false,
  isAuthenticated: false,
  message,
});

const requestLogout = () => ({
  type: 'LOGOUT_REQUEST',
  isFetching: true,
  isAuthenticated: true,
});

const receiveLogout = () => ({
  type: 'LOGOUT_SUCCESS',
  isFetching: false,
  isAuthenticated: false,
});

exports.loginUser = (creds, history) => {
  console.log('This is Creds: ', creds);
  return (dispatch) => {
    dispatch(requestLogin(creds));

    return axios.get(`http://localhost:8080/api/teachers/${creds.email}/${creds.password}`)
// <<<<<<< HEAD
      .then((response) => {
        console.log(response);
        if (response.statusText !== 'OK') {
          dispatch(loginError('Bad Request...'));
          return Promise.reject(response);
// =======
//       .then(response => {
//         console.log("this is the response in line 54 of actions ", response);
//         if (response.statusText !== 'OK') {
//           dispatch(loginError('Bad Request...'))
//           return Promise.reject(response)
//         } else {
//           localStorage.setItem('id_token', response.data.id_token);
//           localStorage.setItem('access_token', response.data.id_token);
//           dispatch(receiveLogin(response.data));
//           dispatch(currentProfile(response.data));
//           history.push('/dashboard');
//           window.location.reload();
// >>>>>>>  created actions for current user and reducer thingy

        }
        localStorage.setItem('id_token', response.data.id_token);
        localStorage.setItem('access_token', response.data.id_token);
        dispatch(receiveLogin(response.data));
        history.push('/dashboard');
        forceRefresh();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
};

exports.signupUser = (creds, history) => {
  console.log('this is the request in signup line 62 ', creds);
  const body = {
    email: creds.email,
    password: creds.password,
    userType: 0,
    fName: creds.fName,
    lName: creds.lName,
    username: creds.username,
  };
  return (dispatch) => {
    dispatch(requestLogin(creds));

    return axios.post('http://localhost:8080/api/teachers', body)
      .then((response) => {
        console.log(response);
        if (response.statusText !== 'Created') {
          dispatch(loginError('Bad Request...'));
          console.log('user did not sign up succesfully')
          return Promise.reject(response);
        }
        localStorage.setItem('id_token', response.data.id_token);
        localStorage.setItem('access_token', response.data.id_token);
        dispatch(receiveLogin(response.data));
        console.log('user did sign up succesfully')
        history.push('/dashboard');
        forceRefresh();
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
};


exports.logoutUser = () => {
  console.log('yooo logout ran');
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    dispatch(receiveLogout());
  };
};
