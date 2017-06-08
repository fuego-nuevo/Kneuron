import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { currentTopic } from '../../actions/CurrentTopic';


class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      name: '',
    };

    this.deleteTopic = this.deleteTopic.bind(this);
    this.editClass = this.editClass.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async deleteTopic(e) {
    e.preventDefault();
    const topic_id = this.props.topic.id;

    try {
      const removed = await axios.delete(`/api/topics/${topic_id}`);
        this.props.fetchTeacherInfo()
          .then(() => {
            this.props.history.push('/dashboard/class');
            Swal('Topic succesfully deleted');
          })
          .catch((err) => {
            console.log('error with deleting topic , ERR: ', err);
          });
    } catch (error) {
      console.log(error);
    }
  }

  editClass(e) {
    e.preventDefault();
    const body = {
      auth_token: localStorage.getItem('id_token'),
      name: this.state.name,
    };
    axios.put(`/api/topics/${this.props.topic.id}`, { name: body.name })
      .then(() => {
        this.props.fetchTeacherInfo()
          .then(() => {
            this.props.history.push('/dashboard/class');
            swal({
              title: 'Topic succesfully updated :)',
              type: 'success',
            });
          });
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: 'There was an error on our server :(',
          type: 'error',
        });
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
    return (
      <div className="cohort-entry animated bounceInUp">
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1 className="text-center">Edit your topic :)</h1>
                <form className="edit-forms" onSubmit={this.editClass}>
                  <div>
                    <label htmlFor="subject-change" >change name</label>
                    <input onChange={this.handleChange} placeholder="subject .." value={this.state.name} type="text" name="name" />
                  </div>
                  <button id="edit-sub" type="submit">
                    <img alt="delete" src="http://www.freeiconspng.com/uploads/paper-plane-icon--icon-search-engine-13.png" width="25px" height="25px" />
                  </button>
                </form>
              </ModalDialog>
            </ModalContainer>
          }
        </div>
        <div id="topic-entry" className="ch-entry-header">{this.props.topic.name}</div>
        <button className="lecture-button"><Link onClick={() => this.props.currentTopic(this.props.topic)} to="/dashboard/quiz">Quizzes</Link>
        </button>
        <button onClick={this.deleteTopic} className="delete-class"><img alt="delete" src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png" width="25px" height="25px" /></button>
        <button onClick={this.handleClick} className="edit-button"><img alt="delete" src="http://simpleicon.com/wp-content/uploads/pencil.png" width="25px" height="25px" /></button>
      </div>
    );
  }
}


export default connect(null, { currentTopic })(Topic);
