import React, { Component } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

class StudentPerformance extends Component {
  constructor() {
    super();
    this.state = {
      studentLectures: null,
      studentPerformance: [],
    };
    this.calculateLectureAverages = this.calculateLectureAverages.bind(this);
  }

  // componentWillReceiveProps({ studentData }) {
  componentDidMount() {
    const { studentData } = this.props;
    // this.setState({ studentPerformance: [] });
    axios.get(`/api/results/lectureResults/${studentData.cohort_id}/${studentData.student_id}`)
      .then(({ data }) => {
        this.setState({ studentLectures: data }, () => {
          this.calculateLectureAverages(this.state.studentLectures);
        });
      })
      .catch(error => console.log('Error in CWRP of StudentPerformance.jsx ', error));
  }

  calculateLectureAverages(lectures) {
    const performanceArray = [];
    // const performanceObject = {};
    // for (let i = 0; i < lectures.length; i++) {
    //   console.log('this is the lecture that we on', lectures[i])
    //   console.log('this is the performance Array before ANYTHING happens ', performanceArray);
    //   const average = lectures[i].results.reduce((sum, result) => {
    //     return sum + result.percentage;
    //   }, 0) / lectures[i].results.length;
    //   // performanceObject['average'] = lectures[i].results.reduce((sum, result) => {
    //   //   return sum + result.percentage;
    //   // }, 0) / lectures[i].results.length;
    //   // performanceObject['average'] = average;
    //   // performanceObject['date'] = lectures[i].date;
    //   // console.log('this is the performance Object ', performanceObject);
    //   performanceArray.push({ date: lectures[i].date, average });
    //   console.log('this is the performance Array after we push ', performanceArray);
    // }
    _.each(lectures, (lecture) => {
      const Average = lecture.results.reduce((sum, result) => {
        return sum + result.percentage;
      }, 0) / lecture.results.length;
      performanceArray.push({ date: lecture.date, Average });
    });
    performanceArray.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    this.setState({ studentPerformance: [...performanceArray, ...this.state.studentPerformance] });
  }

  render() {
    return (
      <div className="livedata">
        <LineChart
          width={1700}
          height={475}
          data={this.state.studentPerformance}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Average" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    );
  }
}

export default StudentPerformance;
