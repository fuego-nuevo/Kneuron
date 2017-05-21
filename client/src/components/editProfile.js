import React, { Component } from 'react';
import axios from 'axios';

class EditProfile extends Component {
  constructor() {
    super();

    this.state = {
      username: "".
      email: "",
      fName: "",
      lName: ""
    }
  }
}

componentDidMount() {
}

  render() {
    return (
      <h1> Edit Your Profile Here: </h1> <br/>
  <form onSubmit={this.handleSubmit}>
    <div>
      <label>UserName</label>
      <input placeholder='Name' onChange={(e) => {this.userNameChange(e)}}/>
    </div>
    <div>
      <label>email</label>
      <input placeholder='email' onChange={(e) => {this.userNameChange(e)}}/>
    </div>
    <div>
      <label>First Name</label>
      <input placeholder='fName' onChange={(e) => {this.fNameChange(e)}} />
    </div>
    <div>
      <label>Last Name</label>
      <input placeholder='lName' onChange={(e) => {this.lNameChange(e)}} />
    </div>      
  </form>
    )
}

  export default EditProfile;
