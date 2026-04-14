import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './VisualSection.css';

gsap.registerPlugin(ScrollTrigger);

const VisualSection = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Very subtle parallax for the image
      gsap.fromTo(imageRef.current,
        {
          yPercent: -15
        },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // Fade up text reveal
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="visual-section" ref={containerRef}>
      <div className="visual-background">
        <img ref={imageRef} src="/images/cinematic.png" alt="McLaren Full Wide" loading="lazy" style={{ willChange: 'transform' }} />
      </div>
      <div className="visual-overlay"></div>
      <div className="visual-content" ref={textRef} style={{ willChange: 'transform, opacity' }}>
        <h2>Built for the Track.<br/>Designed for the Future.</h2>
      </div>
    </section>
  );
};

export default VisualSection;
