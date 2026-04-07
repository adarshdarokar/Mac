import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import VisualSection from './components/VisualSection';
import Specs from './components/Specs';
import Footer from './components/Footer';
import './App.css';

function App() {
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
