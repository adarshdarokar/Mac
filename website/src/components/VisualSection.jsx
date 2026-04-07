import React from 'react';
import './VisualSection.css';

const VisualSection = () => {
  return (
    <section className="visual-section">
      <div className="visual-background">
        <img src="/images/cinematic.png" alt="McLaren Full Wide" />
      </div>
      <div className="visual-overlay"></div>
      <div className="visual-content">
        <h2>Built for the Track.<br/>Designed for the Future.</h2>
      </div>
    </section>
  );
};

export default VisualSection;
