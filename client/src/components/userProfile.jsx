import React, { Component } from 'react';
import axios from 'axios';
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router';
// import { Button } from 'semantic-ui-react';
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


 async fetchUser() {
    try{
      const user = await axios.get(`/api/users/${localStorage.getItem('id_token')}`);
      console.log("Grabbed User: ", user.data);
      this.setState({ username: user.data.username, email: user.data.email, fName: user.data.fName, lName: user.data.lName });
    } catch(error) {
      console.log("Error grabbing user: ", error);
    }
  }


 render() {
    return (
      <div>
        <PageHeader>Your Profile <small>Account information</small></PageHeader>
        <div>{this.state.username}</div>
        <div>{this.state.email}</div>
        <div>{this.state.fName}</div>
        <div>{this.state.lName}</div>
      </div>
    );
  }
}

       // {/*<div >
        //   <h1 ><Link to='editprofile'><button>Edit Profile</button></Link></h1>
        // </div>*/}
export default UserProfile;