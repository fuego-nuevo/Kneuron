import React, { Component } from 'react';
import axios from 'axios';

class Topic extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
    };

    this.handleDeleteTopic = this.handleDeleteTopic.bind(this);
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
    return (
      <div>
        <p>{this.props.topic.name}</p>
        <button onClick={this.handleDeleteTopic} className="delete-class"><img alt="delete" src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png" width="25px" height="25px" /></button>
      </div>
    );
  }
}

export default Topic;
