import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Sun, Music, Heart, GlassWater, X, Clock, Calendar, Smile, Sparkles, Flame, ChevronRight } from 'lucide-react';

import welcomeImg from '../assets/Welcom Reception.png';
import carnivalImg from '../assets/Carnival.png';
import sangeetImg from '../assets/Sangeet.png';
import bhaatImg from '../assets/Gor.png';
import baratImg from '../assets/Nikashi Baarat.png';
import receptionImg from '../assets/Reception.png';
import varmalaImg from '../assets/Varmala.png';
import phereImg from '../assets/Phere.png';

const EventTimeline = () => {
  const { t } = useLanguage();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredEventId, setHoveredEventId] = useState(null);

  const eventDays = [
    {
      id: 'day1',
      date: t('date_june30'),
      dayName: t('day_1_title'),
      color: 'var(--c-gold)',
      hasPlaque: true,
      events: [
        {
          id: 'welcome',
          title: t('event_welcome'),
          time: t('time_9_30am'),
          icon: welcomeImg,
          venue: t('venue_welcome'),
          dressCode: t('dress_welcome'),
          description: t('desc_welcome'),
          color: '#fbbf24',
          date: t('date_june30')
        },
        {
          id: 'carnival',
          title: t('event_carnival'),
          time: t('time_10am'),
          icon: carnivalImg,
          venue: t('venue_carnival'),
          dressCode: t('dress_carnival'),
          description: t('desc_carnival'),
          color: '#3b82f6',
          date: t('date_june30')
        },
        {
          id: 'sangeet',
          title: t('event_sangeet'),
          time: t('time_8pm'),
          icon: sangeetImg,
          venue: t('venue_sangeet'),
          dressCode: t('dress_sangeet'),
          description: t('desc_sangeet'),
          color: '#a855f7',
          date: t('date_june30')
        }
      ]
    },
    {
      id: 'day2',
      date: t('date_july1'),
      dayName: t('day_2_title'),
      color: 'var(--c-maroon)',
      hasPlaque: false,
      events: [
        {
          id: 'bhaat',
          title: t('event_bhaat'),
          time: t('time_10am'),
          icon: bhaatImg,
          venue: t('venue_bhaat'),
          dressCode: t('dress_bhaat'),
          description: t('desc_bhaat'),
          color: '#fbbf24',
          date: t('date_july1')
        },
        {
          id: 'barat',
          title: t('event_barat'),
          time: t('time_5pm'),
          icon: baratImg,
          venue: t('venue_barat'),
          dressCode: t('dress_barat'),
          description: t('desc_barat'),
          color: '#f97316',
          date: t('date_july1')
        },
        {
          id: 'reception',
          title: t('event_reception'),
          time: t('time_8pm'),
          icon: receptionImg,
          venue: t('venue_reception'),
          dressCode: t('dress_reception'),
          description: t('desc_reception'),
          color: '#cbd5e1',
          date: t('date_july1')
        },
        {
          id: 'varmala',
          title: t('event_varmala'),
          time: t('time_9pm'),
          icon: varmalaImg,
          venue: t('venue_varmala'),
          dressCode: t('dress_varmala'),
          description: t('desc_varmala'),
          color: '#ef4444',
          date: t('date_july1')
        },
        {
          id: 'phere',
          title: t('event_phere'),
          time: t('time_phere'),
          icon: phereImg,
          venue: t('venue_phere'),
          dressCode: t('dress_phere'),
          description: t('desc_phere'),
          color: '#ea580c',
          date: t('date_july1')
        }
      ]
    }
  ];

  return (
    <section className="section-padding" style={{ 
      backgroundColor: 'var(--c-bg-secondary)', 
      filter: 'brightness(0.94)',
      color: 'var(--c-text-primary)',
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: 'clamp(40px, 6vw, 60px)'
    }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-center"
          style={{ fontSize: 'clamp(32px, 8vw, 45px)', color: 'var(--c-maroon)', marginBottom: '50px', letterSpacing: '4px' }}
        >
          {t('events')}
        </motion.h2>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(450px, 100%), 1fr))', 
          gap: '40px',
          justifyContent: 'center',
          alignItems: 'stretch' // Stretches card heights to match symmetrically
        }}>
          {eventDays.map((day, dayIdx) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: dayIdx * 0.2 }}
              className="glass-panel"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '28px',
                padding: 'clamp(25px, 4vw, 40px)',
                boxShadow: '0 20px 45px rgba(90, 0, 0, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Luxury Corner Ornaments */}
              <div style={{ position: 'absolute', top: '15px', left: '15px', color: 'var(--c-gold)', opacity: 0.4, fontSize: '10px' }}>✦</div>
              <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--c-gold)', opacity: 0.4, fontSize: '10px' }}>✦</div>
              <div style={{ position: 'absolute', bottom: '15px', left: '15px', color: 'var(--c-gold)', opacity: 0.4, fontSize: '10px' }}>✦</div>
              <div style={{ position: 'absolute', bottom: '15px', right: '15px', color: 'var(--c-gold)', opacity: 0.4, fontSize: '10px' }}>✦</div>

              {/* Card Header */}
              <div style={{ 
                borderBottom: '1px solid rgba(212, 175, 55, 0.2)', 
                paddingBottom: '20px', 
                marginBottom: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.08)',
                  border: '1.5px solid var(--c-gold)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'var(--c-gold)',
                  flexShrink: 0,
                  boxShadow: '0 0 15px rgba(212, 175, 55, 0.15)'
                }}>
                  <Calendar size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 className="font-heading" style={{ fontSize: 'clamp(22px, 4vw, 28px)', color: 'var(--c-maroon)', margin: '0', fontWeight: 'bold' }}>
                    {day.date}
                  </h3>
                  <p className="font-secondary" style={{ color: 'var(--c-gold)', fontSize: '12px', margin: '5px 0 0 0', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 'bold' }}>
                    {day.dayName}
                  </p>
                  {/* Ornate Divider under header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4))' }}></div>
                    <span style={{ color: 'var(--c-gold)', fontSize: '8px', opacity: 0.8 }}>✦ ⚜ ✦</span>
                    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.4))' }}></div>
                  </div>
                </div>
              </div>

              {/* Card Events Program List (Roadmap lines removed completely) */}
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '20px',
                marginBottom: day.hasPlaque ? '30px' : '0'
              }}>
                {day.events.map((event) => {
                  const isHovered = hoveredEventId === event.id;

                  return (
                    <motion.div
                      key={event.id}
                      onClick={() => setSelectedEvent(event)}
                      onHoverStart={() => setHoveredEventId(event.id)}
                      onHoverEnd={() => setHoveredEventId(null)}
                      whileHover={{ y: -5, scale: 1.015 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      style={{
                        backgroundColor: isHovered ? 'rgba(212, 175, 55, 0.08)' : 'rgba(255, 255, 255, 0.7)',
                        border: isHovered ? '1.5px solid rgba(212, 175, 55, 0.5)' : '1.5px solid rgba(212, 175, 55, 0.18)',
                        borderRadius: '20px',
                        padding: '18px 20px',
                        cursor: 'pointer',
                        position: 'relative',
                        boxShadow: isHovered 
                          ? '0 12px 25px rgba(212, 175, 55, 0.1)' 
                          : '0 4px 15px rgba(90, 0, 0, 0.02)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        backgroundImage: 'radial-gradient(circle at top right, rgba(212,175,55,0.03) 0%, transparent 60%)'
                      }}
                    >
                      {/* Top header inside ceremony card */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '14px',
                        borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
                        paddingBottom: '10px'
                      }}>
                        {/* Time in elegant gold serif */}
                        <span className="font-heading" style={{ 
                          fontSize: '18px', 
                          fontWeight: '700', 
                          letterSpacing: '1px',
                          color: 'var(--c-maroon)'
                        }}>
                          {event.time}
                        </span>
                        
                        <motion.div 
                          animate={{
                            scale: isHovered ? 1.15 : 1,
                            backgroundColor: isHovered ? `${event.color}22` : 'rgba(212, 175, 55, 0.06)'
                          }}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            border: `1px solid ${event.color}aa`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            flexShrink: 0
                          }}
                        >
                          <img 
                            src={event.icon} 
                            alt={event.title} 
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              borderRadius: '50%', 
                              objectFit: 'cover' 
                            }} 
                          />
                        </motion.div>
                      </div>

                      {/* Content */}
                      <h4 className="font-heading" style={{ 
                        fontSize: '20px', 
                        color: 'var(--c-maroon)', 
                        margin: '0 0 12px 0', 
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontWeight: 'bold'
                      }}>
                        {event.title}
                      </h4>

                      {/* Footer indicators */}
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        borderTop: '1px solid rgba(0,0,0,0.03)',
                        paddingTop: '10px'
                      }}>
                        <span style={{ fontSize: '10px', color: '#888', fontStyle: 'italic' }}>
                          Click to explore details
                        </span>
                        
                        <motion.span 
                          animate={{ x: isHovered ? 4 : 0 }}
                          style={{ 
                            fontSize: '10px', 
                            color: 'var(--c-gold)', 
                            letterSpacing: '1.2px', 
                            textTransform: 'uppercase', 
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {t('click_details')} <ChevronRight size={10} style={{ flexShrink: 0, marginTop: '-1px' }} />
                        </motion.span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom balanced plaque for June 30th card */}
              {day.hasPlaque && (
                <div style={{
                  marginTop: 'auto', // Pushes this plaque strictly to the bottom
                  padding: '24px 20px',
                  borderRadius: '20px',
                  border: '1.5px dashed rgba(212, 175, 55, 0.3)',
                  backgroundColor: 'rgba(212, 175, 55, 0.04)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}>
                  <span style={{ color: 'var(--c-gold)', fontSize: '20px', textShadow: '0 0 5px var(--c-gold)' }}>❦</span>
                  <p className="font-secondary" style={{ color: 'var(--c-text-primary)', fontStyle: 'italic', fontSize: '13px', margin: '0', lineHeight: '1.6' }}>
                    "{t('quote_timeline')}"
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / details overlay */}
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
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
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
                    backgroundColor: 'rgba(20, 20, 20, 0.9)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: 'clamp(25px, 6vw, 40px)',
                    position: 'relative',
                    pointerEvents: 'auto',
                    border: `2px solid ${selectedEvent.color}`,
                    boxShadow: `0 20px 50px rgba(0,0,0,0.7)`
                  }}
                >
                  <button
                    onClick={() => setSelectedEvent(null)}
                    style={{
                      position: 'absolute', top: '20px', right: '20px',
                      background: 'rgba(255,255,255,0.05)', border: 'none',
                      borderRadius: '50%', width: '32px', height: '32px',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      cursor: 'pointer', color: '#fffff0',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  >
                    <X size={18} />
                  </button>

                  <motion.div style={{
                    width: '70px', height: '70px', margin: '0 auto 20px', borderRadius: '50%',
                    backgroundColor: `${selectedEvent.color}22`,
                    display: 'flex', justifyContent: 'center', alignItems: 'center',
                    border: `1.5px solid ${selectedEvent.color}55`,
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={selectedEvent.icon} 
                      alt={selectedEvent.title} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        borderRadius: '50%', 
                        objectFit: 'cover' 
                      }} 
                    />
                  </motion.div>

                  <motion.h3 className="font-heading text-center" style={{ color: selectedEvent.color, fontSize: 'clamp(22px, 6vw, 32px)', marginBottom: 'clamp(15px, 4vw, 25px)' }}>
                    {selectedEvent.title}
                  </motion.h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <Calendar color="var(--c-gold)" size={20} />
                      <span className="font-primary" style={{ fontSize: '16px', color: '#fffff0' }}>{selectedEvent.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <Clock color="var(--c-gold)" size={20} />
                      <span className="font-primary" style={{ fontSize: '16px', color: '#fffff0' }}>{selectedEvent.time}</span>
                    </div>
                  </div>

                  <div style={{ padding: '20px', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: '16px', borderLeft: `4px solid ${selectedEvent.color}` }}>
                    <p className="font-secondary" style={{ color: '#fffff0', lineHeight: '1.6', fontSize: '15px', margin: '0' }}>
                      {selectedEvent.description}
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
