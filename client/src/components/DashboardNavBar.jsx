import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/login';
import '../styles/main.css';


const DashNav = () => (
  <nav className="dash-nav">
    <div className="dash-nav-items">
      <button><Link to="/dashboard">HOME</Link></button>
      <button><Link to="/dashboard/test1">Test1</Link></button>
      <button><Link to="/dashboard/test2">Test2</Link></button>
      <button><Link to="/dashboard/userprofile">Test2</Link></button>
    </div>
    <button id="dash-logout"><Link onClick={logoutUser} to="/">LOGOUT</Link></button>
  </nav>
);

export default connect(null, { logoutUser })(DashNav);
