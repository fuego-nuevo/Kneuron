import React from 'react';
import { Link } from 'react-router-dom';


const DashNav = () => (
  <nav>
    <button><Link to="/dashboard/test1">Test1</Link></button>
    <button><Link to="/dashboard/test2">Test2</Link></button>
  </nav>
);

export default DashNav;
