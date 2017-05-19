import React, { Component } from 'react';
import Login from './login';
import Logout from './logout';
import { loginUser, logoutUser } from '../actions/login';

class NavBar extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
      return (
      <nav>
        <div>
          {!isAuthenticated &&
            <Login
              errorMessage={errorMessage}
              onLoginClick={ creds => dispatch(loginUser(creds)) }
            />
          }
          {isAuthenticated && <Logout onLogoutClick={() => dispatch(logoutUser())} />}
        </div>
      </nav>
    );
  } 
}



export default NavBar;