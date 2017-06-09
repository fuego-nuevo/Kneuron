import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
        fName: 'jason',
        lName: 'kim',
        username: 'jasonk',
    };
    this.userNameChange = this.userNameChange.bind(this);
    this.fNameChange = this.fNameChange.bind(this);
    this.lNameChange = this.lNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  userNameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  fNameChange(e) {
    this.setState({
      fName: e.target.value,
    });
  }

  lNameChange(e) {
    this.setState({
      lName: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const body = {
      fName: this.state.fName,
      lName: this.state.lName,
      username: this.state.username,
    };
    axios.put(`/api/teachers/${localStorage.getItem('id_token')}`, body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('Err: ', err);
      });
  }

  render() {
    return (
      <div>
        <h1> Edit Your Profile Here: </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>UserName</label>
            <input placeholder="UserName" onChange={(e) => { this.userNameChange(e); }} />
          </div>
          <div>
            <label>First Name</label>
            <input placeholder="first Name" onChange={(e) => { this.fNameChange(e); }} />
          </div>
          <div>
            <label>Last Name</label>
            <input placeholder="Last Name" onChange={(e) => { this.lNameChange(e); }} />
          </div>
          <h1><button type='submit'>Submit</button></h1>
        </form>
      </div>
    );
  }
}

export default EditProfile;
