import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const images = [
  `${import.meta.env.BASE_URL}royal_indian_couple_first_meet_1779894730819.png`,
  `${import.meta.env.BASE_URL}royal_indian_engagement_1779894748927.png`,
  `${import.meta.env.BASE_URL}royal_indian_wedding_venue_1779894764907.png`
];

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [isHovered, setIsHovered] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { t } = useLanguage();

  const nextImage = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, []);

  const prevImage = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, []);

  // Handle keyboard navigation for the fullscreen slider
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

  // Auto-slide timer (pause on hover or fullscreen)
  useEffect(() => {
    if (isHovered || isFullScreen) return;
    
    const timer = setInterval(() => {
      nextImage();
    }, 3500);

    return () => clearInterval(timer);
  }, [nextImage, isHovered, isFullScreen]);

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
      
      {/* Decorative background mandala / shape */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', opacity: 0.05, backgroundImage: 'radial-gradient(var(--c-gold) 1px, transparent 1px)', backgroundSize: '20px 20px', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', opacity: 0.05, backgroundImage: 'radial-gradient(var(--c-gold) 1px, transparent 1px)', backgroundSize: '20px 20px', borderRadius: '50%' }} />

      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-center"
          style={{ fontSize: '60px', color: 'var(--c-gold)', marginBottom: '40px' }}
        >
          {t('memories')}
        </motion.h2>

        <div 
          style={{ 
            position: 'relative', 
            width: '100%', 
            maxWidth: '900px', 
            margin: '0 auto',
            height: '60vh',
            minHeight: '400px',
            maxHeight: '600px',
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            perspective: '1000px'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Main Slider Container */}
          <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '16px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '2px solid rgba(212,175,55,0.3)' }}>
            
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                onClick={() => setIsFullScreen(true)}
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  top: 0,
                  left: 0,
                  cursor: 'zoom-in'
                }}
              />
            </AnimatePresence>

            {/* Gradient Overlay for controls visibility */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              height: '150px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              zIndex: 2,
              pointerEvents: 'none'
            }} />

            {/* Left Button */}
            <button
              onClick={prevImage}
              className="gallery-nav-btn"
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(26,26,26,0.5)',
                backdropFilter: 'blur(5px)',
                border: '1px solid var(--c-gold)',
                borderRadius: '50%',
                color: 'var(--c-gold)',
                cursor: 'pointer',
                zIndex: 10,
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s'
              }}
            >
              <ChevronLeft size={30} />
            </button>

            {/* Right Button */}
            <button
              onClick={nextImage}
              className="gallery-nav-btn"
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(26,26,26,0.5)',
                backdropFilter: 'blur(5px)',
                border: '1px solid var(--c-gold)',
                borderRadius: '50%',
                color: 'var(--c-gold)',
                cursor: 'pointer',
                zIndex: 10,
                width: '50px',
                height: '50px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'all 0.3s'
              }}
            >
              <ChevronRight size={30} />
            </button>

            {/* Navigation Dots */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
              zIndex: 10
            }}>
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: idx === currentIndex ? 'var(--c-gold)' : 'rgba(255,255,255,0.3)',
                    border: '1px solid rgba(212,175,55,0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: idx === currentIndex ? 'scale(1.2)' : 'scale(1)'
                  }}
                />
              ))}
            </div>

          </div>
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
        .gallery-nav-btn:hover {
          background: rgba(212,175,55,0.3) !important;
          transform: translateY(-50%) scale(1.1) !important;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
