import React, { Component } from 'react';
import Login from '../components/login';
import { loginUser } from '../actions/login';

class FrontPage extends Component {

  render() {
    const { dispatch, errorMessage } = this.props;
    return(
      <div>
        <form>
          <Login
           errorMessage={errorMessage}
           onLoginClick={ creds => dispatch(loginUser(creds)) } />
        </form>
      </div>
    );
  }
}


export default FrontPage;
