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
    console.log('this is dashboardnavbar line 10, ', this.props);
    return (
      <nav className="dash-nav">
        <div className="dash-nav-items">
          <button><Link to="/dashboard">HOME</Link></button>
          <button><Link to="/dashboard/test1">Test1</Link></button>
          <button><Link to="/dashboard/test2">Test2</Link></button>
          <button><Link to="/dashboard/userprofile">Test2</Link></button>
        </div>
        <button id="dash-logout"><Link onClick={() => { this.props.dispatch(logoutUser()); }} to="/">LOGOUT</Link></button>
      </nav>
    );
  }
}


export default DashNav;
