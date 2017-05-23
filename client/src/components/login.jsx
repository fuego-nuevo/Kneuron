import React, { Component } from 'react';
import '../styles/main.css';
import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick(event) {
    event.preventDefault();
    const email = this.refs.email;
    const password = this.refs.password;
    const creds = { email: email.value.trim(), password: password.value.trim() };
    this.props.onLoginClick(creds, this.props.history);
    this.props.history.push('/editprofile')
    console.log(this.props, 'this props first');
  }

  // componentDidUpdate () {
  //   console.log("this is the logincomplete in login: ", this.props.loginComplete);
  //   if (this.props.loginComplete){
  //   console.log("===============================")
  //     setTimeout(() => { this.props.history.push('/editprofile')}, 2000);
  //   }
  // }
  render() {
    console.log("this is the state line 25 in login" , this.props.loginComplete)
    const { errorMessage } = this.props;
    console.log(this.props, 'this props second');
    console.log('this is login');
    return (
      <div>
        <div className="login-input">
          <input
            type="text"
            ref="email"
            className="form-control"
            placeholder="email"
          />
          <input
            type="password"
            ref="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <hr />
        <button onClick={event => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profile.profile,
    loginComplete: state.profile.loginComplete,
  }
}


export default connect(mapStateToProps)(Login);

