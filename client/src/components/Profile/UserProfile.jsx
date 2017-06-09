import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PageHeader } from 'react-bootstrap';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'test',
      email: 'test',
      fName: 'test',
      lName: 'test',
    };
  }

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    axios.get(`/api/teachers/${localStorage.getItem('id_token')}`)
    .then((data) => {
      this.setState({ username: data.data.username, email: data.data.email, fName: data.data.fName, lName: data.data.lName });
    })
    .catch((err) => {
      if (err){
        console.log('There was an error fetching user', err);
      }
    });
  }

  render() {
    return (
      <div>
        <PageHeader>Your Profile <small>Account information</small></PageHeader>
        <div>{this.state.username}</div>
        <div>{this.state.email}</div>
        <div>{this.state.fName}</div>
        <div>{this.state.lName}</div>
        <Link to="/editprofile">Edit Profile</Link>
      </div>
    );
  }
}

export default UserProfile;
