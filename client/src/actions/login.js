import axios from 'axios';
import { forceRefresh } from '../utils/forceRefresh';

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
      .then((response) => {
        console.log(response);
        if (response.statusText !== 'OK') {
          dispatch(loginError('Bad Request...'));
          return Promise.reject(response);
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

exports.signupUser = (creds) => {
  const userType = 0;
  const config = {
    headers: { 'Content-type': 'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}&userType=${userType}&fName=${creds.fName}&lName=${creds.lName}&username=${creds.username}`,
  };

  return (dispatch) => {
    dispatch(requestLogin(creds));

    return axios.get('http://localhost:8080/api/teachers/', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response })),
            )
            .then(({ user, response }) => {
              if (!response.ok) {
                dispatch(loginError(user.message));
                return Promise.reject(user);
              }
              localStorage.setItem('id_token', user.id_token);
              localStorage.setItem('id_token', user.access_token);
              dispatch(receiveLogin(user));
            })
        .catch(err => console.log('Error: ', err));
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
