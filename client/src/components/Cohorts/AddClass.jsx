import React, { Component } from 'react';
import axios from 'axios';
import { getSeason, getTime } from '../../utils/timeFormatter';

class AddClass extends Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      time: getTime() || '',
      season: getSeason() || '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSeasonChange = this.handleSeasonChange.bind(this);
  }


  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  handleTimeChange(e){
    this.setState({ time: e.target.value });
  }

  handleSeasonChange(e){
    this.setState({ season: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const body = {
      auth_token: localStorage.getItem('id_token'),
      subject: this.state.subject,
      time: this.state.time,
      semester: this.state.season,
    };
    try {
      const posted = await axios.post('/api/cohorts/', body);
      const added = await this.props.fetchTeacherInfo();
      this.props.history.push('/dashboard/class');
    } catch (error) {
      console.log('error with axios call line 28 AddClass ', error);
    }
  }

  render() {
    return (
      <div className="add-class-container">
        <form onSubmit={this.handleSubmit} className="add-class-form animated bounceInUp">
          <div className="add-class-input-container">
            <div className="add-class-inps">
              <label htmlFor="subject">Subject</label>
              <input onChange={this.handleChange} value={this.state.subject} type="text" name="subject" />
            </div>
            <div className="add-class-inps">
              <label htmlFor="time">Time</label>
              <input onChange={this.handleTimeChange} value={getTime()} type="text" name="time" />
            </div>
            <div className="add-class-inps">
              <label htmlFor="time">Semester</label>
              <input onChange={this.handleSeasonChange} value={getSeason()} type="text" name="semester" />
            </div>
          </div>
          <input id="add-class-submit" type="submit" value="Add Class" />
        </form>
      </div>
    );
  }
}

export default AddClass;
