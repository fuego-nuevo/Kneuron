import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signupUser } from '../actions/Login';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fName: '',
      lName: '',
      password: '',
      image: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  handleImageChange(e) {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    let image;
    reader.onloadend = () => {
      console.log(file.name);
      this.setState({ image: reader.result });
    }
    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div className="signup">
        <form className="signup-form" onSubmit={(e) => { e.preventDefault(); this.props.signupUser(this.state, this.props.history); }} autoComplete="on">
          <div className="signup-header">TEACHER SIGN UP </div>
          <div className="signup-info-container">
            <div className="signup-info">
              <div><label htmlFor="email">Email</label></div>
              <input onChange={this.handleChange} name="email" value={this.state.email} type="email" />
              <div><label htmlFor="fName">first name</label></div>
              <input onChange={this.handleChange} name="fName" value={this.state.fName} type="text" pattern="[a-z]{1,15}" />
              <div><label htmlFor="lName">last name</label></div>
              <input onChange={this.handleChange} name="lName" value={this.state.lName} type="text" />
              <div><label htmlFor="password">password</label></div>
              <input
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
                type="password"
              />
              <div><label htmlFor="profile">Profile Picture</label></div>
              <input id="image-upload" onChange={this.handleImageChange} type="file" name="profile-picture" />
              <input id="signup-button" type="submit" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(null, { signupUser })(SignUp);
