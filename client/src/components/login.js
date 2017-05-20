import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }
  
  handleClick(event) {
    const username = this.refs.username
    const password = this.refs.password
    const creds = { username: username.value.trim(), password: password.value.trim() }
    this.props.onLoginClick(creds)
  }

  render() {
    const { errorMessage } = this.props;
    return(
    <div>
        <input type='text'
        ref='username'
        className="form-control"
        placeholder='Username'
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