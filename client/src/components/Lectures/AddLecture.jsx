import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'react-input-calendar'

class AddLecture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    console.log(this.props);
    this.setState({ [name]: e.target.value });
  }


  async handleSubmit(e) {
    e.preventDefault();
    console.log("COHORT ID IS: ", this.props.cohortId)
    console.log("DATE DATA IS: ", document.getElementsByClassName("input-calendar-field")[0].defaultValue);
    const body = {
      name: this.state.name,
      cohort_id: this.props.cohortId,
      date: document.getElementsByClassName("input-calendar-field")[0].defaultValue,
    };
    try {
      const posted = await axios.post('/api/lectures/', body);
      const added = await this.props.fetchTeacherInfo()
      this.props.history.push('/dashboard/class');
    } catch (error) {
      console.log('error with axios call line 28 AddClass ', error);
    }
  }

  render() {
    const dateToText = "Date";
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
              <Calendar format='MM/DD/YYYY' date={(new Date(Date.now()).toLocaleString())} />
            </div>
          </div>
          <input id="add-class-submit" type="submit" value="Add Lecture" />
        </form>
      </div>
    );
  }
}

export default AddLecture;
