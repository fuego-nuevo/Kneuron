import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import Swal from 'sweetalert';
import axios from 'axios';
import '../../styles/Main.css';
import { allLectures } from '../../actions/Lectures';

class Cohort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      lectures: [],
      isShowingModal: false,
      time: '',
    };
    this.deleteClass = this.deleteClass.bind(this);
    this.fetchLectures = this.fetchLectures.bind(this);
    this.editClass = this.editClass.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async deleteClass() {
    try {
      const removed = await axios.delete(`/api/cohorts/${localStorage.getItem('id_token')}/${this.props.cohort.id}`);
      if (removed) {
        this.props.fetchTeacherInfo()
          .then(() => {
            this.props.history.push('/dashboard/class');
          })
          .catch((err) => {
            console.log('error with deleting class , ERR: ', err);
          });
      }
    } catch (error) {
      console.log(error);
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

  fetchLectures() {
    this.props.allLectures(this.props.cohort);
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
    console.log(this.state, 'this is state bro in cohorts');
    return (
      <div className="cohort-entry animated bounceInUp" >
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h className="text-center">Edit your quiz :)</h>
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
        <div className="ch-entry-header">{this.props.cohort.subject}</div>
        <h3>{this.props.cohort.semester}</h3>
        <h3>{this.props.cohort.time}</h3>
        <button className="lecture-button" onClick={this.fetchLectures}><Link to="/dashboard/lectures">Lectures</Link></button>
        <button onClick={this.deleteClass} className="delete-class"><img alt="delete" src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png" width="25px" height="25px" /></button>
        <button
          onClick={() => {
            this.handleClick();
          }}
          className="edit-button"
        >
          <img alt="delete" src="http://simpleicon.com/wp-content/uploads/pencil.png" width="25px" height="25px" />
        </button>
      </div>
    );
  }
}

export default connect(null, { allLectures })(Cohort);
