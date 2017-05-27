import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD:client/src/components/FrontPage/FrontPageNav.jsx
import '../../styles/main.css';
=======
import '../../styles/Main.css';
>>>>>>> edeb15198d4cf381160e195e8aa682633f342e76:client/src/components/FrontPage/FrontPageNav.jsx

const NavBar = () => (
  <nav className="front-nav">
    <div className="front-nav-but">
      <button>About Us</button>
      <button><Link to="/signup">Sign Up</Link></button>
    </div>
  </nav>
  );


export default NavBar;
