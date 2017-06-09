import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import swal from 'sweetalert';
import axios from 'axios';
import _ from 'lodash';

import '../../styles/Main.css';
import { allLectures } from '../../actions/Lectures';
import { convertTime } from '../../utils/timeFormatter';

class Cohort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      lectures: [],
      isShowingModal: false,
      time: '',
      numberOfStudents: null,
    };
    this.deleteClass = this.deleteClass.bind(this);
    this.fetchLectures = this.fetchLectures.bind(this);
    this.editClass = this.editClass.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { profile, cohort } = this.props;
    axios.get(`/api/studentCohorts/${profile.id}`)
      .then(({ data }) => {
        _.each(data, (datum) => {
          datum.id === cohort.id ? this.setState({ numberOfStudents: datum.studentcohorts.length }) : null;
        });
      })
      .catch(error => console.log('Error in CDM of Cohort.jsx ', error));
  }

  async deleteClass() {
    try {
      const removed = await axios.delete(`/api/cohorts/${localStorage.getItem('id_token')}/${this.props.cohort.id}`);
      if (removed) {
        this.props.fetchTeacherInfo()
          .then(() => {
            this.props.history.push('/dashboard/class');
            swal({
              title: 'Class succesfully deleted!',
              type: 'success',
            });
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
              swal({
                title: 'Class succesfully updated!',
                type: 'success',
              });
              this.props.history.push('/dashboard/class');
            });
        })
      .catch((err) => {
        console.log(err);
        swal({
          title: 'There was an error on our server!',
          type: 'error',
        });
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
    const { cohort } = this.props;
    return (
      <div className="cohort-entry animated bounceInUp" >
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1 className="text-center">Edit your Class :)</h1>
                <form className="edit-forms" onSubmit={this.editClass}>
                  <div>
                    <label htmlFor="subject-change" >change subject</label>
                    <input onChange={this.handleChange} placeholder="subject .." value={this.state.subject} type="text" name="subject" />
                  </div>
                  <div>
                    <label htmlFor="time-change" >change time</label>
                    <input onChange={this.handleChange} placeholder="time .." value={this.state.time} type="time" name="time" />
                  </div>
                  <button id="edit-sub" type="submit">
                    <img alt="delete" src="http://www.freeiconspng.com/uploads/paper-plane-icon--icon-search-engine-13.png" width="25px" height="25px" />
                  </button>
                </form>
              </ModalDialog>
            </ModalContainer>
          }
        </div>
        <div className="ch-entry-header">{cohort.subject}</div>
        <h3>{cohort.semester}</h3>
        <h3>{convertTime(cohort.time)}</h3>
        <h4>Code: {cohort.code}</h4>
        <h4>{this.state.numberOfStudents} Students</h4>
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

const mapStateToProps = state => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { allLectures })(Cohort);
