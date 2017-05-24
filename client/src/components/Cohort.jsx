import React, { Component } from 'react';
import axios from 'axios';
import '../styles/main.css';

class Cohort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: '',
      lectures: [],
    };
    this.deleteClass = this.deleteClass.bind(this);
  }
  async deleteClass() {
    console.log('delete class ran');
    try {
      const removed = await axios.delete(`/api/cohorts/${localStorage.getItem('id_token')}/${this.props.cohort.id}`);
      if (removed) {
        this.history.push('/dashboard/class');
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    console.log(this.props, ' props from the mfuckin line 13 cohort entry');
    return (
      <div className="cohort-entry animated bounceInUp" >
        <div className="ch-entry-header">{this.props.cohort.subject}</div>
        <h3>{this.props.cohort.time}</h3>
        <button className="lecture-button">Lectures</button>
        <button onClick={this.deleteClass} className="delete-class"><img alt="delete" src="https://cdn3.iconfinder.com/data/icons/line/36/cancel-256.png" width="25px" height="25px" /></button>
      </div>
    );
  }
}

export default Cohort;
