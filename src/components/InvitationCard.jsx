import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const InvitationCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <section className="section-padding" style={{ background: 'var(--c-bg-primary)', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        
        <div style={{ position: 'relative', width: '100%', maxWidth: '500px', height: 'clamp(480px, 80vh, 600px)', perspective: '1500px' }}>
          
          <AnimatePresence>
            {!isOpen && (
              <motion.div
                key="envelope"
                initial={{ rotateX: 0 }}
                exit={{ rotateX: 90, opacity: 0 }}
                transition={{ duration: 0.8 }}
                onClick={() => setIsOpen(true)}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'var(--c-maroon)',
                  borderRadius: '10px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                  border: '2px solid var(--c-gold)',
                  transformOrigin: 'top',
                  zIndex: 20
                }}
              >
                {/* Envelope Flap styling */}
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '50%',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                  borderBottom: '1px solid var(--c-gold)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
                }} />
                
                {/* Wax Seal */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  style={{
                    width: 'clamp(60px, 15vw, 80px)',
                    height: 'clamp(60px, 15vw, 80px)',
                    backgroundColor: 'var(--c-maroon-light)',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '40%',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.2)',
                    border: '2px solid var(--c-gold)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 21
                  }}
                >
                  <span className="font-script" style={{ color: 'var(--c-gold)', fontSize: 'clamp(24px, 6vw, 30px)' }}>AP</span>
                </motion.div>
                
                <p style={{ position: 'absolute', bottom: 'clamp(20px, 6vh, 40px)', color: 'var(--c-gold)', fontFamily: 'var(--font-heading)', letterSpacing: '2px', fontSize: 'clamp(11px, 3.5vw, 14px)' }}>
                  {t('tap_open')}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actual Card Inside */}
          <motion.div
            initial={{ y: 200, opacity: 0, scale: 0.8 }}
            animate={{ 
              y: isOpen ? 0 : 200, 
              opacity: isOpen ? 1 : 0,
              scale: isOpen ? 1 : 0.8
            }}
            transition={{ duration: 1, delay: isOpen ? 0.5 : 0 }}
            style={{
              position: 'absolute',
              inset: 'clamp(10px, 3vw, 20px)',
              backgroundColor: 'var(--c-bg-primary)',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              padding: 'clamp(20px, 6vw, 40px) 20px',
              textAlign: 'center',
              border: '2px solid var(--c-gold)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundImage: 'radial-gradient(circle at center, rgba(212,175,55,0.05) 0%, transparent 70%)'
            }}
          >
            {/* Traditional Border elements */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', width: '30px', height: '30px', borderTop: '2px solid var(--c-gold)', borderLeft: '2px solid var(--c-gold)' }} />
            <div style={{ position: 'absolute', top: '10px', right: '10px', width: '30px', height: '30px', borderTop: '2px solid var(--c-gold)', borderRight: '2px solid var(--c-gold)' }} />
            <div style={{ position: 'absolute', bottom: '10px', left: '10px', width: '30px', height: '30px', borderBottom: '2px solid var(--c-gold)', borderLeft: '2px solid var(--c-gold)' }} />
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', width: '30px', height: '30px', borderBottom: '2px solid var(--c-gold)', borderRight: '2px solid var(--c-gold)' }} />
            
            <h3 className="font-heading" style={{ color: 'var(--c-maroon)', fontSize: 'clamp(14px, 4vw, 20px)', marginBottom: '15px', letterSpacing: '2px' }}>
              {t('together_families')}
            </h3>
            
            <h2 className="font-script text-gradient-gold" style={{ fontSize: 'clamp(32px, 8vw, 50px)', marginBottom: '15px' }}>
              {t('couple_names')}
            </h2>
            
            <p className="font-secondary" style={{ color: 'var(--c-text-primary)', fontSize: 'clamp(14px, 4vw, 18px)', marginBottom: '15px', lineHeight: '1.5' }}>
              {t('joyfully_invite')}
            </p>
            
            <div style={{ width: '50px', height: '1px', backgroundColor: 'var(--c-gold)', margin: '0 auto 15px' }} />
            
            <p className="font-heading" style={{ color: 'var(--c-maroon)', fontSize: 'clamp(12px, 3.5vw, 16px)', letterSpacing: '2px', whiteSpace: 'pre-line' }}>
              {t('date_time')}
            </p>
            
            <p className="font-secondary" style={{ marginTop: '15px', color: 'var(--c-text-secondary)', fontStyle: 'italic', fontSize: 'clamp(12px, 3.5vw, 14px)' }}>
              {t('palace_location')}
            </p>

            {isOpen && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                style={{
                  marginTop: 'auto',
                  background: 'none',
                  border: 'none',
                  color: 'var(--c-gold)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '12px',
                  cursor: 'pointer',
                  letterSpacing: '1px'
                }}
              >
                {t('close_invitation')}
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InvitationCard;
