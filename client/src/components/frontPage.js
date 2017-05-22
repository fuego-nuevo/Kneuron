import React, { Component } from 'react';
import Login from '../components/login';
import NavBar from '../components/frontPageNav';
import { loginUser } from '../actions/login';

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dispatch, errorMessage, history, isAuthenticated } = this.props;
    return(
      <div>
        <NavBar/>
          <div className="front">
            <form className="login">
              <div className="login-top">LOGIN</div>
              <Login
               history={history}
               isAuthenticated={isAuthenticated}
               errorMessage={errorMessage}
               onLoginClick={ creds => dispatch(loginUser(creds, history)) } />
            </form>
          </div>
      </div>
    );
  }
}


export default FrontPage;
