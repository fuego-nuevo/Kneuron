import React, { Component } from 'react';

class LiveLectureTopicsEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name } = this.props.topic;
    return (
      <div
        onClick={() => {
          this.props.filter(this.props.topic.id);
          this.props.setTopic(this.props.topic.id);
        }}
        className="livetop"
      >
        { name }
      </div>
    );
  }
}

export default LiveLectureTopicsEntry;
