import React from 'react';
import { Link } from 'react-router-dom';


class Lecture extends Component {
  constructor(props){
    super(props);

    this.state = {};

    this.deleteLecture = this.deleteLecture.bind(this);
  }

  async deleteLecture() {
    try {
      const removed = await axios.delete(`/api/lectures/${this.props.lecture.id}`);
      console.log("ERRRRMYGOD: ", removed);
        this.props.fetchTeacherInfo()
          .then(() => {
            this.props.history.push('/dashboard/class');
          })
          .catch((err) => {
            console.log('error with deleting class , ERR: ', err);
          });
    } catch (error) {
      console.log(error);
    }
  }


  render(){
    const currentLectureRoute = `/dashboard/lectures${this.props.lecture.id}`;
    console.log("THE PROPS FOR LECTURE: ", this.props)
    return (
      <div
        className="cohort-entry animated bounceInUp"
        onMouseEnter={() => this.props.handleLectureClick(this.props.lecture.id)}
      >
        <div
          id="lecture-entry"
          className="ch-entry-header">{props.lecture.name}</div>
        <button className="lecture-button">
          <Link
            to={currentLectureRoute}
            selectedLecture={props.selectedLecture || props.lecture.id}
          >
            See Topics
          </Link>
        </button>
      </div>
    );
  };
}

export default Lecture;
