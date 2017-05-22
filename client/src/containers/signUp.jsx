import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../actions/login';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      fName: '',
      lName: '',
      password: '',
      username: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [name]: e.target.value });
  }

  render() {
    console.log('this is the signup sheet!', this.state);
    return (
      <div>
        SIGNUP!
        <form autoComplete="on">
          <div><label htmlFor="email">Email</label></div>
          <input onChange={this.handleChange} name="email" value={this.state.email} type="email" />
          <div><label htmlFor="fName">first name</label></div>
          <input onChange={this.handleChange} name="fName" value={this.state.fName} type="text" />
          <div><label htmlFor="lName">last name</label></div>
          <input onChange={this.handleChange} name="lName" value={this.state.lName} type="text" />
          <div><label htmlFor="username">username</label></div>
          <input
            onChange={this.handleChange}
            name="username"
            value={this.state.password}
            type="text"
          />
          <div><label htmlFor="password">password</label></div>
          <input
            onChange={this.handleChange}
            name="password"
            value={this.state.username}
            type="username"
          />
        </form>
      </div>
    );
  }
}


export default SignUp;
