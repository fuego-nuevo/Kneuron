import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { loginUser } from '../actions/login';
import NavBar from '../components/navBar';
import Login from '../components/login';
import { BrowserRouter, Route } from 'react-router-dom';
import FrontPage from '../components/frontPage';
import UserProfile from '../components/userProfile';

class Router extends Component {
  render() {
    const { dispatch, errorMessage, isAuthenticated } = this.props;
    return( 
      <BrowserRouter>
      <div>
        <NavBar
            isAuthenticated={isAuthenticated}
            errorMessage={errorMessage}
            dispatch={dispatch}
            />
          <Route exact path="/" render={FrontPage}/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const { auth } = state
  const { isAuthenticated, errorMessage } = auth

  return {
    isAuthenticated,
    errorMessage
  }
}

export default connect(mapStateToProps)(Router);