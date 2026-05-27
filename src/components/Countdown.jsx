import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { motion } from 'framer-motion';

const Countdown = () => {
  const { t } = useLanguage();
  
  // Target date: Nov 24, 2026
  const targetDate = new Date('2026-11-24T00:00:00').getTime();
  
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

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--c-maroon)', color: '#fffff0' }}>
      <div className="container text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'nowrap',
            gap: 'clamp(5px, 2vw, 20px)'
          }}>
            {timeUnits.map((unit, index) => (
              <div key={index} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0'
              }}>
                <div 
                  className="glass-panel-dark"
                  style={{
                    width: 'clamp(65px, 22vw, 100px)',
                    height: 'clamp(65px, 22vw, 100px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 'clamp(24px, 7vw, 40px)',
                    fontFamily: 'var(--font-heading)',
                    marginBottom: '10px',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)',
                    border: '1px solid rgba(212, 175, 55, 0.3)'
                  }}
                >
                  <motion.span
                    key={unit.value}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {unit.value < 10 ? `0${unit.value}` : unit.value}
                  </motion.span>
                </div>
                <span style={{ 
                  fontFamily: 'var(--font-heading)', 
                  letterSpacing: 'clamp(1px, 0.5vw, 2px)', 
                  fontSize: 'clamp(9px, 3vw, 12px)',
                  textTransform: 'uppercase',
                  color: 'var(--c-champagne)'
                }}>
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;
