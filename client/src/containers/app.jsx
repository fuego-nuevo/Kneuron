import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routing from './routing';
import { connect }  from 'react-redux';
import { loginUser } from '../actions/login';
import UserProfile from '../components/userProfile'
import Login from '../components/login';


class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <BrowserRouter>
        <Routing />
      </BrowserRouter>     
    );
  }
}

export default App;
