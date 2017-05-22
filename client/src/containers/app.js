import React, { Component } from 'react';
import Routing from './routing';
import { connect }  from 'react-redux';
import { loginUser } from '../actions/login';
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
        <UserProfile />
      </div>
    );
  }
}

export default (App);
