import axios from 'axios';


const requestLogin = (creds) => {
  return {
    type: 'LOGIN_REQUEST',
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

const receiveLogin = (user) => {
  return {
    type: 'LOGIN_SUCCESS',
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

const loginError = (message) => {
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
  console.log("This is Creds: ", creds);
  return dispatch => {

    dispatch(requestLogin(creds))

    console.log("Yoo", `http://localhost:8080/api/teachers/${creds.email}/${creds.password}`);

    return axios.get(`http://localhost:8080/api/teachers/${creds.email}/${creds.password}`)
      .then(response => {
        console.log(response);
        if (response.statusText !== 'OK') {
          dispatch(loginError('Bad Request...'))
          return Promise.reject(response)
        } else {
          localStorage.setItem('id_token', response.data.id_token)
          localStorage.setItem('access_token', response.data.id_token)

          dispatch(receiveLogin(response.data))
        }
      })
      .catch(err => {
        console.log("Error: ", err)
      })
  }
}

exports.signupUser = (creds) => {
  let userType = 0;
  const config = {
    headers: {'Content-type': 'application/x-www-form-urlencoded'},
    body: `email=${creds.email}&password=${creds.password}&userType=${userType}&fName=${creds.fName}&lName=${creds.lName}&username=${creds.username}`
  }

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return axios.get('http://localhost:8080/api/teachers/', config)
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
                console.log('login was succesful');
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
