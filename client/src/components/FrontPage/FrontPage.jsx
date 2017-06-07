import React, { Component } from 'react';
import Login from '../../components/Logging/Login';
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
        <div className="dark-overlay" />
        <div className="web-desc">
          <h1 id="hl-manage">Manage your classroom workflow,</h1>
          <h1 id="hl-track">keep track of student progress,</h1>
          <h1>& much more</h1>
          <p>Kneuron is an interactive learning app that looks to remedy classroom disruptions and inefficiency with its seamless and easy to use interface</p>
        </div>
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
        <div className="service-container">
          <div id="how-we-work">
            <h1>How It Works</h1>
          </div>
          <div id="how-we-work-desc">
            <div>
              <h1>Sign Up</h1>
              <img alt="apple" src="http://gdurl.com/C18h" height="150px" width="150px" />
              <p>Sign up as an admin or teacher to get started, a code for your school or class will be provided to you upon succesful creation to allow you to add students or teachers</p>
            </div>
            <div>
              <h1>Add Classes</h1>
              <img alt="apple" src="http://gdurl.com/BRHL" height="150px" width="150px" />
              <p>Sign up as an admin or teacher to get started, a code for your school or class will be provided to you upon succesful creation to allow you to add students or teachers</p>
            </div>
            <div>
              <h1>Start Teaching</h1>
              <img alt="apple" src="http://gdurl.com/hSxT" height="150px" width="150px" />
              <p>Sign up as an admin or teacher to get started, a code for your school or class will be provided to you upon succesful creation to allow you to add students or teachers</p>
            </div>
            <div>
              <h1>Track Attendance</h1>
              <img alt="apple" src="http://gdurl.com/wmZT" height="150px" width="150px" />
              <p>Sign up as an admin or teacher to get started, a code for your school or class will be provided to you upon succesful creation to allow you to add students or teachers</p>
            </div>
            <div>
              <h1>View Performance</h1>
              <img alt="apple" src="http://gdurl.com/ClDs" height="150px" width="150px" />
              <p>Sign up as an admin or teacher to get started, a code for your school or class will be provided to you upon succesful creation to allow you to add students or teachers</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default FrontPage;
