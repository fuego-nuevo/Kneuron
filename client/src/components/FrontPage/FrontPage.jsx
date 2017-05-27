import React, { Component } from 'react';
<<<<<<< HEAD:client/src/components/FrontPage/FrontPage.jsx
import Login from '../../components/Logging/Login';
=======
import Login from '../Logging/Login';
>>>>>>> edeb15198d4cf381160e195e8aa682633f342e76:client/src/components/FrontPage/FrontPage.jsx
import NavBar from './FrontPageNav';
import { loginUser } from '../../actions/Login';

class FrontPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dispatch, errorMessage, history, isAuthenticated } = this.props;
    console.log(this.props);
    return (
      <div>
        <NavBar />
        <div className="front">
          <form className="login">
            <div className="login-top">LOGIN</div>
            <Login
              history={history}
              isAuthenticated={isAuthenticated}
              errorMessage={errorMessage}
              onLoginClick={creds => dispatch(loginUser(creds, history))}
            />
          </form>
        </div>
      </div>
    );
  }
}


export default FrontPage;
