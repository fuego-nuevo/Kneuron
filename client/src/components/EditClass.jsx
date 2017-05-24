import React, { Component } from 'react';
import axios from 'axios';

class AddClass extends Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      time: '',
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
      time: this.state.time,
    };
    try {
      const updated = await axios.put('/api/cohorts/', body);
      console.log(updated);
      this.props.history.push('/dashboard/class');
    } catch (error) {
      console.log('error with axios call line 31 editClass');
    }
  }

  render() {
    return (
      <div className="add-class-container">
        <form id="edit-class" onSubmit={this.handleSubmit} className="add-class-form animated bounceInUp">
          <div className="add-class-input-container">
            <div className="add-class-inps">
              <label htmlFor="subject">Subject</label>
              <input onChange={this.handleChange} value={this.state.subject} type="text" name="subject" />
            </div>
            <div className="add-class-inps">
              <label htmlFor="time">Time</label>
              <input onChange={this.handleChange} value={this.state.time} type="text" name="time" />
            </div>
          </div>
          <input id="add-class-submit" type="submit" value="Update Class" />
        </form>
      </div>
    );
  }
}

export default AddClass;