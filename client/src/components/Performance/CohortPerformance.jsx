import React, { Component } from 'react';
import _ from 'lodash';

import PerformanceBarChart from '../DataVisualization/PerformanceBarChart';

class CohortPerformance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cohortData: null,
      results: [],
    };
    this.getResultAverage = this.getResultAverage.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { cohortData } = newProps;
    this.setState({ cohortData: cohortData[0] }, () => {
      this.setState({ results: [] }, () => {
        this.getResultAverage(this.state.cohortData);
      });
    });
  }

  getResultAverage(cohortData) {
    const resultArray = [];
    _.each(cohortData.studentcohorts, (student) => {
      const filteredResults = student.user.results.filter(result => student.cohort_id === result.cohort_id);
      let Average = filteredResults.reduce((sum, result) => {
        return sum + result.percentage;
      }, 0);
      Average /= filteredResults.length;
      resultArray.push({
        student_id: student.user.id,
        name: `${student.user.fName} ${student.user.lName}`,
        cohort_id: student.cohort_id,
        Average,
        quizCount: filteredResults.length,
      });
    });
    this.setState({ results: [...resultArray, ...this.state.results] });
  }

  render() {
    console.log('these are the props in cohortperfromance ', this.props);
    const { fetchStudent } = this.props;
    return (
      <div className="livedata">
        <PerformanceBarChart data={this.state.results} fetchStudent={fetchStudent}/>
      </div>
    );
  }
}

export default CohortPerformance;
