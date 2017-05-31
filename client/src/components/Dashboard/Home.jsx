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
    console.log(image);
    return (
      <Card
        className="large"
        cohort={cohort}
      >
        <h1>Welcome {fName} {lName}</h1>
        <div className="teacher-profile-stats">
          <div className="teacher-profile-image">
            <img alt="profile" className="profile-image" src={image} />
          </div>
          <h2>{"# Of Cohort's: " } {cohort.length}</h2>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Home);
