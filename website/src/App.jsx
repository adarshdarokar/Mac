import React, { useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ScrollStory from './components/ScrollStory';
import CarShowcase from './components/CarShowcase';
import SpecsSection from './components/SpecsSection';
import PerformanceSection from './components/PerformanceSection';
import CustomizationPanel from './components/CustomizationPanel';
import Footer from './components/Footer';
import './App.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Smooth scrolling using Lenis
    const lenis = new Lenis({
      lerp: 0.05, 
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1, 
      smoothTouch: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Custom Cursor tracking
    const onMouseMove = (e) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.15,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="app">
      <div className="custom-cursor" ref={cursorRef}></div>
      <Navbar />
      <HeroSection />
      <ScrollStory />
      <CarShowcase />
      <PerformanceSection />
      <SpecsSection />
      <CustomizationPanel />
      <Footer />
    </div>
  );
}

export default App;
