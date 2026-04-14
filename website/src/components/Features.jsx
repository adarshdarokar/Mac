import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.feature-card');
      
      gsap.fromTo(cards, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="features-section" id="design" ref={containerRef}>
      <div className="features-container">
        <h2 className="section-title">Design Philosophy</h2>
        
        <div className="features-grid">
          <div className="feature-card" style={{ willChange: 'transform, opacity' }}>
            <div className="feature-image">
              <img src="/images/aero.png" alt="Aerodynamics" loading="lazy" />
            </div>
            <div className="feature-content">
              <h3>Active Aerodynamics</h3>
              <p>Sculpted by the wind. Every curve and line serves a purpose, generating maximum downforce while reducing drag.</p>
            </div>
          </div>
          
          <div className="feature-card" style={{ willChange: 'transform, opacity' }}>
            <div className="feature-image">
              <img src="/images/interior.png" alt="Interior" loading="lazy" />
            </div>
            <div className="feature-content">
              <h3>Driver-Centric Cockpit</h3>
              <p>Minimalist interior focusing purely on performance. Premium Alcantara and carbon fiber combine for ultimate luxury.</p>
            </div>
          </div>
          
          <div className="feature-card" style={{ willChange: 'transform, opacity' }}>
            <div className="feature-image">
              <img src="/images/tech.png" alt="Technology" loading="lazy" />
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
