import React, { Component } from 'react';
import axios from 'axios';
import LecturesList from './LecturesList';


class Cohort extends Component {
  constructor(props){
    super(props);
    this.state = {
      subject: '',
      lectures: []
    };
  }


  componentDidMount(){
    this.fetchLectures();
  }

  async fetchLectures(){
    try{
      const lectures = await axios.get(`/api/lectures/${this.props.cohort.id}/${localStorage.getItem('id_token')}/${this.state.subject}`);
      console.log(`Grabbed the lectures for ${this.props.fName}: `, lectures);
      this.setState({ lectures: lectures.data });
    } catch(error) {
      console.log(`Error retrieving lectures for ${this.props.fName}`);
    }
  }

  render(){
    return(
      <div>
        <LecturesList lectures={this.state.lectures}/>
      </div>
    );
  }
}

export default Cohort;
