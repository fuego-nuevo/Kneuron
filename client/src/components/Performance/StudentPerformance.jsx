import React, { Component } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
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
      <div className="livedata">
        { !this.state.showLecturePerformance && this.state.studentLectures ?
          <div>
            <select onChange={this.handleLectureDropDown}>
              <option value="null">Lectures</option>
              {this.state.studentLectures.map(lecture =>
                (<option value={lecture.id.toString()}>{lecture.name}</option>),
              )}
            </select>
            <LineChart
              width={1700}
              height={475}
              data={this.state.studentPerformance}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Average" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div> :
          <StudentLecturePerformance lectureData={this.state.chosenLecture} />
        }
      </div>
    );
  }
}

export default StudentPerformance;
