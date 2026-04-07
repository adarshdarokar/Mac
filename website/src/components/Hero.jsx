import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const FRAME_COUNT = 40;

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Caching dom dimensions
  const dimsRef = useRef({ top: 0, height: 1 });
  // Caching last drawn frame index
  const lastDrawnFrameRef = useRef(-1);

  // Preload images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;
      
      img.onload = () => {
        loadedCount++;
        setLoadingProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount === FRAME_COUNT) {
          setLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Update dimensions only on resize / mount
  const updateDimensions = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      dimsRef.current = {
        top: window.scrollY + rect.top,
        height: rect.height - window.innerHeight
      };
    }
  };

  useEffect(() => {
    if (!loaded) return;
    
    // Initial calculation
    updateDimensions();

    let ticking = false;

    const handleScroll = () => {
      if (!canvasRef.current || dimsRef.current.height <= 0) return;
      
      const scrollTop = window.scrollY;
      const { top, height } = dimsRef.current;
      
      let progress = (scrollTop - top) / height;
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);

      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(progress * FRAME_COUNT)
      );

      // PERFECT SYNCHRONIZATION: Only redraw if the frame actually changed!
      if (frameIndex === lastDrawnFrameRef.current) return;
      lastDrawnFrameRef.current = frameIndex;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { alpha: false }); // Optimize 2d drawing
      const currentImage = images[frameIndex];
      
      if (currentImage) {
        
        const canvasAspect = canvas.width / canvas.height;
        const imgAspect = currentImage.width / currentImage.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;
        
        // Cover logic for premium full screen aesthetic
        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width;
          drawHeight = currentImage.height * (canvas.width / currentImage.width);
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = currentImage.width * (canvas.height / currentImage.height);
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }
        
        // Anti-aliasing / Sub-pixel blur fix: Round to exact integer coordinates
        drawWidth = Math.round(drawWidth);
        drawHeight = Math.round(drawHeight);
        offsetX = Math.round(offsetX);
        offsetY = Math.round(offsetY);
        
        // Fast clear
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // VERY IMPORTANT: Prevent pixelation and ensure sharp downscaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        ctx.drawImage(currentImage, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // First draw
    handleScroll();

    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    
    // Resize requires recalculating dimensions
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [loaded, images]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      // High pixel density support for 4K Retina displays
      const pxRatio = window.devicePixelRatio || 1;

      canvas.width = width * pxRatio;
      canvas.height = height * pxRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      updateDimensions();
      lastDrawnFrameRef.current = -1; // Force a complete redraw event
      window.dispatchEvent(new Event('scroll'));
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [loaded]);

  if (!loaded) {
    return (
      <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: '#FF6A00', fontFamily: 'Orbitron, sans-serif' }}>
        <h2 style={{ letterSpacing: '4px', fontWeight: 600 }}>SYSTEM BOOT</h2>
        <div style={{ width: '200px', height: '1px', background: '#1f1f1f', marginTop: '30px' }}>
          <div style={{ width: `${loadingProgress}%`, height: '100%', background: '#FF6A00', transition: 'width 0.2s cubic-bezier(0.25, 1, 0.5, 1)' }}></div>
        </div>
        <p style={{ marginTop: '20px', fontSize: '0.8rem', letterSpacing: '4px', color: '#888' }}>{loadingProgress}%</p>
      </div>
    );
  }

  return (
    <section className="hero-container" ref={containerRef}>
      <div className="hero-sticky">
        <canvas ref={canvasRef} className="hero-canvas"></canvas>
        <div className="hero-gradient-overlay"></div>
        
        <div className="hero-hud">
          {/* Phase 1: 0% - 30% */}
          <div className={`hud-phase ${scrollProgress < 0.30 ? 'visible' : 'hidden'}`}>
            <h1 className="hud-title">750S</h1>
            <p className="hud-subtitle">The Benchmark. Elevated.</p>
            <button className="hud-btn">DISCOVER</button>
          </div>

          {/* Phase 2: 30% - 60% */}
          <div className={`hud-phase ${scrollProgress >= 0.30 && scrollProgress <= 0.60 ? 'visible' : 'hidden'}`}>
            <h1 className="hud-title">AERO</h1>
            <p className="hud-subtitle">Sculpted for Velocity</p>
          </div>

          {/* Phase 3: 60% - 100% */}
          <div className={`hud-phase ${scrollProgress > 0.60 ? 'visible' : 'hidden'}`}>
            <h1 className="hud-title">POWER</h1>
            <ul className="hud-specs">
              <li><span>Engine</span> V8 Hybrid</li>
              <li><span>Max Output</span> 750 PS</li>
              <li><span>Chassis</span> Carbon Monocell</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
