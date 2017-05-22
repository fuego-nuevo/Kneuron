import React, { Component } from 'react';
import Routing from './routing';
import { connect }  from 'react-redux';
import { loginUser } from '../actions/login';
<<<<<<< HEAD
=======
import NavBar from '../components/navBar';
>>>>>>> e562a806bb265b1ad0ea94ff90aa68a31c58f7c4
import UserProfile from '../components/userProfile'
import Login from '../components/login';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
<<<<<<< HEAD
        <Routing />
=======
        <NavBar
        isAuthenticated={isAuthenticated}
        errorMessage={errorMessage}
        dispatch={dispatch}
        />
>>>>>>> e562a806bb265b1ad0ea94ff90aa68a31c58f7c4
        <UserProfile />
      </div>
    );
  }
}

export default (App);
