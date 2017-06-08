import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

class AddTopic extends Component {
  constructor(props){
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
    console.log("THE STUFF I NEED IS: ", [this.state.name, this.props.lectureId, this.props.history]);
    const body = {
      name: this.state.name,
      lecture_id: this.props.lectureId,
    };

    try {
      const posted = await axios.post('/api/topics/', body);
      const added = await this.props.fetchTeacherInfo()
      this.props.history.push('/dashboard/class');
      swal({
        title: 'Topic succesfully added',
        type: 'success',
      });
    } catch (error) {
      console.log('error with axios call line 28 AddClass ', error);
    }
  }


  render(){
    return(
      <div className="add-class-container">
        <form onSubmit={this.handleSubmit} className="add-class-form animated bounceInUp">
          <div className="add-class-input-container">
            <div className="add-class-inps">
              <label htmlFor="subject">Name</label>
              <input onChange={this.handleChange} value={this.state.name} type="text" name="name" />
            </div>
          </div>
          <input id="add-class-submit" type="submit" value="Add Topic" />
        </form>
      </div>
    );
  }
}

export default AddTopic;
