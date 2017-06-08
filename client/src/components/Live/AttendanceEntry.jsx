import React, { Component } from 'react';

class AttendanceEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      present: 'http://ian.umces.edu/imagelibrary/albums/userpics/12789/normal_ian-symbol-positive.png',
      absent: 'http://4vector.com/i/free-vector-x-wrong-cross-no-clip-art_103115_X_Wrong_Cross_No_clip_art_hight.png',
    };
  }
  render() {
    console.log(this.props);
    return (
      <div className="att-entry">
        {this.props.student.name}
        <img alt="attendance" src={this.props.student.present ? this.state.present : this.state.absent } />
      </div>
    );
  }
}

export default AttendanceEntry;
