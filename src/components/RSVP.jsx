import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const RSVP = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="section-padding" style={{ 
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('/royal_indian_engagement_1779894748927.png') center/cover fixed`, 
      position: 'relative' 
    }}>

      {/* Decorative corners */}
      <div style={{ position: 'absolute', top: '20px', left: '20px', width: '100px', height: '100px', borderTop: '2px solid var(--c-gold)', borderLeft: '2px solid var(--c-gold)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', width: '100px', height: '100px', borderBottom: '2px solid var(--c-gold)', borderRight: '2px solid var(--c-gold)', opacity: 0.5 }} />

      <div className="container" style={{ maxWidth: '700px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel"
          style={{ padding: '50px', textAlign: 'center', background: 'rgba(20, 20, 20, 0.65)', backdropFilter: 'blur(12px)', border: '1px solid rgba(212,175,55,0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
        >
          <h2 className="font-heading text-gradient-gold" style={{ fontSize: '40px', marginBottom: '10px' }}>{t('rsvp')}</h2>
          <p className="font-secondary" style={{ color: '#cccccc', marginBottom: '40px', letterSpacing: '2px', fontSize: '14px' }}>
            {t('rsvp_deadline')}
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ padding: '40px 0', color: '#fffff0' }}
            >
              <h3 className="font-script text-gradient-gold" style={{ fontSize: '40px', marginBottom: '10px' }}>{t('rsvp_thanks')}</h3>
              <p className="font-secondary">{t('rsvp_received')}</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'left' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-heading" style={{ color: '#fffff0' }}>{t('form_name')} *</label>
                <input required type="text" style={{ padding: '15px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'rgba(0,0,0,0.4)', color: '#fffff0', fontFamily: 'var(--font-secondary)' }} />
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <label className="font-heading" style={{ color: '#fffff0' }}>{t('form_guests')} *</label>
                  <select required style={{ padding: '15px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'rgba(0,0,0,0.8)', color: '#fffff0', fontFamily: 'var(--font-secondary)' }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <label className="font-heading" style={{ color: '#fffff0' }}>{t('form_attendance')} *</label>
                  <select required style={{ padding: '15px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'rgba(0,0,0,0.8)', color: '#fffff0', fontFamily: 'var(--font-secondary)' }}>
                    <option value="accept">{t('form_accept')}</option>
                    <option value="decline">{t('form_decline')}</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-heading" style={{ color: '#fffff0' }}>{t('form_food')}</label>
                <select style={{ padding: '15px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'rgba(0,0,0,0.8)', color: '#fffff0', fontFamily: 'var(--font-secondary)' }}>
                  <option value="veg">{t('form_veg')}</option>
                  <option value="non-veg">{t('form_nonveg')}</option>
                  <option value="vegan">{t('form_vegan')}</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-heading" style={{ color: '#fffff0' }}>{t('form_message')}</label>
                <textarea rows="3" style={{ padding: '15px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'rgba(0,0,0,0.4)', color: '#fffff0', fontFamily: 'var(--font-secondary)' }}></textarea>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: '10px',
                  padding: '18px',
                  backgroundColor: 'var(--c-maroon)',
                  color: 'var(--c-gold)',
                  border: 'none',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  letterSpacing: '2px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s'
                }}
              >
                {t('form_submit')}
              </button>

            </form>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
