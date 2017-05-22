import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signupUser } from '../actions/login';

class SignUp extends Component {
  constructor(props) {
    super(props);
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
    this.setState({ [name]: e.target.value });
  }

  render() {
    return (
      <div>
        SIGNUP!
        <form onSubmit={(e) => { e.preventDefault(); this.props.signupUser(this.state, this.props.history); }} autoComplete="on">
          <div><label htmlFor="email">Email</label></div>
          <input onChange={this.handleChange} name="email" value={this.state.email} type="email" />
          <div><label htmlFor="fName">first name</label></div>
          <input onChange={this.handleChange} name="fName" value={this.state.fName} type="text" pattern="[a-z]{1,15}" />
          <div><label htmlFor="lName">last name</label></div>
          <input onChange={this.handleChange} name="lName" value={this.state.lName} type="text" />
          <div><label htmlFor="username">username</label></div>
          <input
            onChange={this.handleChange}
            name="username"
            value={this.state.username}
            type="text"
          />
          <div><label htmlFor="password">password</label></div>
          <input
            onChange={this.handleChange}
            name="password"
            value={this.state.password}
            type="password"
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}


export default connect(null, { signupUser })(SignUp);
