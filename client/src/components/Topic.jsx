import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { currentTopic } from '../actions/CurrentTopic';
import axios from 'axios';

// props.topic.quizzes

class Topic extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleDeleteTopic = this.handleDeleteTopic.bind(this);
    this.handleCreateTopic = this.handleCreateTopic.bind(this);
  }
  
  handleDeleteTopic(event) {
    event.preventDefault();
    this.setState({ id: event.target.value });
    axios.delete(`/api/topics/${this.state.id}`);
  }

  handleCreateTopic(event) {
    event.preventDefault();
    axios.post(`/api/topics/${lecture_id}`);
    // this.setState({ topics: [...topics, topic] })
  }

  render() {
    console.log(this.props, ' this is from topics');
    return (
      <div className="cohort-entry animated bounceInUp">
        <div id="topic-entry" className="ch-entry-header">{this.props.topic.name}</div>
        <button className="lecture-button"><Link onClick={() => this.props.currentTopic(this.props.topic)} to="/dashboard/quiz">Quizzes</Link>
        </button>
      </div>
    );
  }
}


export default connect(null, { currentTopic })(Topic);
