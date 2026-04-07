import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-logo">
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 24V14L10 0H20L10 24H0Z" fill="#FF6A00"/>
          <path d="M20 24V14L30 0H40L30 24H20Z" fill="#FF6A00"/>
        </svg>
        <h2>McLAREN</h2>
      </div>
      <div className="navbar-menu">
        <a href="#models">Models</a>
        <a href="#design">Design</a>
        <a href="#tech">Technology</a>
        <button className="inquire-btn">INQUIRE</button>
      </div>
    </nav>
  );
};

export default Navbar;
