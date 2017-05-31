import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { currentLiveLecture } from '../../actions/CurrentLiveLecture';
import { lectureLive } from '../../actions/IsLectureLive';


class Lecture extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.deleteLecture = this.deleteLecture.bind(this);
    this.runLiveLecture = this.runLiveLecture.bind(this);
  }


  async deleteLecture() {
    try {
      const removed = await axios.delete(`/api/lectures/${this.props.lecture.id}`);
      this.props.fetchTeacherInfo()
          .then(() => {
            this.props.history.push('/dashboard/class');
          })
          .catch((err) => {
            console.log('error with deleting class , ERR: ', err);
          });
    } catch (error) {
      console.log(error);
    }
  }
  async runLiveLecture() {
    try {
      const updateLecture = await this.props.currentLiveLecture(this.props.lecture);
      this.props.history.push('/dashboard/livelecture');
    } catch (error) {
      console.log('Error grabbing currentLiveLecture: ', updateLecture);
    }
  }


  render() {
    const currentLectureRoute = `/dashboard/lectures${this.props.lecture.id}`;
    return (
      <div
        className="cohort-entry animated bounceInUp"
      >
        <div
          id="lecture-entry"
          className="ch-entry-header"
        >{this.props.lecture.name}</div>
        <button className="lecture-button" onClick={() => { this.props.lectureLive(); this.props.handleLectureClick(this.props.lecture.id); }}>
          <Link
            to={currentLectureRoute}
            selectedLecture={this.props.lecture.id}
          >
          See Topics
        </Link>
        </button>
        <button onClick={this.runLiveLecture} className="go-live"><img alt="delete" src="https://image.flaticon.com/icons/png/128/42/42912.png" width="25px" height="25px" /></button>
        <button onClick={this.deleteLecture} className="delete-class"><img alt="delete" src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png" width="25px" height="25px" /></button>
      </div>
    );
  }
}


export default connect(null, { currentLiveLecture, lectureLive })(Lecture);
