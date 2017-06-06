import React, { Component } from 'react';
import axios from 'axios';

class StudentPerformance extends Component {
  constructor() {
    super();
    this.state = {
      studentPerformance: [],
    };
  }

  componentWillReceiveProps(newProps) {
    axios.get(`/api/results/lectureResults/${newProps.data.cohort_id}/${newProps.data.student_id}`)
      .then(({ data }) => {
        this.setState({ studentPerformance: data });
      })
      .catch(error => console.log('Error in CWRP of StudentPerformance.jsx ', error));
  }

  render() {
    return (
      <div>
        Hello
      </div>
    );
  }
}

export default StudentPerformance;
