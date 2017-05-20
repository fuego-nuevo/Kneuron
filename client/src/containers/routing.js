import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { loginUser } from '../actions/login';
import NavBar from '../components/navBar';
import Login from '../components/login';
import { BrowserRouter } from 'react-router-dom';

class Router extends Component {
  render() {
    const { dispatch, errorMessage, isAuthenticated } = this.props;
    return( 
      <BrowserRouter>
        <NavBar
            isAuthenticated={isAuthenticated}
            errorMessage={errorMessage}
            dispatch={dispatch}
            />
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