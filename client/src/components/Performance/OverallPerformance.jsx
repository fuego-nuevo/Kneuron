import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import TeacherNetwork from './TeacherNetwork';
import CohortPerformance from './CohortPerformance';

class OverallPerformance extends Component {
  constructor() {
    super();
    this.state = {
      allPerformanceData: [],
      allCohortData: [],
      chosenCohortId: null,
      chosenCohort: null,
    };
    this.handleCohortDropDown = this.handleCohortDropDown.bind(this);
    this.fetchAllPerformanceData = this.fetchAllPerformanceData.bind(this);
    this.fetchCohortPerformanceData = this.fetchCohortPerformanceData.bind(this);
  }

  componentDidMount() {
    this.fetchAllPerformanceData();
    this.fetchCohortPerformanceData();
  }

  fetchAllPerformanceData() {
    const { profile } = this.props;
    axios.get(`/api/performances/performanceForEveryStudentForAllCohorts/${profile.id}`)
      .then(({ data }) => {
        console.log('this is the data in CDM of performances', data);
        this.setState({ allPerformanceData: data });
      })
      .catch(error => console.log('Error in CDM of Performance.jsx: for allData', error));
  }
  
  fetchCohortPerformanceData() {
    const { profile } = this.props;
    axios.get(`/api/performances/performanceForCohorts/${profile.id}`)
      .then(({ data }) => {
        this.setState({ allCohortData: data });
      })
      .catch(error => console.log('Error in CDM of Performance.jsx for CohortData ', error));
  }

  handleCohortDropDown(event) {
    event.preventDefault();
    this.setState({ chosenCohortId: event.target.value });
    // this.setState({ chosenCohortId: event.target.value }, () => {
    //   console.log('this is the typeof cohortidchosen ', typeof this.state.chosenCohortId);
      // for(let i = 0 ; i < this.state.allPerformanceData.length; i++) {
      // console.log('this is the typeof cohortidchosen ', typeof this.state.chosenCohortId);
      //   if (this.state.allPerformanceData[i].id === parseInt(this.state.chosenCohortId, 10)) {
      //     this.setState({ chosenCohort: this.state.allPerformanceData[i] }, () => {
      //       console.log('this is the chosenCohort ', this.state.chosenCohort);
      //     });
      //   }
      
      // }
      // _.each(this.state.allPerfromanceData, (data) => {
      //   console.log('this is the typeof data.id ', typeof data.id);
      //   if (data.id === parseInt(this.state.chosenCohortId, 10)) {
      //     this.setState({ chosenCohort: data }, () => {
      //       console.log('this is the chosenCohort ', this.state.chosenCohort);
      //     });
      //   }
      // });
    // });
  }

  render() {
    const { profile } = this.props;
    console.log('this is the state of overallperformance ', this.state)
    return (
      <div>
        <select onChange={this.handleCohortDropDown}>
          {this.state.allPerformanceData.map(data =>
            (<option value={data.id.toString()}>{data.subject}</option>),
          )}
        </select>
        <CohortPerformance cohortData={this.state.allPerformanceData.filter(data => data.id === parseInt(this.state.chosenCohortId, 10))} />
        {/*<CohortPerformance cohortData={this.state.chosenCohort} />*/}
        <TeacherNetwork allData={this.state.allPerformanceData} profile={profile} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(OverallPerformance);
