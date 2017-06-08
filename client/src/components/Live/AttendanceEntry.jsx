import React, { Component } from 'react';

class AttendanceEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        AttendanceEntry bro
        {this.props.name}
        {this.props.present}
      </div>
    );
  }
}

export default AttendanceEntry;
