import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

class AddClass extends Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      description: '',
      time: '',
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
      description: this.state.description,
      time: `${this.state.time}`,
      semester: `${this.state.semester} ${this.state.year}`,
      schoolCode: this.state.schoolCode,
    };
    try {
      await axios.post('/api/cohorts/', body);
      await this.props.fetchTeacherInfo();
      swal({
        title: 'Class successfully created!',
        type: 'success',
      });
      this.props.history.push('/dashboard/class');
    } catch (error) {
      console.log('Error with axios call line 28 AddClass ', error);
    }
  }

  render() {
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
              <label htmlFor="description">Class Description</label>
              <input onChange={this.handleChange} value={this.state.description} type="text" name="description" />
            </div>
            <div className="add-class-inps">
              <label htmlFor="time">Time</label>
              <input onChange={this.handleChange} type="time" placeholder="1:00PM" name="time" />
            </div>
            <div className="add-class-inps">
              <label htmlFor="semester">Semester</label>
              <br />
              <div className="styled-select slate">
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
