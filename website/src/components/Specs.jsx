import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Specs.css';

gsap.registerPlugin(ScrollTrigger);

const Specs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.spec-item');
      const fills = gsap.utils.toArray('.spec-fill');
      
      gsap.fromTo(items, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Animate the bars filling up
      fills.forEach((fill) => {
        const width = fill.getAttribute('data-width');
        gsap.fromTo(fill,
          { width: '0%' },
          {
            width: width,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="specs-section" id="tech" ref={containerRef}>
      <div className="specs-container">
        <h2 className="section-title">Technical Specifications</h2>
        
        <div className="specs-grid">
          <div className="spec-item" style={{ willChange: 'transform, opacity' }}>
            <h4>Top Speed</h4>
            <div className="spec-value">212 <span>mph</span></div>
            <div className="spec-bar"><div className="spec-fill" data-width="90%" style={{width: '0%'}}></div></div>
          </div>
          
          <div className="spec-item" style={{ willChange: 'transform, opacity' }}>
            <h4>Horsepower</h4>
            <div className="spec-value">710 <span>hp</span></div>
            <div className="spec-bar"><div className="spec-fill" data-width="85%" style={{width: '0%'}}></div></div>
          </div>
          
          <div className="spec-item" style={{ willChange: 'transform, opacity' }}>
            <h4>0-60 MPH</h4>
            <div className="spec-value">2.8 <span>sec</span></div>
            <div className="spec-bar"><div className="spec-fill" data-width="95%" style={{width: '0%'}}></div></div>
          </div>
          
          <div className="spec-item" style={{ willChange: 'transform, opacity' }}>
            <h4>Dry Weight</h4>
            <div className="spec-value">3,128 <span>lbs</span></div>
            <div className="spec-bar"><div className="spec-fill" data-width="80%" style={{width: '0%'}}></div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Specs;
