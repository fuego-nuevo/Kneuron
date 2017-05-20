import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  handleClick(event) {
    const email = this.refs.email
    const password = this.refs.password
    const creds = { email: email.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }

  render() {
    const { errorMessage } = this.props;
    return(
    <div>
        <input type='text'
        ref='email'
        className="form-control"
        placeholder='email'
        />
        <input type='password'
        ref='password'
        className="form-control"
        placeholder='Password'
        />
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>
    </div>
    );
  }
}


export default Login;