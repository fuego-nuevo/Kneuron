import React, { Component } from 'react';
import { Card, CardTitle } from 'react-materialize';
import { connect } from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { fName, lName, image, cohort } = this.props.profile;
    console.log(this.props);
    if (this.props.profile.fName) {
      return (
        <div className="teacher-profile">
          <div className="teacher-header" />
          <img alt="profile" className="profile-image" src={image || 'https://web.usask.ca/images/profile.jpg'} />
          <div className="prof-name"><h1>{fName}  {lName}</h1></div>
        </div>
      );
    }
    return (<div>
        .... loading
      </div>);
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Home);
