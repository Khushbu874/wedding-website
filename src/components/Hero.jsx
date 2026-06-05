import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const yText = useTransform(scrollY, [0, 600], [0, 150]);

  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.05 });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Target date: July 1, 2026
  const targetDate = new Date('2026-07-01T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { label: t('days'), value: timeLeft.days },
    { label: t('hours'), value: timeLeft.hours },
    { label: t('minutes'), value: timeLeft.minutes },
    { label: t('seconds'), value: timeLeft.seconds }
  ];

  const renderPremiumDate = (text) => {
    // English digits regex
    const digitRegex = /([0-9]+)/g;
    const parts = text.split(digitRegex);
    return parts.map((part, index) => {
      if (digitRegex.test(part)) {
        return (
          <span 
            key={index} 
            style={{ 
              fontFamily: "'Outfit', sans-serif",
              fontWeight: '600',
              padding: '0 1px',
              display: 'inline-block'
            }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Generate some random floating particles once
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }));
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section 
      ref={containerRef}
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
      }}
    >
      {/* Slow-zooming background image (Ken Burns Effect) */}
      <motion.div 
        style={{
          position: 'absolute',
          inset: 0,
          scale: scale,
          overflow: 'hidden'
        }}
      >
        <div 
          className="ken-burns-bg"
          style={{
            position: 'absolute',
            inset: '-10%',
            backgroundImage: `url('${new URL('../assets/real/IMG_7675.WEBP', import.meta.url).href}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 35%', /* shifted up so face aligns with Save the date */
            willChange: 'transform'
          }}
        />
      </motion.div>
 
      {/* Cinematic dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 50%, rgba(10,10,10,1) 100%)',
        zIndex: 1
      }} />
 
      {/* Floating Gold Particles */}
      {isInView && !isMobile && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden' }}>
          {particles.map(p => (
            <motion.div
              key={p.id}
              animate={{ 
                y: ['0vh', '-100vh'],
                x: [0, Math.sin(p.id) * 50, 0],
                opacity: [0, 0.8, 0]
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                position: 'absolute',
                left: `${p.x}%`,
                bottom: '-5%',
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: 'var(--c-gold)',
                borderRadius: '50%',
                boxShadow: '0 0 10px 2px rgba(212, 175, 55, 0.6)'
              }}
            />
          ))}
        </div>
      )}
 
      <motion.div 
        style={{ zIndex: 10, textAlign: 'center', opacity, y: yText }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="font-heading text-gradient-gold"
          style={{ 
            letterSpacing: 'clamp(3px, 1.5vw, 8px)',
            fontSize: 'clamp(12px, 3.5vw, 16px)',
            textTransform: 'uppercase',
            marginBottom: 'clamp(15px, 4vh, 30px)'
          }}
        >
          {t('save_the_date')}
        </motion.p>
        
        <h1 
          className="font-script text-gradient-gold"
          style={{ 
            fontSize: 'clamp(48px, 12vw, 150px)',
            lineHeight: '1.2',
            padding: '10px 10px',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
            marginBottom: '10px'
          }}
        >
          {t('couple_names')}
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.2 }}
          className="font-heading text-gradient-gold"
          style={{
            fontSize: 'clamp(14px, 4vw, 22px)',
            letterSpacing: '5px',
            marginTop: '10px',
            marginBottom: '5px',
            fontWeight: '600',
            textShadow: '0 2px 15px rgba(0,0,0,0.6)'
          }}
        >
          #ShivyamKaSangam
        </motion.p>
        
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2.0, duration: 1.5, ease: "anticipate" }}
          style={{
            margin: '12px auto',
            width: '2px',
            height: 'clamp(20px, 5vh, 45px)',
            background: 'linear-gradient(to bottom, var(--c-gold), transparent)',
            transformOrigin: 'top'
          }}
        />
 
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="font-secondary"
          style={{ 
            fontSize: 'clamp(22px, 5.5vw, 36px)', 
            fontWeight: '600',
            color: '#fffff0',
            letterSpacing: '2px',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            padding: '0 15px',
            marginBottom: 'clamp(15px, 3vh, 25px)'
          }}
        >
          {renderPremiumDate(t('date_full'))}
        </motion.p>

        {/* Premium Gold/Glass Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 1.5 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            gap: 'clamp(8px, 2.5vw, 20px)',
            margin: '0 auto',
            padding: '0 10px'
          }}
        >
          {timeUnits.map((unit, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div 
                style={{
                  width: 'clamp(55px, 13vw, 80px)',
                  height: 'clamp(55px, 13vw, 80px)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 'clamp(18px, 5.5vw, 32px)',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: '600',
                  color: 'var(--c-gold)',
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(212, 175, 55, 0.45)',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  boxShadow: '0 4px 20px rgba(212, 175, 55, 0.15), inset 0 0 12px rgba(212, 175, 55, 0.1)'
                }}
              >
                <motion.span
                  key={unit.value}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{ display: 'inline-block' }}
                >
                  {unit.value < 10 ? `0${unit.value}` : unit.value}
                </motion.span>
              </div>
              <span style={{ 
                fontFamily: 'var(--font-heading)', 
                letterSpacing: 'clamp(1px, 0.3vw, 2px)', 
                fontSize: 'clamp(8px, 2.5vw, 11px)',
                textTransform: 'uppercase',
                color: 'rgba(255, 255, 240, 0.75)'
              }}>
                {unit.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator moved inside the main content container for perfect responsive alignment */}
        <motion.div
          onClick={handleScrollDown}
          whileHover={{ scale: 1.05 }}
          style={{
            marginTop: 'clamp(20px, 4vh, 35px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--c-gold)',
            cursor: 'pointer',
            filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.6))'
          }}
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(9px, 2.5vw, 11px)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--c-gold-light)',
              fontWeight: '500'
            }}
          >
            {t('keep_scrolling')}
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ 
              y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
              opacity: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' }
            }}
          >
            <ChevronDown size={30} style={{ color: 'var(--c-gold)' }} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
