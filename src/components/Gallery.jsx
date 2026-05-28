import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const images = [
  `${import.meta.env.BASE_URL}royal_indian_couple_first_meet_1779894730819.png`,
  `${import.meta.env.BASE_URL}royal_indian_engagement_1779894748927.png`,
  `${import.meta.env.BASE_URL}royal_indian_wedding_venue_1779894764907.png`,
  `${import.meta.env.BASE_URL}assets/couple_portrait.png`,
  `${import.meta.env.BASE_URL}assets/first_meeting.png`,
  `${import.meta.env.BASE_URL}assets/courtship_walk.png`,
  `${import.meta.env.BASE_URL}assets/engagement_ring.png`,
  `${import.meta.env.BASE_URL}assets/mehndi_hands.png`,
  `${import.meta.env.BASE_URL}assets/ceremony_venue.png`,
  `${import.meta.env.BASE_URL}assets/reception_venue.png`,
  `${import.meta.env.BASE_URL}assets/stage_wedding.png`,
  `${import.meta.env.BASE_URL}assets/party_venue.png`
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

  // High performance auto-rotation using requestAnimationFrame
  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (!isHoveredRef.current && !isFullScreen && !isTransitioningRef.current) {
        // Slow, luxurious rotation speed
        rotationRef.current -= 0.12;
        if (ringRef.current) {
          ringRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isFullScreen]);

  // Fullscreen Navigation
  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, []);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, []);

  // Keyboard navigation for full screen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullScreen) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') setIsFullScreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen, nextImage, prevImage]);

  // Manual Rotate controls (Next / Prev)
  const handlePrevRotate = () => {
    if (!ringRef.current || isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    ringRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';

    // Round to nearest 30deg (since 360/12 = 30deg) and rotate counter-clockwise
    const target = Math.round(rotationRef.current / 30) * 30 + 30;
    rotationRef.current = target;
    ringRef.current.style.transform = `rotateY(${target}deg)`;

    setTimeout(() => {
      if (ringRef.current) {
        ringRef.current.style.transition = 'none';
      }
      isTransitioningRef.current = false;
    }, 800);
  };

  const handleNextRotate = () => {
    if (!ringRef.current || isTransitioningRef.current) return;

    isTransitioningRef.current = true;
    ringRef.current.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';

    // Round to nearest 30deg and rotate clockwise
    const target = Math.round(rotationRef.current / 30) * 30 - 30;
    rotationRef.current = target;
    ringRef.current.style.transform = `rotateY(${target}deg)`;

    setTimeout(() => {
      if (ringRef.current) {
        ringRef.current.style.transition = 'none';
      }
      isTransitioningRef.current = false;
    }, 800);
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
    <section className="section-padding" style={{ backgroundColor: 'var(--c-soft-black)', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative background mandalas */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', opacity: 0.05, backgroundImage: 'radial-gradient(var(--c-gold) 1px, transparent 1px)', backgroundSize: '20px 20px', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', opacity: 0.05, backgroundImage: 'radial-gradient(var(--c-gold) 1px, transparent 1px)', backgroundSize: '20px 20px', borderRadius: '50%' }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-center"
          style={{ fontSize: '60px', color: 'var(--c-gold)', marginBottom: '40px' }}
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
                      setCurrentIndex(idx);
                      setIsFullScreen(true);
                    }}
                  >
                    <div className="carousel-card-inner">
                      <img src={img} alt={`Memory ${idx + 1}`} loading="lazy" />
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
              onClick={() => setIsFullScreen(false)}
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
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 950px; /* tight perspective makes 3D curvature dramatic and realistic */
          overflow: visible;
          
          /* Refined card & cylinder configurations for a perfect half-circle containing 7-8 cards */
          --card-width: 155px;
          --card-height: 250px;
          --cylinder-radius: 410px;
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
        }

        .carousel-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 16px;
          border: 2px solid rgba(212, 175, 55, 0.35);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                      border-color 0.4s ease,
                      box-shadow 0.4s ease;
        }

        .carousel-card-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.65), 0 20px 45px rgba(0, 0, 0, 0.85);
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
          background: linear-gradient(to right, var(--c-soft-black) 20%, rgba(17, 17, 17, 0.6) 50%, transparent 100%);
        }

        .right-fade {
          right: -2px;
          background: linear-gradient(to left, var(--c-soft-black) 20%, rgba(17, 17, 17, 0.6) 50%, transparent 100%);
        }

        /* Interactive Arrow controls */
        .3d-control-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          background: rgba(26, 26, 26, 0.6);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border: 1px solid rgba(212, 175, 55, 0.5);
          border-radius: 50%;
          color: var(--c-gold);
          cursor: pointer;
          width: 48px;
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
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
            --cylinder-radius: 380px;
          }
          .left-btn { left: 2%; }
          .right-btn { right: 2%; }
        }

        @media (max-width: 1024px) {
          .carousel-3d-container {
            height: 390px;
            perspective: 900px;
            --card-width: 150px;
            --card-height: 240px;
            --cylinder-radius: 360px;
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
            height: 360px;
            perspective: 800px;
            --card-width: 140px;
            --card-height: 220px;
            --cylinder-radius: 320px;
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
            height: 330px;
            perspective: 750px;
            --card-width: 125px;
            --card-height: 200px;
            --cylinder-radius: 280px;
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
