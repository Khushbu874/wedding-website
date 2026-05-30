import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import floralCorner from '../assets/floral_corner.png';
import ssLogo from '../assets/S&S.png';

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
                  <img 
                    src={ssLogo} 
                    alt="S&S Logo" 
                    style={{
                      width: '65%',
                      height: '65%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.35))'
                    }}
                  />
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
              padding: 'clamp(25px, 6vw, 40px) 20px clamp(15px, 4vw, 30px)',
              textAlign: 'center',
              border: '2px solid var(--c-gold)',
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              backgroundImage: 'radial-gradient(circle at center, rgba(212,175,55,0.05) 0%, transparent 70%)'
            }}
          >
            {/* Elegant inner thin arch border */}
            <div style={{
              position: 'absolute',
              inset: '8px',
              border: '2px solid rgba(212, 175, 55, 0.7)',
              borderTopLeftRadius: '250px 250px',
              borderTopRightRadius: '250px 250px',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px',
              pointerEvents: 'none',
              zIndex: 1
            }} />
            
            {/* Second inner thin arch border for layered luxury look */}
            <div style={{
              position: 'absolute',
              inset: '13px',
              border: '1.5px dashed rgba(212, 175, 55, 0.45)',
              borderTopLeftRadius: '240px 240px',
              borderTopRightRadius: '240px 240px',
              borderBottomLeftRadius: '6px',
              borderBottomRightRadius: '6px',
              pointerEvents: 'none',
              zIndex: 1
            }} />

            {/* Corner Floral Arrangements - Top-Left and Bottom-Right (Exactly matching user request & second image) */}
            <img 
              src={floralCorner} 
              alt="" 
              style={{
                position: 'absolute',
                top: '2px',
                left: '2px',
                width: 'clamp(95px, 25vw, 155px)',
                pointerEvents: 'none',
                zIndex: 3
              }}
            />
            <img 
              src={floralCorner} 
              alt="" 
              style={{
                position: 'absolute',
                bottom: '2px',
                right: '2px',
                width: 'clamp(95px, 25vw, 155px)',
                pointerEvents: 'none',
                zIndex: 3,
                transform: 'rotate(180deg)'
              }}
            />
            
            {/* Elegant Ganesha Motif */}
            <svg 
              viewBox="0 0 100 100" 
              width="clamp(40px, 9vw, 52px)" 
              height="clamp(40px, 9vw, 52px)" 
              style={{ margin: '0 auto 6px', display: 'block', color: 'var(--c-gold)', zIndex: 2 }}
            >
              {/* Crown (Mukut) */}
              <path d="M 46 12 L 54 12 L 52 24 L 48 24 Z" fill="currentColor" />
              <circle cx="50" cy="9" r="1.5" fill="currentColor" />
              <path d="M 43 21 Q 50 17 57 21" fill="none" stroke="currentColor" strokeWidth="1.2" />
              
              {/* Ears */}
              <path d="M 42 27 C 28 24, 28 42, 40 42" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M 58 27 C 72 24, 72 42, 60 42" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              
              {/* Head & Trunk */}
              <path d="M 42 29 C 42 22, 58 22, 58 29 C 58 37, 51 39, 51 47 C 51 54, 60 56, 60 63 C 60 67, 56 70, 49 70 C 43 70, 41 65, 45 60" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              
              {/* Tusk */}
              <path d="M 44 42 L 39 43" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              
              {/* Tilak */}
              <line x1="50" y1="27" x2="50" y2="35" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="50" cy="38" r="1" fill="currentColor" />
              
              {/* Modak */}
              <circle cx="62" cy="58" r="2.5" fill="currentColor" />
            </svg>

            {/* Sacred Shloka */}
            <p className="font-secondary" style={{ 
              color: 'var(--c-gold)', 
              fontSize: 'clamp(9px, 2.5vw, 11px)', 
              fontStyle: 'italic', 
              lineHeight: '1.4', 
              margin: '0 auto 12px',
              maxWidth: '85%',
              whiteSpace: 'pre-line',
              opacity: 0.9,
              letterSpacing: '0.3px',
              zIndex: 2
            }}>
              {t('invitation_shloka')}
            </p>

            <h3 className="font-heading" style={{ color: 'var(--c-maroon)', fontSize: 'clamp(12px, 3.5vw, 16px)', marginBottom: '8px', letterSpacing: '2px', zIndex: 2 }}>
              {t('together_families')}
            </h3>
            
            <h2 className="font-script text-gradient-gold" style={{ fontSize: 'clamp(28px, 7vw, 42px)', marginBottom: '8px', zIndex: 2 }}>
              {t('couple_names')}
            </h2>
            
            <p className="font-secondary" style={{ color: 'var(--c-text-primary)', fontSize: 'clamp(12px, 3.2vw, 15px)', marginBottom: '12px', lineHeight: '1.4', padding: '0 10px', zIndex: 2 }}>
              {t('joyfully_invite')}
            </p>
            
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--c-gold)', margin: '0 auto 12px', zIndex: 2 }} />
            
            <p className="font-heading" style={{ color: 'var(--c-maroon)', fontSize: 'clamp(11px, 3vw, 14px)', letterSpacing: '1.5px', whiteSpace: 'pre-line', zIndex: 2 }}>
              {t('date_time')}
            </p>
            
            <p className="font-secondary" style={{ marginTop: '10px', color: 'var(--c-text-secondary)', fontStyle: 'italic', fontSize: 'clamp(11px, 3vw, 13px)', zIndex: 2 }}>
              {t('palace_location')}
            </p>

            {/* Bottom Ornamental Flourish */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', margin: 'clamp(10px, 3vh, 20px) auto 8px', width: '55%', zIndex: 2 }}>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--c-gold))' }} />
              <span style={{ color: 'var(--c-gold)', fontSize: '9px', letterSpacing: '1.5px' }}>✦ ⚜ ✦</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--c-gold))' }} />
            </div>

            {isOpen && (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--c-gold)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '11px',
                  cursor: 'pointer',
                  letterSpacing: '1.5px',
                  transition: 'all 0.3s ease',
                  opacity: 0.85,
                  zIndex: 3
                }}
                onMouseOver={(e) => e.target.style.opacity = '1'}
                onMouseOut={(e) => e.target.style.opacity = '0.85'}
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
