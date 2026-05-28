import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const Family = () => {
  const { t } = useLanguage();

  const families = {
    groom: {
      side: t('groom_full'),
      members: [
        { name: t('groom_father'), relation: t('parents_groom') },
        { name: t('groom_mother'), relation: t('parents_groom') },
        { name: t('groom_brother'), relation: t('brother') }
      ]
    },
    bride: {
      side: t('bride_full'),
      members: [
        { name: t('bride_father'), relation: t('parents_bride') },
        { name: t('bride_mother'), relation: t('parents_bride') },
        { name: t('bride_sister'), relation: t('sister') }
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
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {family.members.map((member, index) => (
                  <div key={index}>
                    <p className="font-primary" style={{ fontSize: 'clamp(16px, 4vw, 20px)', color: 'var(--c-maroon)', fontWeight: 'bold' }}>{member.name}</p>
                    <p className="font-secondary" style={{ color: 'var(--c-text-secondary)', fontStyle: 'italic', fontSize: 'clamp(12px, 3vw, 14px)' }}>{member.relation}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Family;
