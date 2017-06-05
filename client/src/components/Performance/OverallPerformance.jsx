import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Performance extends Component {
  constructor() {
    super();
    this.state = {
      allPerformanceData: null,
    };
  }

  componentDidMount() {
    const { profile } = this.props;
    axios.get(`/api/performances/performanceForEveryStudentForAllCohorts/${profile.id}`)
      .then(({ data }) => {
        console.log('this is the data in CDM of performances', data);
        this.setState({ allPerformanceData: data }, () => {
          console.log('this is the state of allPerformanceData ', this.state.allPerformanceData[1].studentcohorts);
        });
      })
      .catch(error => console.log('Error in CDM of Performance.jsx: ', error));
  }

  render() {
    return (
      <div>
        <button><Link to="/dashboard/overallPerformance/cohorts">Class Performance</Link></button>

        
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(Performance);
