import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 40;

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  
  const phase1Ref = useRef(null);
  const phase2Ref = useRef(null);
  const phase3Ref = useRef(null);

  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

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

  useEffect(() => {
    if (!loaded || images.length === 0) return;

    let ctx = gsap.context(() => {
      const drawFrame = (frameIndex) => {
        if (frameIndex === lastDrawnFrameRef.current) return;
        lastDrawnFrameRef.current = frameIndex;

        const canvas = canvasRef.current;
        if(!canvas) return;
        const context = canvas.getContext('2d', { alpha: false });
        const currentImage = images[frameIndex];
        
        if (currentImage) {
          const canvasAspect = canvas.width / canvas.height;
          const imgAspect = currentImage.width / currentImage.height;
          
          let drawWidth, drawHeight, offsetX, offsetY;
          
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
          
          drawWidth = Math.round(drawWidth);
          drawHeight = Math.round(drawHeight);
          offsetX = Math.round(offsetX);
          offsetY = Math.round(offsetY);
          
          context.fillStyle = '#0a0a0a';
          context.fillRect(0, 0, canvas.width, canvas.height);
          
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = 'high';
          
          context.drawImage(currentImage, offsetX, offsetY, drawWidth, drawHeight);
        }
      };

      const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if(!canvas) return;
        const parent = canvas.parentElement;
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        const pxRatio = Math.min(window.devicePixelRatio || 1, 2); 

        canvas.width = width * pxRatio;
        canvas.height = height * pxRatio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        lastDrawnFrameRef.current = -1;
        drawFrame(0);
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0, 
        onUpdate: (self) => {
          const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(self.progress * (FRAME_COUNT - 1))
          );
          drawFrame(frameIndex);

          const progress = self.progress;

          if (phase1Ref.current) {
            if (progress < 0.30) {
              phase1Ref.current.style.opacity = 1;
              phase1Ref.current.style.zIndex = 10;
              phase1Ref.current.style.transform = `translate3d(0, ${progress * 100}px, 0) scale(${1 - progress * 0.1})`;
            } else {
              phase1Ref.current.style.opacity = 0;
              phase1Ref.current.style.zIndex = -1;
            }
          }

          if (phase2Ref.current) {
            if (progress >= 0.30 && progress <= 0.60) {
              const p2Progress = (progress - 0.30) / 0.30;
              const opacity = p2Progress < 0.2 ? p2Progress * 5 : p2Progress > 0.8 ? (1 - p2Progress) * 5 : 1;
              phase2Ref.current.style.opacity = opacity;
              phase2Ref.current.style.zIndex = 10;
              phase2Ref.current.style.transform = `translate3d(0, ${(1 - p2Progress) * 30}px, 0)`;
            } else {
              phase2Ref.current.style.opacity = 0;
              phase2Ref.current.style.zIndex = -1;
            }
          }

          if (phase3Ref.current) {
            if (progress > 0.60) {
              const p3Progress = (progress - 0.60) / 0.40;
              const opacity = Math.min(1, p3Progress * 3);
              phase3Ref.current.style.opacity = opacity;
              phase3Ref.current.style.zIndex = 10;
              phase3Ref.current.style.transform = `translate3d(0, ${(1 - opacity) * 30}px, 0)`;
            } else {
              phase3Ref.current.style.opacity = 0;
              phase3Ref.current.style.zIndex = -1;
            }
          }
        }
      });

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    });

    return () => ctx.revert();
  }, [loaded, images]);

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
          <div className="hud-phase" ref={phase1Ref} style={{ willChange: 'transform, opacity', position: 'absolute' }}>
            <h1 className="hud-title">750S</h1>
            <p className="hud-subtitle">The Benchmark. Elevated.</p>
            <button className="hud-btn">DISCOVER</button>
          </div>

          <div className="hud-phase" ref={phase2Ref} style={{ opacity: 0, willChange: 'transform, opacity', position: 'absolute' }}>
            <h1 className="hud-title">AERO</h1>
            <p className="hud-subtitle">Sculpted for Velocity</p>
          </div>

          <div className="hud-phase" ref={phase3Ref} style={{ opacity: 0, willChange: 'transform, opacity', position: 'absolute' }}>
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
