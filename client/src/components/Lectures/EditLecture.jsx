import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

class AddLecture extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
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
      name: this.state.name,
    };
    try {
      const posted = await axios.post('/api/lectures/', body);
      const added = await this.props.fetchTeacherInfo();
      swal({
        title: 'Lecture succesfully updated!',
        type: 'success',
      });
      this.props.history.push('/dashboard/lectures');
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
              <label htmlFor="subject">Subject</label>
              <input onChange={this.handleChange} value={this.state.name} type="text" name="name" />
            </div>
          </div>
          <input id="add-class-submit" type="submit" value="Edit Lecture" />
        </form>
      </div>
    );
  }
}

export default AddLecture;
