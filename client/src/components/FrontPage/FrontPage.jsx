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
              <p>Sign up as an Admin or Teacher. Upon creation, a code for your school or class will be provided to you. Give your teacher or students the code to allow them to sign up!</p>
            </div>
            <div>
              <h1>Add Classes</h1>
              <img alt="apple" src="http://gdurl.com/BRHL" height="150px" width="150px" />
              <p>Create your curriculum. As a teacher, add your classes, and create lectures, topics, and quizzes</p>
            </div>
            <div>
              <h1>Start Teaching</h1>
              <img alt="apple" src="http://gdurl.com/hSxT" height="150px" width="150px" />
              <p>Facilitate a smoother lecture. Students can ask questions on particular topics without interuppting the flow of a lesson. Administer pop quizzes and observe performance</p>
            </div>
            <div>
              <h1>Track Attendance</h1>
              <img alt="apple" src="http://gdurl.com/wmZT" height="150px" width="150px" />
              <p>Take attendance with just a push of a button. During a live lecture, students can take attendance via facial recognition</p>
            </div>
            <div>
              <h1>View Performance</h1>
              <img alt="apple" src="http://gdurl.com/ClDs" height="150px" width="150px" />
              <p>Track the performance of your classes. Analyze how your classes are performing as a whole, and how well a particular student is performing</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default FrontPage;
