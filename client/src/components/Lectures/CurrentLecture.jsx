import React, { Component } from 'react';

import TopicsList from '../../components/Topics/TopicsList';

class CurrentLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lecture: [],
    };
  }

  render() {
    return (
      <div>
        <TopicsList
          topics={this.props.topics || []}
          lectureId={this.props.lectureId}
          fetchTeacherInfo={this.props.fetchTeacherInfo}
          history={this.props.history}/>
      </div>
    );
  }
}

export default CurrentLecture;
