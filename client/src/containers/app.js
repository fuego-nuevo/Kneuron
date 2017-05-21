import React, { Component } from 'react';
import Routing from './routing';
import { connect }  from 'react-redux';
import { loginUser } from '../actions/login';
import NavBar from '../components/navBar';
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
        <Routing />
        <NavBar
        isAuthenticated={isAuthenticated}
        errorMessage={errorMessage}
        dispatch={dispatch}
        />
        <UserProfile />
      </div>
    );
  }
}

export default (App);
