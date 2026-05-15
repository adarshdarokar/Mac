import React, { useEffect, useRef, useState, memo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

const Navbar = memo(() => {
  const navRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const showNav = gsap.fromTo(
        navRef.current,
        {
          yPercent: -100,
        },
        {
          yPercent: 0,
          paused: true,
          duration: 0.3,
          ease: 'power2.out',
        }
      ).progress(1);

      let isScrolled = false;

      ScrollTrigger.create({
        start: 'top top',
        end: 'max',
        onUpdate: (self) => {
          if (self.direction === 1 && self.scroll() > 50) {
            showNav.reverse();
          } else {
            showNav.play();
          }
          
          const shouldBeScrolled = self.scroll() > 50;
          if (shouldBeScrolled !== isScrolled) {
            isScrolled = shouldBeScrolled;
            if (isScrolled) {
              navRef.current.classList.add('scrolled');
            } else {
              navRef.current.classList.remove('scrolled');
            }
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav className="navbar" ref={navRef}>
      <div className="navbar-logo">
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 24V14L10 0H20L10 24H0Z" fill="var(--color-orange)"/>
          <path d="M20 24V14L30 0H40L30 24H20Z" fill="var(--color-orange)"/>
        </svg>
        <h2>McLAREN</h2>
      </div>
      <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
        <a href="#models" onClick={() => setIsOpen(false)}>Models</a>
        <a href="#design" onClick={() => setIsOpen(false)}>Design</a>
        <a href="#tech" onClick={() => setIsOpen(false)}>Technology</a>
        <button className="inquire-btn">INQUIRE</button>
      </div>
      <button 
        className={`menu-toggle ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
});

export default Navbar;
