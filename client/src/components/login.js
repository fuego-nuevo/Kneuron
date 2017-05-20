import React, { Component } from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClick(event) {
    const email = this.refs.email
    const password = this.refs.password
    const userType = this.refs.userType
    const fName = this.refs.fName
    const lName = this.refs.lName
    const creds = { email: email.value.trim(), password: password.value.trim(), userType: userType.value.trim(), fName: fName.value.trim(), lName: lName.value.trim() }
    this.props.onLoginClick(creds)
  }

  render() {
    const { errorMessage } = this.props;
    return(
    <div>
        <input type='text'
        ref='fName'
        className="form-control"
        placeholder='First Name'
        />
        <input type='text'
        ref='lName'
        className="form-control"
        placeholder='Last Name'
        />
        <input type='text'
        ref='email'
        className="form-control"
        placeholder='Email'
        />
        <input type='password'
        ref='password'
        className="form-control"
        placeholder='Password'
        />
        <input type="radio"
        ref="userType"
        name="account"
        value="teacher"
        checked>
          Teacher
        </input>
        <br/>
        <input type="radio"
        ref="userType"
        name="account"
        value="student">
          Student
        </input>
        <br/>
        <button onClick={(event) => this.handleClick(event)} className="btn btn-primary">
          Login
        </button>
    </div>
    );
  }
}


export default Login;
