import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const LoveStory = () => {
  const { t } = useLanguage();

  const timelineEvents = [
    {
      id: 1,
      title: t('story_1_title'),
      date: t('story_1_date'),
      description: t('story_1_desc'),
      image: `${import.meta.env.BASE_URL}royal_indian_couple_first_meet_1779894730819.png`
    },
    {
      id: 2,
      title: t('story_2_title'),
      date: t('story_2_date'),
      description: t('story_2_desc'),
      image: `${import.meta.env.BASE_URL}royal_indian_engagement_1779894748927.png`
    },
    {
      id: 3,
      title: t('story_3_title'),
      date: t('story_3_date'),
      description: t('story_3_desc'),
      image: `${import.meta.env.BASE_URL}royal_indian_wedding_venue_1779894764907.png`
    }
  ];

  return (
    <section 
      className="section-padding" 
      style={{ 
        backgroundColor: 'var(--c-bg-primary)',
        position: 'relative'
      }}
    >
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-center text-gradient-gold"
          style={{ fontSize: 'clamp(50px, 8vw, 70px)', marginBottom: '20px' }}
        >
          {t('our_story')}
        </motion.h2>
        
        <p className="font-secondary text-center" style={{ color: 'var(--c-text-secondary)', marginBottom: '60px', maxWidth: '600px', margin: '0 auto 60px auto' }}>
          A journey of love, laughter, and a promise for a lifetime.
        </p>

        {/* Elegant Grid Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '40px',
          alignItems: 'stretch'
        }}>
          {timelineEvents.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="glass-panel"
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: 'var(--c-bg-secondary)',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Card Image */}
              <div style={{ width: '100%', height: '250px', position: 'relative', overflow: 'hidden' }}>
                <img 
                  src={item.image} 
                  alt={item.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: 0, right: 0,
                  height: '50px',
                  background: 'linear-gradient(to top, var(--c-bg-secondary), transparent)'
                }} />
              </div>

              {/* Card Content */}
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span className="font-heading" style={{ color: 'var(--c-gold)', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase' }}>
                    {t('chapter')} {index + 1}
                  </span>
                  <span className="font-secondary" style={{ color: 'var(--c-text-secondary)', fontWeight: 'bold', fontSize: '14px' }}>
                    {item.date}
                  </span>
                </div>
                
                <h3 className="font-heading" style={{ color: 'var(--c-maroon)', fontSize: '26px', marginBottom: '15px', lineHeight: '1.3' }}>
                  {item.title}
                </h3>
                
                <div style={{ width: '40px', height: '2px', backgroundColor: 'var(--c-gold)', marginBottom: '20px' }} />
                
                <p className="font-secondary" style={{ color: 'var(--c-text-primary)', lineHeight: '1.8', fontSize: '15px', opacity: 0.9 }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveStory;
