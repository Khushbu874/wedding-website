import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import logo from '../assets/S&S.png';

const FinalSection = () => {
  const { t } = useLanguage();

  return (
    <section style={{
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
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(50)].map((_, i) => (
          <div key={`star-${i}`} style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 3}px`,
            height: `${Math.random() * 3}px`,
            backgroundColor: 'var(--c-gold)',
            borderRadius: '50%',
            opacity: Math.random(),
            animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`
          }} />
        ))}
      </div>

      {/* Floating lanterns */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`lantern-${i}`}
            initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
            animate={{ y: '-10vh', opacity: [0, 1, 1, 0] }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 10
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
