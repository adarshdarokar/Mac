import React from 'react';
import './Specs.css';

const Specs = () => {
  return (
    <section className="specs-section" id="tech">
      <div className="specs-container">
        <h2 className="section-title">Technical Specifications</h2>
        
        <div className="specs-grid">
          <div className="spec-item">
            <h4>Top Speed</h4>
            <div className="spec-value">212 <span>mph</span></div>
            <div className="spec-bar"><div className="spec-fill" style={{width: '90%'}}></div></div>
          </div>
          
          <div className="spec-item">
            <h4>Horsepower</h4>
            <div className="spec-value">710 <span>hp</span></div>
            <div className="spec-bar"><div className="spec-fill" style={{width: '85%'}}></div></div>
          </div>
          
          <div className="spec-item">
            <h4>0-60 MPH</h4>
            <div className="spec-value">2.8 <span>sec</span></div>
            <div className="spec-bar"><div className="spec-fill" style={{width: '95%'}}></div></div>
          </div>
          
          <div className="spec-item">
            <h4>Dry Weight</h4>
            <div className="spec-value">3,128 <span>lbs</span></div>
            <div className="spec-bar"><div className="spec-fill" style={{width: '80%'}}></div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specs;
