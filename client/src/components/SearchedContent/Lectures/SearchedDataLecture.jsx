import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { currentLiveLecture } from '../../../actions/CurrentLiveLecture';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import swal from 'sweetalert';

class SearchDataLecture extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
    };

    this.deleteLecture = this.deleteLecture.bind(this);
    this.runLiveLecture = this.runLiveLecture.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.editLecture = this.editLecture.bind(this);
  }

  async deleteLecture() {
    try {
      const removed = await axios.delete(`/api/lectures/${this.props.lecture.id}`);
      console.log("ERRRRMYGOD: ", removed);
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


  editLecture(e) {
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
            swal({
              title: 'Lecture succesfully updated!',
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

  async runLiveLecture() {
    console.log("Pre>>>>>>: ", this.props.currentLiveLecture(this.props.lecture));
    const updateLecture = await this.props.currentLiveLecture(this.props.lecture);
    console.log("DAMN>>>>>: ", updateLecture);
    this.props.history.push('/dashboard/livelecture');
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


  render(){
    const currentLectureRoute = `/dashboard/lectures${this.props.lecture.id}`;
    console.log("THE PROPS FOR LECTURE: ", this.props)
    return (
      <div
        className="cohort-entry animated bounceInUp"
      >
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1 className="text-center">Edit your Lecture :)</h1>
                <form className="edit-forms" onSubmit={this.editLecture}>
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
          className="ch-entry-header">{this.props.lecture.name}
        </div>
        <button className="lecture-button" onClick={() => this.props.handleLectureClick(this.props.lecture.id)}>
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
};



export default connect(null, { currentLiveLecture })(SearchDataLecture);
