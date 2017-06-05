import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Main.css';


const NavBar = () => (
  <nav className="front-nav">
    <div className="front-nav-but">
      <button><Link to="/admin">Admin Sign Up</Link></button>
      <button><Link to="/adminLogin">Admin Login</Link></button>
      <button><Link to="/signup">Teacher Sign Up</Link></button>
    </div>
  </nav>
  );


export default NavBar;
