import React, { Component } from 'react';
import axios from 'axios';
// import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
// import { Button } from 'semantic-ui-react';
import { PageHeader } from 'react-bootstrap';
// import EditProfile from './editProfile';

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
    // try{
    //   const user = await axios.get(`/api/teacher/${localStorage.getItem('id_token')}`);
    //   console.log("Grabbed User: ", user);
    //   this.setState({ username: user.data.username, email: user.data.email, fName: user.data.fName, lName: user.data.lName });
    // } catch(error) {
    //   console.log("Error grabbing user: ", error);
    // }
    console.log('localStorage ', `/api/teacher/${localStorage.getItem('id_token')}`);
    axios.get('/api/teachers/' + localStorage.getItem('id_token'))
    .then((data) => {
      console.log("this is the response in user profile fuckkk you", data);
      this.setState({ username: data.data.username, email: data.data.email, fName: data.data.fName, lName: data.data.lName });
    })
    .catch((err) => {
      if (err){
        console.log('there was an error fetching user', err);
      }
    })
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
