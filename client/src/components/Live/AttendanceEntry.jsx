import React, { Component } from 'react';

class AttendanceEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="att-entry">
        {this.props.name}
        {this.props.present}
      </div>
    );
  }
}

export default AttendanceEntry;
