import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import _ from 'lodash';

// import TeacherNetwork from './TeacherNetwork';
import CohortPerformance from './CohortPerformance';
import StudentPerformance from './StudentPerformance';

class OverallPerformance extends Component {
  constructor() {
    super();
    this.state = {
      allPerformanceData: [],
      allCohortData: [],
      chosenCohortId: null,
      chosenCohort: null,
      chosenStudent: {},
      showStudent: false,
    };
    this.handleCohortDropDown = this.handleCohortDropDown.bind(this);
    this.fetchAllPerformanceData = this.fetchAllPerformanceData.bind(this);
    this.fetchCohortPerformanceData = this.fetchCohortPerformanceData.bind(this);
    this.fetchStudent = this.fetchStudent.bind(this);
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
      .catch(error => console.log('Error in CDM of OverallPerformance.jsx: for allData', error));
  }

  fetchCohortPerformanceData() {
    const { profile } = this.props;
    axios.get(`/api/performances/performanceForCohorts/${profile.id}`)
      .then(({ data }) => {
        this.setState({ allCohortData: data });
      })
      .catch(error => console.log('Error in CDM of OverallPerformance.jsx for CohortData ', error));
  }

  handleCohortDropDown(event) {
    event.preventDefault();
    this.setState({ chosenCohortId: event.target.value }, () => {
      _.each(this.state.allPerformanceData, (data) => {
        if (parseInt(this.state.chosenCohortId, 10) === data.id) {
          this.setState({ chosenCohort: data });
        }
      });
    });
  }

  fetchStudent(data) {
    this.setState({ chosenStudent: Object.assign(this.state.chosenStudent, data) }, () => {
      console.log('this is the state of chosenStudent ', this.state.chosenStudent);
      this.setState({ showStudent: !this.state.showStudent });
    });
  }

  render() {
    const { profile } = this.props;
    const subject = this.state.chosenCohort || { subject: 'Class Performance' };
    console.log('this is the state of overallperformance ', this.state)
    return (
      <div>
        <select onChange={this.handleCohortDropDown}>
          {this.state.allPerformanceData.map(data =>
            (<option value={data.id.toString()}>{data.subject}</option>),
          )}
        </select>
        {/*<TeacherNetwork allData={this.state.allPerformanceData} profile={profile} />*/}
        <text>{subject.subject}</text>
        <CohortPerformance cohortData={this.state.allPerformanceData.filter(data => data.id === parseInt(this.state.chosenCohortId, 10))} fetchStudent={this.fetchStudent} />
        <StudentPerformance studentData={this.state.chosenStudent} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(OverallPerformance);
