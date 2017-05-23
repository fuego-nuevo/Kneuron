import React from 'react';
import '../styles/main.css';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import forceRefresh from '../utils/forceRefresh';

const NavBar = () => (
  <nav className="front-nav">
    <div className="front-nav-but">
      <button>About Us</button>
      <button><Link onClick={forceRefresh} to="/signup">Sign Up</Link></button>
    </div>
  </nav>
  );


export default NavBar;
