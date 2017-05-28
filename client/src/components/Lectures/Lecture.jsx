import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { currentLiveLecture } from '../../actions/CurrentLiveLecture';


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
      console.log('ERRRRMYGOD: ', removed);
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
    const updateLecture = await this.props.currentLiveLecture(this.props.lecture);
    this.props.history.push('/dashboard/livelecture');
  }


  render() {
    const currentLectureRoute = `/dashboard/lectures${this.props.lecture.id}`;
    console.log('THE PROPS FOR LECTURE: ', this.props);
    return (
      <div
        className="cohort-entry animated bounceInUp"
      >
        <div
          id="lecture-entry"
          className="ch-entry-header"
        >{this.props.lecture.name}</div>
        <button onClick={() => this.props.handleLectureClick(this.props.lecture.id)} className="lecture-button">
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


export default connect(null, { currentLiveLecture })(Lecture);
