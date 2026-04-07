import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section className="features-section" id="design">
      <div className="features-container">
        <h2 className="section-title">Design Philosophy</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-image">
              <img src="/images/aero.png" alt="Aerodynamics" />
            </div>
            <div className="feature-content">
              <h3>Active Aerodynamics</h3>
              <p>Sculpted by the wind. Every curve and line serves a purpose, generating maximum downforce while reducing drag.</p>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-image">
              <img src="/images/interior.png" alt="Interior" />
            </div>
            <div className="feature-content">
              <h3>Driver-Centric Cockpit</h3>
              <p>Minimalist interior focusing purely on performance. Premium Alcantara and carbon fiber combine for ultimate luxury.</p>
            </div>
          </div>
          
          <div className="feature-card">
            <div className="feature-image">
              <img src="/images/tech.png" alt="Technology" />
            </div>
            <div className="feature-content">
              <h3>Advanced Powertrain</h3>
              <p>State-of-the-art hybrid twin-turbo V8 technology delivering unprecedented acceleration and track-ready performance.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
