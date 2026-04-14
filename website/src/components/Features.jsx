import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Features.css';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      const cards = gsap.utils.toArray('.feature-card');
      
      mm.add("(min-width: 769px)", () => {
        gsap.set(cards, { y: 50, opacity: 0 });
        ScrollTrigger.batch(cards, {
          interval: 0.1,
          batchMax: 3,
          onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true, duration: 0.6, ease: 'power2.out' }),
          onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 50, stagger: 0.1, overwrite: true, duration: 0.4, ease: 'power2.out' }),
          start: 'top 85%',
        });
      });

      mm.add("(max-width: 768px)", () => {
        gsap.set(cards, { y: 20, opacity: 0 });
        ScrollTrigger.batch(cards, {
          interval: 0.1,
          batchMax: 1,
          onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, overwrite: true, duration: 0.5, ease: 'power2.out' }),
          onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 20, stagger: 0.1, overwrite: true, duration: 0.3, ease: 'power2.out' }),
          start: 'top 90%',
        });
      });
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
