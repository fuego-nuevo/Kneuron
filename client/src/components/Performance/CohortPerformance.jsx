import React, { Component } from 'react';
import d3 from 'd3';
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
      let average = filteredResults.reduce((sum, result) => {
        return sum + result.percentage;
      }, 0);
      average /= filteredResults.length;
      resultArray.push({
        student_id: student.user.id,
        name: `${student.user.fName} ${student.user.lName}`,
        cohort_id: student.cohort_id,
        average,
        quizCount: filteredResults.length,
      });
    });
    this.setState({ results: [...resultArray, ...this.state.results] });
  }

  render() {
    console.log('these are the props in cohortperfromance ', this.props);
    return (
      <div className="livedata">
        <PerformanceBarChart data={this.state.results.map(result => result.average)} name={this.state.results.map(result => result.name)} />
      </div>
    );
  }
}

export default CohortPerformance;
