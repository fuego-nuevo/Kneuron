import React, { Component } from 'react';
import _ from 'lodash';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

class CohortPerformance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cohortData: null,
      results: [],
    };
    this.getResultAverage = this.getResultAverage.bind(this);
    this.setStateAndCalculateAverages = this.setStateAndCalculateAverages.bind(this);
  }

  componentDidMount() {
    const { cohortData } = this.props;
    this.setStateAndCalculateAverages(cohortData);
  }

  componentWillReceiveProps(newProps) {
    const { cohortData } = newProps;
    this.setStateAndCalculateAverages(cohortData);
  }

  setStateAndCalculateAverages(cohortData) {
    this.setState({ cohortData }, () => {
      this.setState({ results: [] }, () => {
        this.getResultAverage(this.state.cohortData);
      });
    });
  }

  getResultAverage(cohortData) {
    const resultArray = [];
    _.each(cohortData.studentcohorts, (student) => {
      const filteredResults = student.user.results.filter(result => student.cohort_id === result.cohort_id);
      let Average = filteredResults.reduce((sum, result) => sum + result.percentage, 0);
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
    const { fetchStudent } = this.props;
    return (
      <div id="std-perf" className="livedata">
        <div className="bar-chart">
          <ResponsiveContainer>
            <BarChart
              data={this.state.results}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis type="number" domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="Average" fill="#8884d8" onClick={fetchStudent} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default CohortPerformance;
