import React, { Component } from 'react';
import axios from 'axios';

class EditProfile extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      email: "",
      fName: "",
      lName: ""
    }
  }


// componentDidMount() {
// }

userNameChange(e) {
  this.setState({
    username: e.target.value
  })
}
emailChange(e) { 
  this.setState({
    email: e.target.value
})
}
fNameChange(e) {
  this.setState({
    fName: e.target.value
  })
}
lNameChange(e) {
  this.setState({
    lName: e.target.value
  })
}




handleSubmit() {
  // some kind of put logic to the database.
}

  render() {
    return (
      <div>
      <h1> Edit Your Profile Here: </h1> 
  <form onSubmit={this.handleSubmit}>
    <div>
      <label>UserName</label>
      <input placeholder='Name' onChange={(e) => {this.userNameChange(e)}}/>
    </div>
    <div>
      <label>email</label>
      <input placeholder='email' onChange={(e) => {this.emailChange(e)}}/>
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
  </div>
    )
  }

}
export default EditProfile;
