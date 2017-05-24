import React, { Component } from 'react';

class AddClass extends Component {
  constructor() {
    super();
    this.state = {
      subject: '',
      time: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  }

  render() {
    return (
      <div className="add-class-container">
        <form className="add-class-form animated bounceInUp">
          <input onChange={this.handleChange} value={this.state.subject} type="text" placeholder="subject" name="subject" />
          <input onChange={this.handleChange} value={this.state.time} type="text" placeholder="time" name="time" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default AddClass;
