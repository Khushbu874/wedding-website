import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { MapPin, Navigation, Plane, Hotel, Train, Phone } from 'lucide-react';

const Venue = () => {
  const { t } = useLanguage();
  const [isMapHovered, setIsMapHovered] = useState(false);

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--c-bg-tertiary)', paddingBottom: '0px' }}>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-center"
          style={{ fontSize: 'clamp(28px, 6vw, 40px)', color: 'var(--c-maroon)', marginBottom: 'clamp(30px, 6vw, 60px)', letterSpacing: '4px' }}
        >
          {t('venue')}
        </motion.h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'stretch' }}>
          {/* Map Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel"
            onMouseEnter={() => setIsMapHovered(true)}
            onMouseLeave={() => setIsMapHovered(false)}
            style={{ 
              flex: '1 1 min(500px, 100%)', 
              overflow: 'hidden', 
              padding: 0, 
              position: 'relative',
              boxShadow: 'var(--glass-shadow)',
              border: '2.5px solid rgba(212, 175, 55, 0.45)',
              borderRadius: '16px',
              transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.4s ease, box-shadow 0.4s ease',
              transform: isMapHovered ? 'scale(1.02)' : 'scale(1)'
            }}
          >
            {/* Clickable overlay that acts as a link over the map */}
            <a 
              href="https://maps.app.goo.gl/bhWxRcJEmZYjYvAi6"
              target="_blank"
              rel="noreferrer"
              style={{ position: 'absolute', inset: 0, zIndex: 10 }}
              title="Open in Google Maps"
            />
            <div style={{ position: 'relative', width: '100%', minHeight: 'clamp(300px, 45vh, 400px)', background: '#fdfbf7', display: 'flex', flexDirection: 'column' }}>
              <iframe 
                src="https://maps.google.com/maps?q=Rosebey%20Resort%20Raipur&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ 
                  border: 0, 
                  position: 'absolute', 
                  inset: 0, 
                  width: '100%', 
                  height: '100%',
                  borderRadius: '14px',
                  filter: 'contrast(1.05) saturate(0.9) sepia(10%)'
                }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Dynamic Overlay that fades in on hover to prompt the user */}
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(90, 0, 0, 0.04)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  opacity: isMapHovered ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              >
                <div style={{
                  padding: '12px 20px',
                  backgroundColor: 'rgba(253, 251, 247, 0.95)',
                  border: '1.5px solid var(--c-gold)',
                  borderRadius: '30px',
                  boxShadow: '0 8px 25px rgba(90, 0, 0, 0.15)',
                  color: 'var(--c-maroon)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transform: isMapHovered ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.95)',
                  transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
                }}>
                  <Navigation size={14} style={{ transform: 'rotate(45deg)' }} />
                  <span>OPEN IN GOOGLE MAPS</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ flex: '1 1 min(400px, 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <div id="venue" style={{ marginBottom: '40px' }}>
              <h3 className="font-heading" style={{ fontSize: 'clamp(20px, 5vw, 28px)', color: 'var(--c-maroon)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={28} /> {t('venue_title')}
              </h3>
              <p className="font-secondary" style={{ fontSize: 'clamp(14px, 4vw, 18px)', color: 'var(--c-text-primary)', marginBottom: '20px' }}>
                {t('venue_address')}
              </p>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://maps.app.goo.gl/bhWxRcJEmZYjYvAi6"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 24px',
                  backgroundColor: 'var(--c-maroon)',
                  color: 'var(--c-gold)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-heading)',
                  borderRadius: '30px',
                  fontSize: '14px',
                  letterSpacing: '1px'
                }}
              >
                <Navigation size={18} /> {t('get_directions')}
              </motion.a>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
