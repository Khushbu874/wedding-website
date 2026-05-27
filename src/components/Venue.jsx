import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { MapPin, Navigation, Plane, Hotel, Train } from 'lucide-react';

const Venue = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--c-bg-secondary)', filter: 'brightness(0.94)' }}>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-center"
          style={{ fontSize: '40px', color: 'var(--c-maroon)', marginBottom: '60px', letterSpacing: '4px' }}
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
            style={{ flex: '1 1 500px', overflow: 'hidden', padding: 0, position: 'relative' }}
          >
            {/* Clickable overlay that acts as a link over the map */}
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Ambikapur,+Chhattisgarh,+India"
              target="_blank"
              rel="noreferrer"
              style={{ position: 'absolute', inset: 0, zIndex: 10 }}
              title="Open in Google Maps"
            />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117094.01509939105!2d83.10996841285227!3d23.136894042858994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fb6df43c49439%3A0xe54cbba1aed68615!2sAmbikapur%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1716301234567!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '400px', filter: 'sepia(30%)' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
          >
            <div id="venue" style={{ marginBottom: '40px' }}>
              <h3 className="font-heading" style={{ fontSize: '28px', color: 'var(--c-maroon)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={28} /> {t('venue_title')}
              </h3>
              <p className="font-secondary" style={{ fontSize: '18px', color: 'var(--c-text-primary)', marginBottom: '20px' }}>
                {t('venue_address')}
              </p>
              
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.google.com/maps/dir/?api=1&destination=Ambikapur,+Chhattisgarh,+India"
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Plane size={30} color="var(--c-gold)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 className="font-heading" style={{ fontSize: '16px', color: 'var(--c-maroon)', marginBottom: '5px' }}>{t('travel_air')}</h4>
                  <p className="font-secondary" style={{ fontSize: '14px', color: 'var(--c-text-secondary)', marginBottom: '5px' }}>
                    {t('nearest_airport')}
                  </p>
                  <a href="https://www.google.com/maps/dir/?api=1&origin=Maa+Mahamaya+Airport,+Darima&destination=Ambikapur,+Chhattisgarh" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--c-maroon)', textDecoration: 'underline', fontFamily: 'var(--font-heading)' }}>{t('get_route_air')}</a>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Train size={30} color="var(--c-gold)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 className="font-heading" style={{ fontSize: '16px', color: 'var(--c-maroon)', marginBottom: '5px' }}>{t('travel_train')}</h4>
                  <p className="font-secondary" style={{ fontSize: '14px', color: 'var(--c-text-secondary)', marginBottom: '5px' }}>
                    {t('nearest_station')}
                  </p>
                  <a href="https://www.google.com/maps/dir/?api=1&origin=Ambikapur+Railway+Station&destination=Ambikapur,+Chhattisgarh" target="_blank" rel="noreferrer" style={{ fontSize: '12px', color: 'var(--c-maroon)', textDecoration: 'underline', fontFamily: 'var(--font-heading)' }}>{t('get_route_train')}</a>
                </div>
              </div>
              <div className="glass-panel" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Hotel size={30} color="var(--c-gold)" style={{ flexShrink: 0 }} />
                <div>
                  <h4 className="font-heading" style={{ fontSize: '16px', color: 'var(--c-maroon)', marginBottom: '5px' }}>{t('accommodation')}</h4>
                  <p className="font-secondary" style={{ fontSize: '14px', color: 'var(--c-text-secondary)' }}>
                    {t('acc_details')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Venue;
