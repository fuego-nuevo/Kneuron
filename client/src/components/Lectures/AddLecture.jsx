import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import swal from 'sweetalert';

class AddLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  handleDateChange(date) {
    this.setState({ startDate: date });
  }

  async handleSubmit(e) {
    e.preventDefault();
    const body = {
      name: this.state.name,
      cohort_id: this.props.cohortId,
      date: this.state.startDate,
      lat: this.props.lat,
      lng: this.props.lng,
    };
    try {
      await axios.post('/api/lectures/', body);
      await this.props.fetchTeacherInfo();
      swal({
        title: 'Lecture successfully created!',
        type: 'success',
      });
      this.props.history.push('/dashboard/class');
    } catch (error) {
      console.log('Error with axios call line 28 AddClass ', error);
    }
  }

  render() {
    return (
      <div className="add-class-container">
        <form onSubmit={this.handleSubmit} className="add-class-form animated bounceInUp">
          <div className="add-class-input-container">
            <div className="add-class-inps">
              <label htmlFor="subject">Name</label>
              <input onChange={this.handleChange} value={this.state.name} type="text" name="name" />
            </div>
            <div>
              <label htmlFor="Lecture Date">Date</label>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleDateChange}
              />
            </div>
          </div>
          <input id="add-class-submit" type="submit" value="Add Lecture" />
        </form>
      </div>
    );
  }
}

export default AddLecture;
