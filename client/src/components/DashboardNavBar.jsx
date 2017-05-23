import React from 'react';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/login';


const DashNav = () => (
  <nav className="dash-nav">
    <button><Link to="/dashboard">HOME</Link></button>
    <button><Link to="/dashboard/test1">Test1</Link></button>
    <button><Link to="/dashboard/test2">Test2</Link></button>
    <button><Link to="/dashboard/userprofile">Test2</Link></button>
    <button><Link onClick={logoutUser} to="/">LOGOUT</Link></button>
  </nav>
);

export default DashNav;
