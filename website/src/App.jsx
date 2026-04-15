import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import VisualSection from './components/VisualSection';
import Specs from './components/Specs';
import Footer from './components/Footer';
import './App.css';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.04, // Lower lerp for much smoother scrolling
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Slightly softer wheel
      smoothTouch: true, // Enable smooth scrolling for touch
      touchMultiplier: 1.5,
      syncTouch: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Features />
      <VisualSection />
      <Specs />
      <Footer />
    </div>
  );
}

export default App;
