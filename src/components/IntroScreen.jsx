import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import floralCorner from '../assets/floral_corner.png';
import ssLogo from '../assets/S&S.png';

const IntroScreen = ({ onComplete }) => {
  const { t } = useLanguage();

  useEffect(() => {
    // Hide body scroll and scrollbar track space during intro phase
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow || '';
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        top: '-2px',
        left: '-2px',
        right: '-2px',
        bottom: '-2px',
        background: 'radial-gradient(circle at center, #800a0a 0%, #4a0000 70%, #200000 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
      {/* Royal Arch/Border Frame for IntroScreen */}
      <div style={{
        position: 'absolute',
        inset: 'clamp(15px, 4vw, 30px)',
        border: '2px solid rgba(212, 175, 55, 0.6)',
        borderRadius: '20px',
        pointerEvents: 'none',
        zIndex: 4
      }} />
      <div style={{
        position: 'absolute',
        inset: 'clamp(20px, 4.5vw, 36px)',
        border: '1px dashed rgba(212, 175, 55, 0.4)',
        borderRadius: '16px',
        pointerEvents: 'none',
        zIndex: 4
      }} />

      {/* Hanging Royal Bells and Lotuses */}
      <div style={{
        position: 'absolute',
        top: 'clamp(15px, 4vw, 30px)',
        left: '12%',
        right: '12%',
        display: 'flex',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        zIndex: 4
      }}>
        {[...Array(6)].map((_, i) => {
          const heights = ['130px', '80px', '115px', '115px', '80px', '130px'];
          return (
            <div 
              key={`bell-${i}`} 
              className="hide-on-mobile"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                height: heights[i],
                opacity: 0.75
              }}
            >
              {/* Gold hanging thread */}
              <div style={{ width: '1px', flex: 1, background: 'linear-gradient(to bottom, var(--c-gold), rgba(212, 175, 55, 0.1))' }} />
              {/* Little gold bead */}
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--c-gold)', margin: '2px 0' }} />
              {/* Gold Temple Bell SVG */}
              <svg viewBox="0 0 24 24" width="18" height="18" style={{ color: 'var(--c-gold)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }}>
                <path fill="currentColor" d="M12,2A2,2 0 0,0 10,4V5.07C6.61,5.61 4,8.5 4,12V17H2V19H22V17H20V12C20,8.5 17.39,5.61 14,5.07V4A2,2 0 0,0 12,2M12,20A2,2 0 0,1 10,22H14A2,2 0 0,1 12,20Z" />
              </svg>
            </div>
          );
        })}
      </div>

      {/* Rotating Gold Mandala Watermark in Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          width: 'min(500px, 90vw)',
          height: 'min(500px, 90vw)',
          color: 'rgba(212, 175, 55, 0.05)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1,2" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.8" />
          {[...Array(24)].map((_, idx) => (
            <g key={idx} transform={`rotate(${idx * 15} 50 50)`}>
              <path d="M 50 5 C 47 15, 47 25, 50 35 C 53 25, 53 15, 50 5" fill="none" stroke="currentColor" strokeWidth="0.6" />
              <path d="M 50 12 C 45 20, 45 28, 50 35 C 55 28, 55 20, 50 12" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.7" />
              <circle cx="50" cy="10" r="1" fill="currentColor" />
            </g>
          ))}
          <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
          {[...Array(12)].map((_, idx) => (
            <line key={idx} x1="50" y1="35" x2="50" y2="50" stroke="currentColor" strokeWidth="0.5" transform={`rotate(${idx * 30} 50 50)`} />
          ))}
        </svg>
      </motion.div>

      {/* Elegant watercolor corner flowers (transparent background) */}
      <img 
        src={floralCorner} 
        alt="" 
        style={{
          position: 'absolute',
          top: '-10px',
          left: '-10px',
          width: 'clamp(195px, 38vw, 290px)',
          zIndex: 5,
          pointerEvents: 'none'
        }}
      />
      <img 
        src={floralCorner} 
        alt="" 
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-10px',
          width: 'clamp(195px, 38vw, 290px)',
          zIndex: 5,
          pointerEvents: 'none',
          transform: 'scaleX(-1)'
        }}
      />
      <img 
        src={floralCorner} 
        alt="" 
        style={{
          position: 'absolute',
          bottom: '-10px',
          left: '-10px',
          width: 'clamp(195px, 38vw, 290px)',
          zIndex: 5,
          pointerEvents: 'none',
          transform: 'scaleY(-1)'
        }}
      />
      <img 
        src={floralCorner} 
        alt="" 
        style={{
          position: 'absolute',
          bottom: '-10px',
          right: '-10px',
          width: 'clamp(195px, 38vw, 290px)',
          zIndex: 5,
          pointerEvents: 'none',
          transform: 'scale(-1)'
        }}
      />

      {/* Floating particles background effect */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none' }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              y: Math.random() * window.innerHeight, 
              x: Math.random() * window.innerWidth 
            }}
            animate={{ 
              opacity: [0, 0.5, 0], 
              y: [null, Math.random() * -200], 
              x: [null, Math.random() * 100 - 50] 
            }}
            transition={{ 
              duration: Math.random() * 5 + 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
            style={{
              position: 'absolute',
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              borderRadius: '50%',
              backgroundColor: 'var(--c-gold)',
              boxShadow: '0 0 10px var(--c-gold)'
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ 
          textAlign: 'center', 
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 20px',
          maxWidth: '650px'
        }}
      >
        {/* Shloka Header */}
        <p className="font-heading" style={{
          color: 'var(--c-gold)',
          fontSize: 'clamp(12px, 3.5vw, 15px)',
          letterSpacing: '3px',
          marginBottom: '8px',
          fontWeight: '500',
          opacity: 0.95
        }}>
          ॥ श्री गणेशाय नमः ॥
        </p>

        {/* Sacred Ganesha Motif */}
        <svg 
          viewBox="0 0 100 100" 
          width="clamp(45px, 10vw, 60px)" 
          height="clamp(45px, 10vw, 60px)" 
          style={{ margin: '0 auto 15px', display: 'block', color: 'var(--c-gold)' }}
        >
          <path d="M 46 12 L 54 12 L 52 24 L 48 24 Z" fill="currentColor" />
          <circle cx="50" cy="9" r="1.5" fill="currentColor" />
          <path d="M 43 21 Q 50 17 57 21" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <path d="M 42 27 C 28 24, 28 42, 40 42" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 58 27 C 72 24, 72 42, 60 42" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M 42 29 C 42 22, 58 22, 58 29 C 58 37, 51 39, 51 47 C 51 54, 60 56, 60 63 C 60 67, 56 70, 49 70 C 43 70, 41 65, 45 60" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M 44 42 L 39 43" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="50" y1="27" x2="50" y2="35" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="50" cy="38" r="1" fill="currentColor" />
          <circle cx="62" cy="58" r="2.5" fill="currentColor" />
        </svg>

        {/* Elegant Flourish Line */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '5px', width: '120px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--c-gold))' }} />
          <span style={{ color: 'var(--c-gold)', fontSize: '8px' }}>✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--c-gold))' }} />
        </div>

        {/* Couple Initials Logo */}
        <img 
          src={ssLogo} 
          alt="Shivangi & Satyam Logo" 
          style={{
            width: 'clamp(180px, 45vw, 290px)',
            height: 'auto',
            objectFit: 'contain',
            margin: '5px 0 10px',
            filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.45))'
          }}
        />

        {/* Elegant Separator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: '5px 0 10px', width: '160px' }}>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--c-gold))' }} />
          <span style={{ color: 'var(--c-gold)', fontSize: '10px', letterSpacing: '1px' }}>✦ ⚜ ✦</span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--c-gold))' }} />
        </div>

        {/* Full Bride & Groom Names */}
        <h2 className="font-heading" style={{
          color: '#fffff0',
          fontSize: 'clamp(18px, 5.5vw, 32px)',
          letterSpacing: '4px',
          fontWeight: '400',
          textTransform: 'uppercase',
          marginBottom: '5px',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)'
        }}>
          {t('bride_full')} & {t('groom_full')}
        </h2>

        <p 
          className="font-secondary" 
          style={{ 
            color: 'var(--c-gold-light)', 
            letterSpacing: '4px', 
            fontSize: 'clamp(12px, 3.5vw, 16px)',
            textTransform: 'uppercase',
            marginBottom: '15px',
            fontWeight: '600'
          }}
        >
          {t('hero_tagline')}
        </p>

        {/* Wedding Date & Location */}
        <div style={{ 
          borderTop: '1px solid rgba(212, 175, 55, 0.3)', 
          borderBottom: '1px solid rgba(212, 175, 55, 0.3)', 
          padding: '10px 20px', 
          marginBottom: 'clamp(30px, 6vh, 50px)',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px'
        }}>
          <p className="font-heading" style={{ color: '#fffff0', fontSize: 'clamp(11px, 3vw, 14px)', letterSpacing: '2.5px', textTransform: 'uppercase' }}>
            {t('date_full')}
          </p>
          <p className="font-secondary" style={{ color: 'var(--c-gold-light)', fontSize: 'clamp(10px, 2.8vw, 12px)', letterSpacing: '1.5px', textTransform: 'uppercase', opacity: 0.9 }}>
            {t('palace_location')}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          style={{
            padding: '16px 45px',
            backgroundColor: 'transparent',
            border: '2px solid var(--c-gold)',
            color: 'var(--c-gold)',
            fontFamily: 'var(--font-heading)',
            fontSize: '15px',
            letterSpacing: '3px',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 25px rgba(212, 175, 55, 0.35)',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'var(--c-gold)';
            e.target.style.color = '#5a0000';
            e.target.style.boxShadow = '0 0 35px rgba(212, 175, 55, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'var(--c-gold)';
            e.target.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.35)';
          }}
        >
          {t('open_invitation')}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
