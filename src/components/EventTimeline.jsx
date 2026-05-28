import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Sun, Palette, Music, Heart, GlassWater, X, MapPin, Clock, Calendar } from 'lucide-react';

const EventTimeline = () => {
  const { t } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 'haldi',
      title: t('event_haldi'),
      icon: <Sun size={32} />,
      color: '#fde047', // bright yellow
      date: t('date_nov22'),
      time: t('time_10am'),
      venue: t('venue_haldi'),
      dressCode: t('dress_haldi'),
      description: t('desc_haldi')
    },
    {
      id: 'mehendi',
      title: t('event_mehendi'),
      icon: <Palette size={32} />,
      color: '#4ade80', // bright green
      date: t('date_nov22'),
      time: t('time_4pm'),
      venue: t('venue_mehendi'),
      dressCode: t('dress_mehendi'),
      description: t('desc_mehendi')
    },
    {
      id: 'sangeet',
      title: t('event_sangeet'),
      icon: <Music size={32} />,
      color: '#c084fc', // bright purple
      date: t('date_nov23'),
      time: t('time_7pm'),
      venue: t('venue_sangeet'),
      dressCode: t('dress_sangeet'),
      description: t('desc_sangeet')
    },
    {
      id: 'wedding',
      title: t('event_wedding'),
      icon: <Heart size={32} />,
      color: '#f87171', // bright red
      date: t('date_nov24'),
      time: t('time_5pm'),
      venue: t('venue_wedding'),
      dressCode: t('dress_wedding'),
      description: t('desc_wedding')
    },
    {
      id: 'reception',
      title: t('event_reception'),
      icon: <GlassWater size={32} />,
      color: '#e2e8f0', // bright silver/ivory
      date: t('date_nov25'),
      time: t('time_8pm'),
      venue: t('venue_reception'),
      dressCode: t('dress_reception'),
      description: t('desc_reception')
    }
  ];

  return (
    <section className="section-padding" style={{ 
      background: `linear-gradient(rgba(17, 17, 17, 0.8), rgba(17, 17, 17, 0.9)), url('${import.meta.env.BASE_URL}royal_indian_wedding_venue_1779894764907.png') center/cover fixed`,
      color: '#fffff0'
    }}>
      <div className="container">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-center text-gradient-gold"
          style={{ fontSize: '40px', marginBottom: '60px', letterSpacing: '4px' }}
        >
          {t('events')}
        </motion.h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
              onClick={() => setSelectedEvent(event)}
              style={{
                width: '100%',
                maxWidth: '280px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '16px',
                padding: '30px 20px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: `1px solid rgba(212, 175, 55, 0.5)`,
                boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
                cursor: 'pointer'
              }}
            >
              {/* Top Accent Line */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                height: '6px',
                backgroundColor: event.color
              }} />

              <motion.div style={{
                width: '70px', height: '70px', margin: '0 auto 20px', borderRadius: '50%',
                backgroundColor: `${event.color}11`, color: event.color, display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}>
                {event.icon}
              </motion.div>

              <motion.h3 className="font-heading" style={{ color: event.color, fontSize: '24px', marginBottom: '15px' }}>
                {event.title}
              </motion.h3>
              
              <div style={{ marginBottom: '10px' }}>
                <p className="font-primary" style={{ fontWeight: '600', color: '#fffff0' }}>{event.date}</p>
              </div>

              <div style={{ width: '30px', height: '1px', backgroundColor: 'var(--c-gold)', margin: '15px auto' }} />

              <p className="font-secondary" style={{ color: 'var(--c-gold)', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {t('click_details')}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Flip Card View */}
      {createPortal(
        <AnimatePresence>
          {selectedEvent && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedEvent(null)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  backdropFilter: 'blur(5px)',
                  zIndex: 9999
                }}
              />
              <div style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 10000,
                pointerEvents: 'none',
                padding: '20px'
              }}>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 20 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  style={{
                    width: '100%',
                    maxWidth: '520px',
                    backgroundColor: 'rgba(20, 20, 20, 0.85)',
                    backdropFilter: 'blur(15px)',
                    WebkitBackdropFilter: 'blur(15px)',
                    borderRadius: '20px',
                    padding: 'clamp(20px, 6vw, 40px)',
                    position: 'relative',
                    pointerEvents: 'auto',
                    border: `2px solid ${selectedEvent.color}`,
                    boxShadow: `0 20px 50px rgba(0,0,0,0.5)`
                  }}
                >
                  <button
                    onClick={() => setSelectedEvent(null)}
                    style={{
                      position: 'absolute', top: '20px', right: '20px',
                      background: 'rgba(0,0,0,0.1)', border: 'none',
                      borderRadius: '50%', width: '30px', height: '30px',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      cursor: 'pointer', color: '#fffff0'
                    }}
                  >
                    <X size={18} />
                  </button>

                  <motion.div style={{
                    width: '80px', height: '80px', margin: '0 auto 20px', borderRadius: '50%',
                    backgroundColor: `${selectedEvent.color}22`, color: selectedEvent.color,
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
                  }}>
                    {selectedEvent.icon}
                  </motion.div>

                  <motion.h3 className="font-heading text-center" style={{ color: selectedEvent.color, fontSize: 'clamp(24px, 6vw, 36px)', marginBottom: 'clamp(15px, 4vw, 30px)' }}>
                    {selectedEvent.title}
                  </motion.h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <Calendar color="var(--c-gold)" size={20} />
                      <span className="font-primary" style={{ fontSize: '18px', color: '#fffff0' }}>{selectedEvent.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <Clock color="var(--c-gold)" size={20} />
                      <span className="font-primary" style={{ fontSize: '18px', color: '#fffff0' }}>{selectedEvent.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <MapPin color="var(--c-gold)" size={20} />
                      <span className="font-primary" style={{ fontSize: '18px', color: '#fffff0' }}>{selectedEvent.venue}</span>
                    </div>
                  </div>

                  <div style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '12px', borderLeft: `4px solid ${selectedEvent.color}` }}>
                    <p className="font-secondary" style={{ color: '#fffff0', lineHeight: '1.6', fontSize: '16px', marginBottom: '15px' }}>
                      {selectedEvent.description}
                    </p>
                    <p className="font-secondary" style={{ color: '#cccccc', fontStyle: 'italic', fontSize: '14px' }}>
                      <strong>{t('dress_code')}:</strong> {selectedEvent.dressCode}
                    </p>
                  </div>

                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default EventTimeline;
