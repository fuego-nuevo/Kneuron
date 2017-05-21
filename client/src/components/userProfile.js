import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Button } from 'semantic-ui-react';
import { PageHeader } from 'react-bootstrap';

class UserProfile extends Component {
  constructor (props) {
    super (props)

    this.state = {
      username: "",
      email: "",
      fName: "",
      lName: "",
    }
    
  }

  componentDidMount() {
    this.fetchUser();
  }


  fetchUser() {

    axios.get(`/api/users/${token}`)
      .then((res) => {
        this.setState({username: res.data.username, email: res.data.username, fName: res.data.fName, lName: res.data.lName})
      })
      .catch(err => {
        console.log('Error in fetchUsers in UserProfile: ', err);
        })
  }

  render() {
    return(
      <div>
        <div >
          <PageHeader>Your Profile <small>Account information</small></PageHeader>
        </div>
        <div>{this.state.username}</div>
        <div>{this.state.email}</div>
        <div>{this.state.fName}</div>
        <div>{this.state.lName}</div>
        <div >
          {/*<h1 ><Link to='editprofile'><Button>Edit Profile</Button></Link></h1>*/}
        </div>
      </div>
    )
  }
}

export default UserProfile;