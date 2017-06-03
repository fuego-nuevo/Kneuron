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

    this.state = {
      name: '',
    };

    this.deleteLecture = this.deleteLecture.bind(this);
    this.runLiveLecture = this.runLiveLecture.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editClass = this.editClass.bind(this);
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

async provideLocData(){
  const { cohort_id, name } = this.props.lecture;
  const { lat, lng } = this.props;
  const body = {
    auth_token: localStorage.getItem('id_token'),
    cohortId: cohort_id,
    lecture_name: name,
    latitude: lat,
    longitude: lng,
  }
  try{
    const updateLectureLoc = await axios.put('/api/lectures/coords', body);
    console.log("Updated Lectures Coordinates.");
  } catch(error) {
    console.log("Did Not Update Because: ", error);
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
    const { cohort_id, name } = this.props.lecture;
    e.preventDefault();
    const body = {
      auth_token: localStorage.getItem('id_token'),
      cohortId: cohort_id,
      lecture_name: name,
      newname: this.state.name,
    };
    axios.put('/api/lectures/', body)
      .then((res) => {
      console.log(res);
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
  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }
  render() {
    const currentLectureRoute = `/dashboard/lectures${this.props.lecture.id}`;
    console.log(this.props);
    console.log(this.state);
    return (
      <div
        className="cohort-entry animated bounceInUp"
      >
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1 className="text-center">Edit your quiz :)</h1>
                <form className="edit-forms" onSubmit={this.editClass}>
                  <div>
                    <label htmlFor="subject-change" >change name</label>
                    <input onChange={this.handleChange} placeholder="name .." value={this.state.name} type="text" name="name" />
                  </div>
                  <button id="edit-sub" type="submit">
                    <img alt="edit" src="http://www.freeiconspng.com/uploads/paper-plane-icon--icon-search-engine-13.png" width="25px" height="25px" />
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
        <button onClick={() => {
          this.provideLocData();
          this.runLiveLecture();
        }} className="go-live"><img alt="delete" src="https://image.flaticon.com/icons/png/128/42/42912.png" width="25px" height="25px" /></button>
        <button onClick={this.deleteLecture} className="delete-class"><img alt="delete" src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png" width="25px" height="25px" /></button>
        <button onClick={this.handleClick} className="edit-button"><img alt="delete" src="http://simpleicon.com/wp-content/uploads/pencil.png" width="25px" height="25px" /></button>
      </div>
    );
  }
}


export default connect(null, { currentLiveLecture, lectureLive })(Lecture);
