import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const Family = () => {
  const { t } = useLanguage();
  const [isFlipped, setIsFlipped] = useState(false);

  const families = {
    bride: {
      side: t('bride_family_title'),
      members: [
        { name: t('bride_gparents'), relation: t('relation_grandparents') },
        { name: t('bride_parents'), relation: t('relation_parents') },
        { name: t('bride_couple_1'), relation: t('relation_aunt_uncle') },
        { name: t('bride_couple_2'), relation: t('relation_aunt_uncle') },
        { name: t('bride_couple_3'), relation: t('relation_aunt_uncle') }
      ]
    },
    groom: {
      side: t('groom_family_title'),
      members: [
        { name: t('groom_gparents'), relation: t('relation_grandparents') },
        { name: t('groom_parents'), relation: t('relation_parents') },
        { name: t('groom_couple_1'), relation: t('relation_aunt_uncle') },
        { name: t('groom_couple_2'), relation: t('relation_aunt_uncle') },
        { name: t('groom_couple_3'), relation: t('relation_bua_fufa') },
        { name: t('groom_couple_4'), relation: t('relation_aunt_uncle') }
      ]
    }
  };

  const renderFamilyContent = (family, key) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative', zIndex: 2 }}>
        
        {/* Stuck/Fixed Header Title */}
        <div style={{ 
          flexShrink: 0, 
          paddingBottom: '15px', 
          borderBottom: '1px solid rgba(212, 175, 55, 0.18)', 
          marginBottom: '20px', 
          textAlign: 'center',
          position: 'relative',
          zIndex: 10
        }}>
          <h3 className="font-heading" style={{ fontSize: 'clamp(20px, 5vw, 28px)', color: 'var(--c-text-primary)', margin: 0 }}>
            {family.side}
          </h3>
        </div>

        {/* Scrollable Content Body Area */}
        <div style={{ 
          flex: 1, 
          overflowY: 'auto', 
          paddingRight: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px'
        }}>
          {/* Members List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {family.members.map((member, index) => (
              <div key={index} style={{ 
                padding: '12px 15px', 
                borderRadius: '14px',
                backgroundColor: 'rgba(212, 175, 55, 0.02)',
                border: '1px solid rgba(212, 175, 55, 0.08)',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.02)';
                e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.08)';
              }}
              >
                <span className="font-heading" style={{ 
                  fontSize: '11px', 
                  color: 'var(--c-gold)', 
                  letterSpacing: '1.5px', 
                  textTransform: 'uppercase', 
                  display: 'block', 
                  marginBottom: '6px',
                  fontWeight: '600'
                }}>
                  ✦ {member.relation} ✦
                </span>
                <p className="font-primary" style={{ 
                  fontSize: 'clamp(14px, 2.5vw, 17px)', 
                  color: 'var(--c-maroon)', 
                  fontWeight: '700', 
                  margin: '0', 
                  lineHeight: '1.4',
                  letterSpacing: '0.3px'
                }}>
                  {(() => {
                    const name = member.name;
                    let parts = [];
                    let connector = '';
                    if (name.includes(' & ')) {
                      parts = name.split(' & ');
                      connector = '&';
                    } else if (name.includes(' एवं ')) {
                      parts = name.split(' एवं ');
                      connector = 'एवं';
                    }

                    if (parts.length === 2) {
                      const isHindi = connector === 'एवं';
                      return (
                        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <span style={{ display: 'block', textWrap: 'balance' }}>{parts[0]}</span>
                          <span 
                            className={isHindi ? "font-secondary" : "font-script"} 
                            style={{ 
                              display: 'block', 
                              fontSize: isHindi ? 'clamp(14px, 2.5vw, 17px)' : 'clamp(22px, 3.8vw, 26px)', 
                              color: 'var(--c-gold)', 
                              margin: isHindi ? '2px 0' : '-6px 0 -4px 0',
                              fontWeight: isHindi ? '600' : '400',
                              fontStyle: isHindi ? 'italic' : 'normal',
                              opacity: 0.9,
                              textTransform: 'none'
                            }}
                          >
                            {connector}
                          </span>
                          <span style={{ display: 'block', textWrap: 'balance' }}>{parts[1]}</span>
                        </span>
                      );
                    }
                    return name;
                  })()}
                </p>
              </div>
            ))}
          </div>

          {/* Awaiting to Welcome Section */}
          <div style={{ 
            padding: '20px 15px', 
            borderRadius: '16px', 
            backgroundColor: 'rgba(212, 175, 55, 0.01)', 
            border: '1.5px dashed rgba(212, 175, 55, 0.22)',
            textAlign: 'center',
            boxShadow: 'inset 0 0 12px rgba(212, 175, 55, 0.02)',
            marginBottom: '5px'
          }}>
            <span className="font-heading" style={{ 
              fontSize: '11px', 
              color: 'var(--c-gold)', 
              letterSpacing: '2.5px', 
              textTransform: 'uppercase', 
              display: 'block', 
              marginBottom: '15px',
              fontWeight: '700'
            }}>
              ✦ {t('relation_awaiting')} ✦
            </span>
            <div className="awaiting-grid">
              {t(key === 'bride' ? 'bride_awaiting' : 'groom_awaiting').map((name, index) => {
                let parts = [];
                let connector = '';
                if (name.includes(' & ')) {
                  parts = name.split(' & ');
                  connector = '&';
                } else if (name.includes(' एवं ')) {
                  parts = name.split(' एवं ');
                  connector = 'एवं';
                }

                return (
                  <div 
                    key={index} 
                    style={{ 
                      fontSize: 'clamp(11px, 2vw, 13px)', 
                      color: 'var(--c-maroon)', 
                      fontWeight: '600',
                      fontFamily: 'var(--font-primary)',
                      lineHeight: '1.4',
                      textAlign: 'center',
                      padding: '6px 8px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(212, 175, 55, 0.03)',
                      border: '1px solid rgba(212, 175, 55, 0.06)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: '38px',
                      textWrap: 'balance'
                    }}
                  >
                    {parts.length === 2 ? (
                      <span>
                        {parts[0]} <span 
                          className={connector === 'एवं' ? "font-secondary" : "font-script"} 
                          style={{ 
                            color: 'var(--c-gold)', 
                            fontSize: connector === 'एवं' ? '11px' : '16px',
                            fontWeight: 'bold',
                            fontStyle: connector === 'एवं' ? 'italic' : 'normal',
                            display: 'inline-block',
                            margin: '0 2px'
                          }}
                        >
                          {connector}
                        </span> {parts[1]}
                      </span>
                    ) : (
                      name
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--c-bg-primary)', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-center"
          style={{ fontSize: 'clamp(36px, 8vw, 60px)', color: 'var(--c-maroon)', marginBottom: '10px' }}
        >
          {t('family')}
        </motion.h2>

        {/* Pulse Indication to Flip */}
        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            backgroundColor: 'rgba(212, 175, 55, 0.1)',
            border: '1.5px solid var(--c-gold)',
            color: 'var(--c-gold)',
            borderRadius: '30px',
            cursor: 'pointer',
            marginBottom: '35px',
            fontFamily: 'var(--font-heading)',
            fontSize: '11px',
            letterSpacing: '1.5px',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(212,175,55,0.15)',
            zIndex: 10
          }}
        >
          <span>🔄</span> {isFlipped ? "VIEW SHIVANGI'S FAMILY (BRIDE) • CLICK TO FLIP" : "VIEW SATYAM'S FAMILY (GROOM) • CLICK TO FLIP"}
        </motion.div>

        {/* Outer 3D Perspective Card Wrapper */}
        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            perspective: '1500px',
            width: '100%',
            maxWidth: '560px',
            height: 'clamp(820px, 95vh, 980px)',
            cursor: 'pointer',
            position: 'relative',
            zIndex: 5
          }}
        >
          {/* Card Inner Wrapper that Flips */}
          <div 
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'none'
            }}
          >
            {/* FRONT SIDE (Bride's Family) */}
            <div 
              className="glass-panel"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg) translateZ(0.5px)',
                WebkitTransform: 'rotateY(0deg) translateZ(0.5px)',
                padding: 'clamp(20px, 5vw, 40px)', 
                textAlign: 'center', 
                borderTop: '4px solid var(--c-maroon)',
                background: 'var(--glass-bg)',
                boxShadow: 'var(--glass-shadow)',
                borderRadius: '16px',
                overflow: 'hidden',
                WebkitFontSmoothing: 'subpixel-antialiased'
              }}
            >
              {renderFamilyContent(families.bride, 'bride')}
            </div>

            {/* BACK SIDE (Groom's Family) */}
            <div 
              className="glass-panel"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg) translateZ(0.5px)',
                WebkitTransform: 'rotateY(180deg) translateZ(0.5px)',
                padding: 'clamp(20px, 5vw, 40px)', 
                textAlign: 'center', 
                borderTop: '4px solid var(--c-gold)',
                background: 'var(--glass-bg)',
                boxShadow: 'var(--glass-shadow)',
                borderRadius: '16px',
                overflow: 'hidden',
                WebkitFontSmoothing: 'subpixel-antialiased'
              }}
            >
              {renderFamilyContent(families.groom, 'groom')}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Family;
