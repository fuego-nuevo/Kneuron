import React, { Component } from 'react';


class LiveLectureTopicsEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { name } = this.props.topic;
    console.log(this.props);
    return (
      <div className="livetop">
        { name }
      </div>
    );
  }
}

export default LiveLectureTopicsEntry;

