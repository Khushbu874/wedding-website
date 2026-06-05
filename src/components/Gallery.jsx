import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

// Load the actual images present in src/assets/real/ (use these exact filenames)
// Keep only the images the user requested (removed cards 11,12,13,15,16)
// Use all usable images from src/assets/real (JPEG/WebP)
const images = [
  new URL('../assets/real/IMG_7189.JPG.jpeg', import.meta.url).href,
  new URL('../assets/real/IMG_7193.JPG.jpeg', import.meta.url).href,
  new URL('../assets/real/IMG_7196.JPG.jpeg', import.meta.url).href,
  new URL('../assets/real/IMG_7197.JPG.jpeg', import.meta.url).href,
  new URL('../assets/real/IMG_7285.JPG.jpeg', import.meta.url).href,
  new URL('../assets/real/IMG_7468.JPG.jpeg', import.meta.url).href,
  new URL('../assets/real/IMG_7484.JPG.jpeg', import.meta.url).href,
  new URL('../assets/real/IMG_7520.JPG.jpeg', import.meta.url).href,
  new URL('../assets/real/IMG_8082.JPG.jpeg', import.meta.url).href,
  new URL('../assets/real/IMG_8084.JPG.jpeg', import.meta.url).href,
  new URL('../assets/real/IMG_6317.jpg', import.meta.url).href,
  new URL('../assets/real/IMG_6755.jpg', import.meta.url).href,
  new URL('../assets/real/IMG_7173.jpg', import.meta.url).href,
  new URL('../assets/real/IMG_7931.jpg', import.meta.url).href,
  new URL('../assets/real/IMG_7947.jpg', import.meta.url).href,
  new URL('../assets/real/IMG_7675.WEBP', import.meta.url).href
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { t } = useLanguage();

  const ringRef = useRef(null);
  const rotationRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isTransitioningRef = useRef(false);
  // Pre-decode all images when component mounts to prevent layout/decoding glitches during 3D carousel rotation
  useEffect(() => {
    const activeImages = [];
    images.forEach((src) => {
      const img = new Image();
      activeImages.push(img); // Keep reference alive to prevent GC garbage collection during async phase
      
      img.src = src;
      if (img.decode) {
        img.decode()
          .then(() => {
            const index = activeImages.indexOf(img);
            if (index > -1) activeImages.splice(index, 1);
          })
          .catch(() => {
            const index = activeImages.indexOf(img);
            if (index > -1) activeImages.splice(index, 1);
          });
      }
    });

    return () => {
      activeImages.length = 0;
    };
  }, []);

  // High performance auto-rotation using requestAnimationFrame (paused when off-screen)
  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();
    const rotationSpeedDegPerSec = 7.2; // degrees per second (smooth speed)
    let isInView = false;
    let observer;
    let isFirstFrame = true;

    const animate = (time) => {
      if (!isInView) return;

      if (isFirstFrame) {
        lastTime = time;
        isFirstFrame = false;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const deltaMs = time - lastTime;
      lastTime = time;

      if (!isHoveredRef.current && !isFullScreen && !isTransitioningRef.current) {
        // Use time-based rotation for consistent smoothness, cap at 0.1s to prevent giant jumps
        const deltaSec = Math.min(0.1, Math.max(0, deltaMs) / 1000);
        rotationRef.current -= rotationSpeedDegPerSec * deltaSec;

        if (ringRef.current) {
          ringRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
        }
      }

      // Optimize: Hide back-facing cards to reduce GPU/compositing load of heavy images
      if (ringRef.current) {
        const cards = ringRef.current.children;
        const numCards = cards.length;
        
        if (isTransitioningRef.current) {
          // Keep all cards visible during manual transition to prevent clipping/flashing
          for (let i = 0; i < numCards; i++) {
            if (cards[i] && cards[i].style.visibility !== 'visible') {
              cards[i].style.visibility = 'visible';
            }
          }
        } else {
          const stepAngle = 360 / numCards;
          for (let i = 0; i < numCards; i++) {
            const cardAngle = i * stepAngle;
            // Calculate absolute angle of the card relative to front view
            const absAngle = (rotationRef.current + cardAngle) % 360;
            // Normalize to [-180, 180]
            const normalizedAngle = ((absAngle + 180) % 360 + 360) % 360 - 180;
            
            // Cards on front half (within -95deg and 95deg) are visible. Back half are hidden.
            const isVisible = Math.abs(normalizedAngle) <= 95;
            const newVisibility = isVisible ? 'visible' : 'hidden';
            if (cards[i] && cards[i].style.visibility !== newVisibility) {
              cards[i].style.visibility = newVisibility;
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    if (ringRef.current) {
      observer = new IntersectionObserver(([entry]) => {
        const wasInView = isInView;
        isInView = entry.isIntersecting;
        
        if (isInView && !wasInView) {
          // Start the loop only when entering viewport
          isFirstFrame = true;
          lastTime = performance.now();
          cancelAnimationFrame(animationFrameId);
          animationFrameId = requestAnimationFrame(animate);
        } else if (!isInView && wasInView) {
          // Pause and cancel the loop when leaving viewport
          cancelAnimationFrame(animationFrameId);
        }
      }, { threshold: 0.05 });
      observer.observe(ringRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isFullScreen]);

  // Fullscreen Navigation
  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => {
      return prev === images.length - 1 ? 0 : prev + 1;
    });
  }, []);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => {
      return prev === 0 ? images.length - 1 : prev - 1;
    });
  }, []);

  // Keyboard navigation for full screen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullScreen) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') {
        setIsFullScreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen, nextImage, prevImage]);

  // Manual Rotate controls (Next / Prev)
  const handlePrevRotate = () => {
    if (!ringRef.current || isTransitioningRef.current) return;

    isTransitioningRef.current = true;

    const onTransitionEnd = () => {
      if (ringRef.current) {
        ringRef.current.style.transition = 'none';
      }
      isTransitioningRef.current = false;
      ringRef.current.removeEventListener('transitionend', onTransitionEnd);
    };
    ringRef.current.addEventListener('transitionend', onTransitionEnd);

    ringRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';

    const stepAngle = 360 / images.length;
    const target = Math.round(rotationRef.current / stepAngle) * stepAngle + stepAngle;
    rotationRef.current = target;
    ringRef.current.style.transform = `rotateY(${target}deg)`;
  };

  const handleNextRotate = () => {
    if (!ringRef.current || isTransitioningRef.current) return;

    isTransitioningRef.current = true;

    const onTransitionEnd = () => {
      if (ringRef.current) {
        ringRef.current.style.transition = 'none';
      }
      isTransitioningRef.current = false;
      ringRef.current.removeEventListener('transitionend', onTransitionEnd);
    };
    ringRef.current.addEventListener('transitionend', onTransitionEnd);

    ringRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';

    const stepAngle = 360 / images.length;
    const target = Math.round(rotationRef.current / stepAngle) * stepAngle - stepAngle;
    rotationRef.current = target;
    ringRef.current.style.transform = `rotateY(${target}deg)`;
  };

  // Lightbox transition variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    })
  };

  return (
    <section className="section-padding" style={{ backgroundColor: '#eae2d5', position: 'relative', overflow: 'hidden', paddingTop: 'clamp(40px, 6vw, 60px)' }}>

      {/* Decorative background mandalas */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', opacity: 0.08, backgroundImage: 'radial-gradient(var(--c-gold) 1px, transparent 1px)', backgroundSize: '20px 20px', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', opacity: 0.08, backgroundImage: 'radial-gradient(var(--c-gold) 1px, transparent 1px)', backgroundSize: '20px 20px', borderRadius: '50%' }} />

      {/* Elegant Gold Divider */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', width: '80%', maxWidth: '400px', margin: '0 auto clamp(25px, 5vh, 45px) auto', position: 'relative', zIndex: 10 }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.6))' }} />
        <span style={{ color: 'var(--c-gold)', fontSize: '14px', letterSpacing: '2px' }}>✦ ⚜ ✦</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212, 175, 55, 0.6))' }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-center"
          style={{ fontSize: 'clamp(28px, 6vw, 40px)', color: 'var(--c-maroon)', marginBottom: '40px', letterSpacing: '4px', textTransform: 'uppercase' }}
        >
          {t('memories')}
        </motion.h2>

        {/* Refined 3D Curved Carousel Wrapper */}
        <div
          className="carousel-3d-wrapper"
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
          style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >

          {/* Edge Blenders (Fade overlays at screen boundaries to match reference mockup) */}
          <div className="carousel-edge-fade left-fade" />
          <div className="carousel-edge-fade right-fade" />

          {/* Left Arrow Button for Manual Rotation */}
          <button
            onClick={handlePrevRotate}
            className="gallery-nav-btn 3d-control-btn left-btn"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* 3D Perspective Container */}
          <div className="carousel-3d-container">
            {/* The 3D rotating cylinder */}
            <div ref={ringRef} className="carousel-3d-ring">
              {images.map((img, idx) => {
                const angle = idx * (360 / images.length);
                return (
                  <div
                    key={idx}
                    className="carousel-3d-card"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(var(--cylinder-radius))`
                    }}
                    onClick={() => {
                      console.log(`%c[Gallery User Action]%c Clicked card to open lightbox | Image index: ${idx}`, 'color: #d4af37; font-weight: bold;', 'color: #ff00ff;');
                      setCurrentIndex(idx);
                      setIsFullScreen(true);
                    }}
                  >
                    <div className="carousel-card-inner">
                      <img src={img} alt={`Memory ${idx + 1}`} decoding="async" />
                      <div className="carousel-card-overlay" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow Button for Manual Rotation */}
          <button
            onClick={handleNextRotate}
            className="gallery-nav-btn 3d-control-btn right-btn"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

        </div>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      <AnimatePresence initial={false} custom={direction}>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(10px)',
              zIndex: 1000,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px'
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => {
                console.log(`%c[Gallery User Action]%c Closed lightbox`, 'color: #d4af37; font-weight: bold;', 'color: #ff00ff;');
                setIsFullScreen(false);
              }}
              style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid var(--c-gold)',
                borderRadius: '50%',
                color: 'var(--c-gold)',
                cursor: 'pointer',
                zIndex: 1002,
                padding: '10px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s'
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(212,175,55,0.3)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'}
            >
              <X size={30} />
            </button>

            {/* Previous Button */}
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '20px',
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid var(--c-gold)',
                borderRadius: '50%',
                color: 'var(--c-gold)',
                cursor: 'pointer',
                zIndex: 1002,
                padding: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s'
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(212,175,55,0.3)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'}
            >
              <ChevronLeft size={30} />
            </button>

            {/* Slider Image Container */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '1000px', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  style={{
                    position: 'absolute',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 0 50px rgba(212,175,55,0.2)'
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '20px',
                background: 'rgba(212,175,55,0.1)',
                border: '1px solid var(--c-gold)',
                borderRadius: '50%',
                color: 'var(--c-gold)',
                cursor: 'pointer',
                zIndex: 1002,
                padding: '15px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s'
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(212,175,55,0.3)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'}
            >
              <ChevronRight size={30} />
            </button>

            {/* Image Indicator */}
            <div style={{ position: 'absolute', bottom: '30px', color: 'var(--c-gold)', fontFamily: 'var(--font-heading)', letterSpacing: '2px' }}>
              {currentIndex + 1} / {images.length}
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Refined 3D Curved Cylinder Carousel Stylesheet */
        .carousel-3d-wrapper {
          overflow-x: hidden;
          overflow-y: visible;
          padding: 50px 0;
        }

        .carousel-3d-container {
          position: relative;
          width: 100%;
          height: 560px; /* increased height to make cards taller and more prominent */
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 950px; /* tight perspective makes 3D curvature dramatic and realistic */
          overflow: visible;
          
          /* Increased gap: larger cylinder radius and slightly larger cards for better spacing */
          --card-width: 240px;
          --card-height: 380px; /* increased card height */
          --cylinder-radius: 630px; /* mathematically aligned radius for 16 cards (width 240px) to prevent overlapping */
        }

        .carousel-3d-ring {
          position: relative;
          width: var(--card-width);
          height: var(--card-height);
          transform-style: preserve-3d;
          will-change: transform;
        }

        .carousel-3d-card {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          cursor: pointer;
          will-change: transform;
        }

        .carousel-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          border: 2.5px solid rgba(212, 175, 55, 0.45);
          box-shadow: 0 15px 35px rgba(90, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.4s ease,
                      box-shadow 0.4s ease;
          will-change: transform;
          transform: translateZ(0);
        }

        .carousel-card-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        .carousel-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.4), transparent 60%);
          opacity: 0.8;
          transition: opacity 0.3s;
        }

        /* Hover Zoom within the 3D grid context */
        .carousel-3d-card:hover .carousel-card-inner {
          transform: scale(1.1) translateZ(25px); /* push slightly forward and zoom safely */
          border-color: var(--c-gold);
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.5), 0 15px 40px rgba(90, 0, 0, 0.25);
        }

        .carousel-3d-card:hover .carousel-card-overlay {
          opacity: 0.2;
        }

        /* Edge Fade Overlays (Smoothes the outer edges of the curved cylinder row) */
        .carousel-edge-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 25%;
          z-index: 4;
          pointer-events: none;
        }

        .left-fade {
          left: -2px;
          background: linear-gradient(to right, #eae2d5 20%, rgba(234, 226, 213, 0.6) 50%, transparent 100%);
        }

        .right-fade {
          right: -2px;
          background: linear-gradient(to left, #eae2d5 20%, rgba(234, 226, 213, 0.6) 50%, transparent 100%);
        }

        /* Interactive Arrow controls */
        .3d-control-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1.5px solid rgba(212, 175, 55, 0.4);
          border-radius: 50%;
          color: var(--c-maroon);
          cursor: pointer;
          width: 48px;
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 4px 15px rgba(90, 0, 0, 0.08);
          transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .3d-control-btn:hover {
          background: rgba(212, 175, 55, 0.2) !important;
          border-color: var(--c-gold);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
          scale: 1.08;
        }

        .left-btn { left: 4%; }
        .right-btn { right: 4%; }

        /* Responsive Breakpoints matching ratios for perfect curved layouts */
        @media (max-width: 1200px) {
          .carousel-3d-container {
            --cylinder-radius: 530px; /* aligned for 200px wide cards */
            --card-width: 200px;
            --card-height: 300px;
          }
          .left-btn { left: 2%; }
          .right-btn { right: 2%; }
        }

        @media (max-width: 1024px) {
          .carousel-3d-container {
            height: 440px;
            perspective: 900px;
            --card-width: 170px;
            --card-height: 260px;
            --cylinder-radius: 460px;
          }
          .carousel-edge-fade {
            width: 20%;
          }
          .3d-control-btn {
            display: none !important; /* Hide navigation arrows on tablet/mobile */
          }
        }

        @media (max-width: 768px) {
          .carousel-3d-container {
            height: 380px;
            perspective: 800px;
            --card-width: 140px;
            --card-height: 220px;
            --cylinder-radius: 380px; /* aligned for 140px wide cards */
          }
          .carousel-edge-fade {
            width: 15%;
          }
          .3d-control-btn {
            display: none !important; /* Hide navigation arrows on mobile */
          }
        }

        @media (max-width: 480px) {
          .carousel-3d-container {
            height: 300px;
            perspective: 720px;
            --card-width: 120px;
            --card-height: 190px;
            --cylinder-radius: 320px;
          }
          .carousel-edge-fade {
            width: 12%;
          }
          .3d-control-btn {
            display: none !important; /* Hide navigation arrows on small screens */
          }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
