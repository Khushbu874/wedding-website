import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const IntroScreen = ({ onComplete }) => {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--c-maroon)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        overflow: 'hidden'
      }}
    >
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
        style={{ textAlign: 'center', zIndex: 10 }}
      >
        <h1 
          className="font-script text-gradient-gold" 
          style={{ fontSize: '100px', marginBottom: '20px', lineHeight: '1.3', padding: '10px 0' }}
        >
          A & P
        </h1>
        <p 
          className="font-heading" 
          style={{ 
            color: '#fdf5e6', /* explicitly set to a light ivory so it shows on maroon */ 
            letterSpacing: '5px', 
            fontSize: '18px',
            marginBottom: '60px' 
          }}
        >
          {t('hero_tagline')}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          style={{
            padding: '15px 40px',
            backgroundColor: 'transparent',
            border: '1px solid var(--c-gold)',
            color: 'var(--c-gold)',
            fontFamily: 'var(--font-heading)',
            fontSize: '16px',
            letterSpacing: '2px',
            borderRadius: '30px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'var(--c-gold)';
            e.target.style.color = 'var(--c-maroon)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'var(--c-gold)';
          }}
        >
          {t('open_invitation')}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default IntroScreen;
