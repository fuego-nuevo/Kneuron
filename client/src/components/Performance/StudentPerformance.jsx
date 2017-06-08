import React, { Component } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import _ from 'lodash';

import StudentLecturePerformance from './StudentLecturePerformance';

class StudentPerformance extends Component {
  constructor() {
    super();
    this.state = {
      studentLectures: null,
      studentPerformance: [],
      showLecturePerformance: false,
      chosenLecture: null,
    };
    this.calculateLectureAverages = this.calculateLectureAverages.bind(this);
    this.handleLectureDropDown = this.handleLectureDropDown.bind(this);
  }

  componentDidMount() {
    const { studentData } = this.props;
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
    _.each(lectures, (lecture) => {
      const Average = lecture.results.reduce((sum, result) => {
        return sum + result.percentage;
      }, 0) / lecture.results.length;
      performanceArray.push({ date: lecture.date, Average, name: lecture.name });
    });
    performanceArray.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    this.setState({ studentPerformance: [...performanceArray, ...this.state.studentPerformance] });
  }

  handleLectureDropDown(event) {
    const { studentLectures } = this.state;
    this.setState({ chosenLecture: { id: parseInt(event.target.value, 10), student_id: studentLectures[0].results[0].student_id } }, () => {
      this.setState({ showLecturePerformance: true });
    });
  }

  render() {
    return (
      <div id="std-perf" className="livedata">
        { !this.state.showLecturePerformance && this.state.studentLectures ?
          <div>
            <select id="lec-opt" className="perf-option" onChange={this.handleLectureDropDown}>
              <option value="null">Lectures</option>
              {this.state.studentLectures.map(lecture =>
                (<option value={lecture.id.toString()}>{lecture.name}</option>),
              )}
            </select>
            <div className="bar-chart">
              <ResponsiveContainer>
                <LineChart
                  data={this.state.studentPerformance}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Average" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div> :
          <StudentLecturePerformance lectureData={this.state.chosenLecture} />
        }
      </div>
    );
  }
}

export default StudentPerformance;
