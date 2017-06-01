import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import Swal from 'sweetalert';
import { currentLiveLecture } from '../../actions/CurrentLiveLecture';
import { lectureLive } from '../../actions/IsLectureLive';


class Lecture extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.deleteLecture = this.deleteLecture.bind(this);
    this.runLiveLecture = this.runLiveLecture.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
  editClass(e) {
    e.preventDefault();
    const body = {
      auth_token: localStorage.getItem('id_token'),
      ogSubject: this.props.cohort.subject,
      subject: this.state.subject,
      time: this.state.time,
    };
    axios.put('/api/cohorts/', body)
      .then(() => {
        this.props.fetchTeacherInfo()
          .then(() => {
            this.props.history.push('/dashboard/class');
            Swal('class succesfully updated :)');
          });
      })
      .catch((err) => {
        console.log(err);
        Swal('there was an error on our server :(');
      });
  }
  handleClick() {
    this.setState({ isShowingModal: true });
  }
  handleClose() {
    this.setState({ isShowingModal: false });
  }
  render() {
    const currentLectureRoute = `/dashboard/lectures${this.props.lecture.id}`;
    return (
      <div
        className="cohort-entry animated bounceInUp"
      >
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h2 className="text-center">Edit your quiz :)</h2>
                <form className="edit-forms" onSubmit={this.editClass}>
                  <div>
                    <label htmlFor="subject-change" >change subject</label>
                    <input onChange={this.handleChange} placeholder="subject .." value={this.state.subject} type="text" name="subject" />
                  </div>
                  <div>
                    <label htmlFor="time-change" >change time</label>
                    <input onChange={this.handleChange} placeholder="time .." value={this.state.time} type="text" name="time" />
                  </div>
                  <button id="edit-sub" type="submit">
                    <img alt="delete" src="http://www.freeiconspng.com/uploads/paper-plane-icon--icon-search-engine-13.png" width="25px" height="25px" />
                  </button>
                </form>
              </ModalDialog>
            </ModalContainer>
          }
        </div>
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
        <button onClick={this.handleClick} className="edit-button"><img alt="delete" src="http://simpleicon.com/wp-content/uploads/pencil.png" width="25px" height="25px" /></button>
      </div>
    );
  }
}


export default connect(null, { currentLiveLecture, lectureLive })(Lecture);
