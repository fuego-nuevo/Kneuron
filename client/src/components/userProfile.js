import React, { Component } from 'react';
import axios from 'axios';
// import ReactDOM from 'react-dom';
// import { Link } from 'react-router';
// import { Button } from 'semantic-ui-react';
import { PageHeader } from 'react-bootstrap';

class UserProfile extends Component {
  constructor (props) {
    super (props)

    this.state = {
      // user info blablalablalbalb
    }
    
  }

  componentDidMount() {
    this.fetchUser();
  }


  fetchUser() {

    axios.get(`/api/users/${auth}`)
        .then((res) => {
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
        <div >
          <h1 ><Link to='make a link to the edit profiles page'><Button>Edit Profile</Button></Link></h1>
        </div>
      </div>
    )
  }
}

export default UserProfile;