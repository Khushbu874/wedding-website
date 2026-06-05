import React, { useMemo, useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Phone } from 'lucide-react';
import logo from '../assets/SVS.png';

const FinalSection = () => {
  const { t } = useLanguage();
  const [isInView, setIsInView] = useState(false);
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

  const stars = useMemo(() => {
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobileDevice ? 20 : 50;
    return [...Array(count)].map((_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3,
      opacity: Math.random(),
      duration: Math.random() * 3 + 2
    }));
  }, []);

  const lanterns = useMemo(() => {
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
    const count = isMobileDevice ? 4 : 10;
    return [...Array(count)].map((_, i) => ({
      id: i,
      initialX: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 10
    }));
  }, []);

  return (
    <section ref={containerRef} style={{
      position: 'relative',
      height: '100vh',
      backgroundColor: 'var(--c-soft-black)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fffff0'
    }}>
      {/* Starry night background */}
      {isInView && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {stars.map((s) => (
            <div key={`star-${s.id}`} style={{
              position: 'absolute',
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: 'var(--c-gold)',
              borderRadius: '50%',
              opacity: s.opacity,
              animation: `twinkle ${s.duration}s infinite alternate`
            }} />
          ))}
        </div>
      )}

      {/* Floating lanterns */}
      {isInView && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          {lanterns.map((l) => (
            <motion.div
              key={`lantern-${l.id}`}
              initial={{ y: '110vh', x: `${l.initialX}vw`, opacity: 0 }}
              animate={{ y: '-10vh', opacity: [0, 1, 1, 0] }}
              transition={{
                duration: l.duration,
                repeat: Infinity,
                ease: 'linear',
                delay: l.delay
              }}
              style={{
                position: 'absolute',
                width: '20px',
                height: '30px',
                backgroundColor: '#ff8c00',
                borderRadius: '5px 5px 2px 2px',
                boxShadow: '0 0 20px #ff8c00, 0 0 40px #ff4500'
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        style={{ textAlign: 'center', zIndex: 10 }}
      >
        <h2 className="font-script" style={{
          fontSize: 'clamp(36px, 8vw, 100px)',
          color: 'var(--c-gold)',
          marginBottom: '20px',
          textShadow: '0 0 20px rgba(212,175,55,0.5)'
        }}>
          {t('see_you')}
        </h2>
        
        <p className="font-secondary" style={{
          fontSize: 'clamp(14px, 4.5vw, 20px)',
          color: '#f7e7ce',
          fontStyle: 'italic',
          maxWidth: '600px',
          margin: '0 auto clamp(20px, 5vh, 40px)',
          lineHeight: '1.6',
          padding: '0 20px'
        }}>
          {t('final_msg')}
        </p>

        <p className="font-heading text-gradient-gold" style={{
          fontSize: 'clamp(18px, 5vw, 26px)',
          letterSpacing: '3px',
          marginBottom: 'clamp(20px, 4vh, 40px)',
          fontWeight: '600'
        }}>
          #ShivyamKaSangam
        </p>

        <motion.img 
          src={logo} 
          alt="Shivangi & Satyam Logo" 
          whileHover={{ scale: 1.08 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'contain',
            margin: '0 auto',
            filter: 'drop-shadow(0 0 12px rgba(212, 175, 55, 0.5))',
            cursor: 'pointer'
          }} 
        />
      </motion.div>

      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 160px)',
        textAlign: 'center',
        zIndex: 20,
        fontSize: 'clamp(10px, 3vw, 13px)',
        fontFamily: 'var(--font-secondary)',
        color: 'rgba(255, 255, 240, 0.6)',
        letterSpacing: '0.5px',
        lineHeight: '1.4'
      }}>
        Invite Created by Podflix Media Company.{' '}
        <a 
          href="tel:9399798350" 
          style={{ 
            color: 'var(--c-gold)', 
            textDecoration: 'none',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            verticalAlign: 'middle',
            fontFamily: 'system-ui, -apple-system, sans-serif'
          }}
          onMouseOver={(e) => e.target.style.color = '#fffff0'}
          onMouseOut={(e) => e.target.style.color = 'var(--c-gold)'}
        >
          <Phone size={13} style={{ strokeWidth: 2.5 }} />
          93997-98350
        </a>
      </div>

      <style>{`
        @keyframes twinkle {
          0% { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
};

export default FinalSection;
