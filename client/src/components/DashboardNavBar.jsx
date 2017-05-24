import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/login';
import '../styles/main.css';


class DashNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav className="dash-nav">
        <div className="dash-nav-items">
          <button><Link to="/dashboard">HOME</Link></button>
          <button><Link to="/dashboard/class">Classes</Link></button>
          <button><Link to="/dashboard/addClass">Add Class</Link></button>
        </div>
        <button id="dash-logout"><Link onClick={() => { this.props.dispatch(logoutUser()); }} to="/">LOGOUT</Link></button>
      </nav>
    );
  }
}


export default DashNav;
