import axios from 'axios';


const requestLogin = (creds) => {
  return {
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

const receiveLogin = () => {
  return {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

const loginError = () => {
  return {
    type: 'LOGIN_FAILURE',
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

const requestLogout = () => {
  return {
    type: 'LOGOUT_REQUEST',
    isFetching: true,
    isAuthenticated: true
  }
}

const receiveLogout = () => {
  return {
    type: 'LOGOUT_SUCCESS',
    isFetching: false,
    isAuthenticated: false
  }
}

exports.loginUser = (creds) => {
  const config = {
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    body: `username=${creds.username}&password=${creds.password}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return axios.post('http://localhost:8080/api/teachers/', config)
      .then(response =>
        response.json()
        .then(user => ({ user, response }))
            )
            .then(({ user, response }) =>  {
              if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
                dispatch(loginError(user.message))
                return Promise.reject(user)
              } else {
                // If login was successful, set the token in local storage
                localStorage.setItem('id_token', user.id_token)
                localStorage.setItem('id_token', user.access_token)
                // Dispatch the success action
                dispatch(receiveLogin(user))
              }
        })
        .catch(err => console.log("Error: ", err))
  }
}

exports.logoutUser = () => {
  console.log('yooo logout ran')
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    localStorage.removeItem('access_token')
    dispatch(receiveLogout())
  }
}