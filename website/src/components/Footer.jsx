import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h2>McLAREN</h2>
          <p>Pioneering performance and technology.</p>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <h4>Models</h4>
            <ul>
              <li><a href="#">750S</a></li>
              <li><a href="#">Artura</a></li>
              <li><a href="#">GTS</a></li>
            </ul>
          </div>
          
          <div className="link-group">
            <h4>Ownership</h4>
            <ul>
              <li><a href="#">Finance</a></li>
              <li><a href="#">Service</a></li>
              <li><a href="#">Accessories</a></li>
            </ul>
          </div>
          
          <div className="link-group">
            <h4>Contact</h4>
            <ul>
              <li><a href="#">Find a Retailer</a></li>
              <li><a href="#">Enquire</a></li>
              <li><a href="#">Careers</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} McLaren Automotive Limited. All rights reserved.</p>
        <div className="social-links">
          <a href="#">IG</a>
          <a href="#">TW</a>
          <a href="#">FB</a>
          <a href="#">YT</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
