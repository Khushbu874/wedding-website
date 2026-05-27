import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

const WishesWall = () => {
  const { t } = useLanguage();

  const initialWishes = [
    { id: 1, name: t('wish_name_1'), message: t('wish_msg_1'), timestamp: t('time_2_days') },
    { id: 2, name: t('wish_name_2'), message: t('wish_msg_2'), timestamp: t('time_1_week') },
    { id: 3, name: t('wish_name_3'), message: t('wish_msg_3'), timestamp: t('time_2_weeks') }
  ];

  const [wishes, setWishes] = useState(initialWishes);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newName.trim() && newMessage.trim()) {
      const newWish = {
        id: Date.now(),
        name: newName,
        message: newMessage,
        timestamp: t('time_just_now')
      };
      setWishes([newWish, ...wishes]);
      setNewName('');
      setNewMessage('');
    }
  };

  return (
    <section id="wishes" className="section-padding" style={{ backgroundColor: 'var(--c-bg-primary)' }}>
      <div className="container">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-center"
          style={{ fontSize: '60px', color: 'var(--c-gold)', marginBottom: '10px' }}
        >
          {t('wishes_title')}
        </motion.h2>

        <p className="font-secondary text-center" style={{ color: 'var(--c-text-secondary)', marginBottom: '50px' }}>
          {t('wishes_subtitle')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '60px' }}>
          <form onSubmit={handleSubmit} className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 className="font-heading" style={{ color: 'var(--c-maroon)', marginBottom: '10px' }}>{t('wishes_add')}</h3>
            <input
              type="text"
              placeholder={t('wishes_name')}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
              style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'transparent', color: 'var(--c-text-primary)' }}
            />
            <textarea
              placeholder={t('wishes_msg')}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              required
              rows="3"
              style={{ padding: '12px', borderRadius: '4px', border: '1px solid var(--c-gold)', background: 'transparent', color: 'var(--c-text-primary)', resize: 'none' }}
            />
            <button
              type="submit"
              style={{
                padding: '12px',
                background: 'var(--c-maroon)',
                color: 'var(--c-gold)',
                border: 'none',
                borderRadius: '4px',
                fontFamily: 'var(--font-heading)',
                cursor: 'pointer',
                letterSpacing: '1px'
              }}
            >
              {t('wishes_post')}
            </button>
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          <AnimatePresence>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                layout
                className="glass-panel"
                style={{ padding: '25px', borderTop: '3px solid var(--c-gold)' }}
              >
                <p className="font-secondary" style={{ color: 'var(--c-text-primary)', fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '20px' }}>
                  "{wish.message}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '15px' }}>
                  <span className="font-heading" style={{ color: 'var(--c-maroon)', fontWeight: 'bold' }}>{wish.name}</span>
                  <span className="font-secondary" style={{ color: 'var(--c-text-secondary)', fontSize: '12px' }}>{wish.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default WishesWall;
