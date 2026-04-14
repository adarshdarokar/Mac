import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Specs.css';

gsap.registerPlugin(ScrollTrigger);

const Specs = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();
      const items = gsap.utils.toArray('.spec-item');
      const fills = gsap.utils.toArray('.spec-fill');

      mm.add("(min-width: 769px)", () => {
        gsap.set(items, { y: 30, opacity: 0 });
        ScrollTrigger.batch(items, {
          interval: 0.1,
          batchMax: 4,
          onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out', overwrite: true }),
          onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 30, stagger: 0.1, duration: 0.4, ease: 'power2.out', overwrite: true }),
          start: 'top 85%'
        });

        fills.forEach((fill) => {
          const width = fill.getAttribute('data-width');
          gsap.fromTo(fill,
            { width: '0%' },
            {
              width: width, duration: 1, ease: 'power3.out',
              scrollTrigger: { trigger: containerRef.current, start: 'top 75%', toggleActions: 'play none none reverse' }
            }
          );
        });
      });

      mm.add("(max-width: 768px)", () => {
        gsap.set(items, { y: 15, opacity: 0 });
        ScrollTrigger.batch(items, {
          interval: 0.1,
          batchMax: 2,
          onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out', overwrite: true }),
          onLeaveBack: batch => gsap.to(batch, { opacity: 0, y: 15, stagger: 0.1, duration: 0.3, ease: 'power2.out', overwrite: true }),
          start: 'top 90%'
        });

        fills.forEach((fill) => {
          const width = fill.getAttribute('data-width');
          gsap.fromTo(fill,
            { width: '0%' },
            {
              width: width, duration: 0.6, ease: 'power3.out',
              scrollTrigger: { trigger: fill.parentElement, start: 'top 90%', toggleActions: 'play none none reverse' }
            }
          );
        });
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
