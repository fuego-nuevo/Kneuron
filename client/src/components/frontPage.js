import React, { Component } from 'react';
import Login from '../components/login';
import { Redirect, Route } from 'react-router-dom';
import { loginUser } from '../actions/login';

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dispatch, errorMessage, history, isAuthenticated } = this.props;
    console.log('this is frontpage');
    return(
      <div>
        <form>
          <Login
           history={history}
           isAuthenticated={isAuthenticated}
           errorMessage={errorMessage}
           onLoginClick={ creds => dispatch(loginUser(creds, history)) } />
        </form>
      </div>
    );
  }
}


export default FrontPage;
