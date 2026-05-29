import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const Family = () => {
  const { t } = useLanguage();

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

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--c-bg-primary)' }}>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-center"
          style={{ fontSize: 'clamp(36px, 8vw, 60px)', color: 'var(--c-maroon)', marginBottom: 'clamp(30px, 6vw, 60px)' }}
        >
          {t('family')}
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '40px' }}>
          
          {Object.entries(families).map(([key, family], idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel"
              style={{ padding: 'clamp(20px, 5vw, 40px)', textAlign: 'center', borderTop: `4px solid ${idx === 0 ? 'var(--c-maroon)' : 'var(--c-gold)'}` }}
            >
              <h3 className="font-heading" style={{ fontSize: 'clamp(20px, 5vw, 28px)', color: 'var(--c-text-primary)', marginBottom: 'clamp(15px, 4vw, 30px)' }}>
                {family.side}
              </h3>
              
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
                marginTop: '30px', 
                padding: '20px 15px', 
                borderRadius: '16px', 
                backgroundColor: 'rgba(212, 175, 55, 0.01)', 
                border: '1.5px dashed rgba(212, 175, 55, 0.22)',
                textAlign: 'center',
                boxShadow: 'inset 0 0 12px rgba(212, 175, 55, 0.02)'
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
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Family;
