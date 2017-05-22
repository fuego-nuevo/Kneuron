import React from 'react';
import '../styles/main.css';

const NavBar = () => {
  return(
      <nav className="front-nav">
        <div className="front-nav-but">
          <button>About Us</button>
          <button>Sign Up</button>
        </div>
      </nav>
  );
}

export default NavBar;