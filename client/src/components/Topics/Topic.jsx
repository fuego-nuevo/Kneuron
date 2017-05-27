import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { currentTopic } from '../../actions/CurrentTopic';
import axios from 'axios';

// props.topic.quizzes

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };

    this.deleteTopic = this.deleteTopic.bind(this);
  }

  // handleDeleteTopic(event) {
  //   event.preventDefault();
  //   this.setState({ id: event.target.value });
  //   axios.delete(`/api/topics/${this.state.id}`);
  // }

  // handleCreateTopicInput(name){
  //   this.setState({ name:  name});
  // }

  // async createTopic(e) {
  //   e.preventDefault();
  //   const body = {
  //     name: this.state.name,
  //     lecture_id: this.props.lectureId,
  //   };

  //   try{
  //     const added = await axios.post(`/api/topics`, body);
  //     this.props.fetchTeacherInfo()
  //       .then(() => {
  //         this.props.history.push('/dashboard/class');
  //       })
  //       .catch(err => {
  //         console.log('Error with adding new topic: ', err);
  //       })

  //   } catch(error) {
  //     console.log(error);
  //   }
  // }

  async deleteTopic(e) {
    e.preventDefault();
    const topic_id = this.props.topic.id;

    try {
      const removed = await axios.delete(`/api/topics/${topic_id}`);
      console.log("ERRRRMYGOD: ", removed);
        this.props.fetchTeacherInfo()
          .then(() => {
            this.props.history.push('/dashboard/class');
          })
          .catch((err) => {
            console.log('error with deleting topic , ERR: ', err);
          });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log(this.props, ' this is from topics');
    return (
      <div className="cohort-entry animated bounceInUp">
        <div id="topic-entry" className="ch-entry-header">{this.props.topic.name}</div>
        <button className="lecture-button"><Link onClick={() => this.props.currentTopic(this.props.topic)} to="/dashboard/quiz">Quizzes</Link>
        </button>
        <button onClick={this.deleteTopic} className="delete-class"><img alt="delete" src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png" width="25px" height="25px" /></button>
      </div>
    );
  }
}


export default connect(null, { currentTopic })(Topic);
