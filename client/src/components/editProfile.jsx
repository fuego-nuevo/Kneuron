import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'jasonk',
      fName: 'jason',
      lName: 'kim',
      email: '',
    };
  }


  // componentDidMount() {
  // }

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




  // handleSubmit() {

  // }

  render() {
    console.log('this is props from redux profile', this.props)
    return (
      <div>
        <h1> Edit Your Profile Here: </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>UserName</label>
            <input placeholder="UserName" onChange={(e) => { this.userNameChange(e); }} />
          </div>
          <div>
            <label>email</label>
            <input placeholder="Email" onChange={(e) => { this.emailChange(e); }} />
          </div>
          <div>
            <label>First Name</label>
            <input placeholder="first Name" onChange={(e) => { this.fNameChange(e); }} />
          </div>
          <div>
            <label>Last Name</label>
            <input placeholder="Last Name" onChange={(e) => { this.lNameChange(e); }} />
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('state in editProfile', state)
  return {
    profile: state.profile
  }
}
// const mapStateToProps = state => ({
//   profile: state.profile,
// });
export default withRouter(connect(mapStateToProps)(EditProfile));
