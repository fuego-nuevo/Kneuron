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
      showCohort: false,
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
    _.each(this.state.allPerformanceData, (data) => {
      if (parseInt(event.target.value, 10) === data.id) {
        this.setState({ chosenCohort: data }, () => {
          this.setState({ showCohort: true }, () => {
            this.setState({ showStudent: false });
          });
        });
      }
    });
  }

  fetchStudent(data) {
    this.setState({ chosenStudent: Object.assign(this.state.chosenStudent, data) }, () => {
      this.setState({ showStudent: !this.state.showStudent }, () => {
        this.setState({ showCohort: false });
      });
    });
  }

  render() {
    const { profile } = this.props;
    const subject = this.state.chosenCohort || { subject: 'Class Performance' };
    return (
      <div>
        <select className="perf-option" onChange={this.handleCohortDropDown}>
          <option value="null">Classes</option>
          {this.state.allPerformanceData.map(data =>
            (<option value={data.id.toString()}>{data.subject}</option>),
          )}
        </select>
        {/*<TeacherNetwork allData={this.state.allPerformanceData} profile={profile} />*/}
        { this.state.showCohort && !this.state.showStudent ?
          <text>
            {subject.subject}
            <CohortPerformance cohortData={this.state.chosenCohort} fetchStudent={this.fetchStudent} />
          </text>
          : null }
        { this.state.showStudent && !this.state.showCohort ?
          <text>{this.state.chosenStudent.name}
            <StudentPerformance studentData={this.state.chosenStudent} />
          </text>
          : null }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps)(OverallPerformance);
