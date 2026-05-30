import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { SCRIPT_URL } from '../config';

const RSVP = () => {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Controlled form states
  const [fullName, setFullName] = useState('');
  const [guests, setGuests] = useState('1');
  const [attendance, setAttendance] = useState('accept');
  const [foodPreference, setFoodPreference] = useState('veg');
  const [message, setMessage] = useState('');

  const isConfigured = SCRIPT_URL && SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const payload = {
      action: 'rsvp',
      fullName: fullName.trim(),
      guests,
      attendance,
      foodPreference,
      message: message.trim()
    };

    if (isConfigured) {
      try {
        // POST to Google Sheet Apps Script using text/plain to avoid preflight CORS blockers
        await fetch(SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });
      } catch (error) {
        console.error("Failed to submit RSVP to Google Sheet:", error);
      }
    } else {
      console.log("Simulating RSVP submission locally:", payload);
    }

    setSubmitted(true);
    setIsSubmitting(false);

    // Reset fields
    setFullName('');
    setGuests('1');
    setAttendance('accept');
    setFoodPreference('veg');
    setMessage('');

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="section-padding" style={{ 
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('${import.meta.env.BASE_URL}royal_indian_engagement_1779894748927.png') center/cover fixed`, 
      position: 'relative' 
    }}>

      <div className="container" style={{ maxWidth: '700px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel"
          style={{ padding: 'clamp(20px, 5vw, 50px)', textAlign: 'center', background: 'rgba(20, 20, 20, 0.65)', backdropFilter: 'blur(12px)', border: '1px solid rgba(212,175,55,0.3)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
        >
          <h2 className="font-heading text-gradient-gold" style={{ fontSize: 'clamp(28px, 6vw, 40px)', marginBottom: '10px' }}>{t('rsvp')}</h2>
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
                <input 
                  required 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ padding: '15px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'rgba(0,0,0,0.4)', color: '#fffff0', fontFamily: 'var(--font-secondary)' }} 
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 200px' }}>
                  <label className="font-heading" style={{ color: '#fffff0' }}>{t('form_guests')} *</label>
                  <select 
                    required 
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    style={{ padding: '15px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'rgba(0,0,0,0.8)', color: '#fffff0', fontFamily: 'var(--font-secondary)' }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 200px' }}>
                  <label className="font-heading" style={{ color: '#fffff0' }}>{t('form_attendance')} *</label>
                  <select 
                    required 
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value)}
                    style={{ padding: '15px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'rgba(0,0,0,0.8)', color: '#fffff0', fontFamily: 'var(--font-secondary)' }}
                  >
                    <option value="accept">{t('form_accept')}</option>
                    <option value="decline">{t('form_decline')}</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-heading" style={{ color: '#fffff0' }}>{t('form_food')}</label>
                <select 
                  value={foodPreference}
                  onChange={(e) => setFoodPreference(e.target.value)}
                  style={{ padding: '15px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'rgba(0,0,0,0.8)', color: '#fffff0', fontFamily: 'var(--font-secondary)' }}
                >
                  <option value="veg">{t('form_veg')}</option>
                  <option value="non-veg">{t('form_nonveg')}</option>
                  <option value="vegan">{t('form_vegan')}</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label className="font-heading" style={{ color: '#fffff0' }}>{t('form_message')}</label>
                <textarea 
                  rows="3" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ padding: '15px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'rgba(0,0,0,0.4)', color: '#fffff0', fontFamily: 'var(--font-secondary)' }} 
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
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
                  transition: 'background-color 0.3s, opacity 0.3s',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? (language === 'hi' ? 'भेज रहे हैं...' : 'Sending RSVP...') : t('form_submit')}
              </button>

            </form>
          )}

        </motion.div>
      </div>
    </section>
  );
};

export default RSVP;
