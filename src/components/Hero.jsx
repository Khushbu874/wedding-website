import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.1]);
  const yText = useTransform(scrollY, [0, 600], [0, 150]);

  // Generate some random floating particles
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5
  }));

  return (
    <section 
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
        animate={{ scale: [1, 1.15] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: 'absolute',
          inset: '-10%',
          backgroundImage: `url('${import.meta.env.BASE_URL}royal_indian_couple_first_meet_1779894730819.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale: scale
        }}
      />

      {/* Cinematic dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 50%, rgba(10,10,10,1) 100%)',
        zIndex: 1
      }} />

      {/* Floating Gold Particles */}
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
            letterSpacing: '8px',
            fontSize: '16px',
            textTransform: 'uppercase',
            marginBottom: '30px'
          }}
        >
          {t('save_the_date')}
        </motion.p>
        
        <h1 
          className="font-script text-gradient-gold"
          style={{ 
            fontSize: 'clamp(80px, 15vw, 150px)',
            lineHeight: '1.2',
            padding: '10px 0',
            textShadow: '0 10px 30px rgba(0,0,0,0.5)',
            marginBottom: '10px'
          }}
        >
          {t('groom')} & {t('bride')}
        </h1>
        
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 2, duration: 1.5, ease: "anticipate" }}
          style={{
            margin: '20px auto',
            width: '2px',
            height: '80px',
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
            fontSize: '28px', 
            color: '#fffff0',
            letterSpacing: '2px',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)'
          }}
        >
          {t('date_full')}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '50px',
          color: 'var(--c-gold)',
          zIndex: 10
        }}
      >
        <ChevronDown size={40} />
      </motion.div>
    </section>
  );
};

export default Hero;
