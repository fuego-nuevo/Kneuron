import React, { Component } from 'react';
import axios from 'axios';

class AddClass extends Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      hour: '1',
      minute: '00',
      time: 'AM',
      semester: 'SPRING',
      year: '2017',
      schoolCode: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const body = {
      auth_token: localStorage.getItem('id_token'),
      subject: this.state.subject,
      time: `${this.state.hour}: ${this.state.minute} ${this.state.time}`,
      semester: `${this.state.semester} ${this.state.year}`,
      schoolCode: this.state.schoolCode,
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
    const hours = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const minutes = ['00', '15', '30', '45'];
    const year = new Date().getFullYear();
    return (
      <div className="add-class-container">
        <form onSubmit={this.handleSubmit} id="class-add" className="add-class-form animated bounceInUp">
          <div className="add-class-input-container">
            <div className="add-class-inps">
              <label htmlFor="subject">Subject</label>
              <input onChange={this.handleChange} value={this.state.subject} type="text" name="subject" />
            </div>
            <div className="add-class-inps">
              <label htmlFor="time">Time</label>
              <br />
              <select onChange={this.handleChange} name="hour">
                {hours.map(hour =>
                  (<option value={hour}>{hour}</option>),
                )}
              </select>
              <select onChange={this.handleChange} name="minute">
                {minutes.map(minute =>
                  (<option value={minute}>{minute}</option>),
                )}
              </select>
              <select onChange={this.handleChange} name="time">
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
            <div className="add-class-inps">
              <label htmlFor="semester">Semester</label>
              <br />
              <select onChange={this.handleChange} name="season">
                <option value="SPRING">Spring</option>
                <option value="SUMMER">Summer</option>
                <option value="FALL">Fall</option>
                <option value="WINTER">Winter</option>
              </select>
              <select onChange={this.handleChange} name="year">
                <option value={year.toString()}>{year}</option>
                <option value={(year + 1).toString()}>{year + 1}</option>
              </select>
            </div>
            <div className="add-class-inps">
              <label htmlFor="code">School Code</label>
              <input onChange={this.handleChange} type="text" name="schoolCode" />
            </div>
          </div>
          <input id="add-class-submit" type="submit" value="Add Class" />
        </form>
      </div>
    );
  }
}

export default AddClass;
