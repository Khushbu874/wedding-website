import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { SCRIPT_URL } from '../config';

// Helper function to format timestamp into an exact relative duration
const getRelativeTime = (timestamp, language) => {
  if (!timestamp) {
    return language === 'hi' ? 'अभी-अभी' : 'Just now';
  }

  // Handle mock static timestamps like "2 days ago", "1 week ago", "2 weeks ago"
  if (typeof timestamp === 'string' && (
    timestamp.includes('ago') || 
    timestamp.includes('now') || 
    timestamp.includes('पहले') || 
    timestamp.includes('अभी') ||
    timestamp.includes('week') ||
    timestamp.includes('day')
  )) {
    return timestamp;
  }

  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return timestamp; // Return raw value if not parseable
  }

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return language === 'hi' ? 'अभी-अभी' : 'Just now';
  }
  if (diffMins < 60) {
    return language === 'hi' 
      ? `${diffMins} मिनट पहले` 
      : `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  }
  if (diffHours < 24) {
    return language === 'hi' 
      ? `${diffHours} घंटे पहले` 
      : `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  }
  if (diffDays < 7) {
    return language === 'hi' 
      ? `${diffDays} दिन पहले` 
      : `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }

  // Standard absolute date format for older comments
  try {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-US', options);
  } catch (e) {
    return timestamp;
  }
};

const WishesWall = () => {
  const { t, language } = useLanguage();

  const initialWishes = [
    { id: 1, name: t('wish_name_1'), message: t('wish_msg_1'), timestamp: t('time_2_days') },
    { id: 2, name: t('wish_name_2'), message: t('wish_msg_2'), timestamp: t('time_1_week') },
    { id: 3, name: t('wish_name_3'), message: t('wish_msg_3'), timestamp: t('time_2_weeks') }
  ];

  const [wishes, setWishes] = useState(initialWishes);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isConfigured = SCRIPT_URL && SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL';

  const fetchWishes = async () => {
    if (!isConfigured) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${SCRIPT_URL}?action=wishes`);
      const result = await res.json();
      if (result.status === 'success' && Array.isArray(result.data)) {
        setWishes(result.data);
      } else {
        console.warn("Spreadsheet backend returned non-success:", result.message);
      }
    } catch (err) {
      console.error("Error fetching wishes from Google Sheet:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newName.trim() && newMessage.trim() && !isSubmitting) {
      setIsSubmitting(true);
      
      const newWish = {
        id: Date.now(),
        name: newName.trim(),
        message: newMessage.trim(),
        timestamp: t('time_just_now')
      };

      // Optimistic update: prepend locally immediately
      setWishes(prevWishes => [newWish, ...prevWishes]);
      
      const submittedName = newName;
      const submittedMessage = newMessage;
      
      setNewName('');
      setNewMessage('');

      if (isConfigured) {
        try {
          // POST to Google Sheet Apps Script using text/plain to avoid preflight CORS blockers
          await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify({
              action: 'wishes',
              name: submittedName.trim(),
              message: submittedMessage.trim()
            })
          });

          // Fetch the latest updated list from sheet to sync timestamps
          setTimeout(() => {
            fetchWishes();
          }, 2000);
        } catch (error) {
          console.error("Failed to post wish to Google Sheet:", error);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        // Offline simulation mode
        console.log("Simulating wish submission locally: ", newWish);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="wishes" className="section-padding" style={{ backgroundColor: 'var(--c-bg-primary)' }}>
      {/* Custom styled scrollbar for wishes feed */}
      <style>{`
        .wishes-feed::-webkit-scrollbar {
          width: 5px;
        }
        .wishes-feed::-webkit-scrollbar-track {
          background: transparent;
        }
        .wishes-feed::-webkit-scrollbar-thumb {
          background: var(--c-gold);
          border-radius: 10px;
        }
        .wishes-feed::-webkit-scrollbar-thumb:hover {
          background: var(--c-maroon);
        }
      `}</style>

      <div className="container">

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-script text-center"
          style={{ fontSize: 'clamp(36px, 8vw, 60px)', color: 'var(--c-gold)', marginBottom: '10px' }}
        >
          {t('wishes_title')}
        </motion.h2>

        <p className="font-secondary text-center" style={{ color: 'var(--c-text-secondary)', marginBottom: 'clamp(25px, 5vw, 50px)' }}>
          {t('wishes_subtitle')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'clamp(30px, 6vw, 60px)' }}>
          <form onSubmit={handleSubmit} className="glass-panel" style={{ width: '100%', maxWidth: '600px', padding: 'clamp(15px, 4vw, 30px)', display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
              disabled={isSubmitting}
              style={{
                padding: '12px',
                background: 'var(--c-maroon)',
                color: 'var(--c-gold)',
                border: 'none',
                borderRadius: '4px',
                fontFamily: 'var(--font-heading)',
                cursor: 'pointer',
                letterSpacing: '1px',
                opacity: isSubmitting ? 0.7 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              {isSubmitting ? (language === 'hi' ? 'भेज रहे हैं...' : 'Posting...') : t('wishes_post')}
            </button>
          </form>
        </div>

        {/* Scrollable wishes feed showing 3 wishes at a time */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div 
            className="wishes-feed"
            style={{ 
              width: '100%', 
              maxWidth: '600px', 
              maxHeight: '485px', 
              overflowY: 'auto', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '20px',
              padding: '10px 5px',
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--c-gold) transparent'
            }}
          >
            <AnimatePresence>
              {wishes.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-panel"
                  style={{ padding: '30px', textAlign: 'center', borderTop: '3px solid var(--c-gold)', flexShrink: 0 }}
                >
                  <p className="font-secondary" style={{ color: 'var(--c-text-primary)', fontSize: '16px', fontStyle: 'italic', marginBottom: '0' }}>
                    {language === 'hi' ? 'अभी तक कोई शुभकामना नहीं है। सबसे पहले शुभकामना देने वाले बनें!' : 'No blessings yet. Be the first to bless the couple!'}
                  </p>
                </motion.div>
              ) : (
                wishes.map((wish) => (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    layout
                    className="glass-panel"
                    style={{ padding: '25px', borderTop: '3px solid var(--c-gold)', flexShrink: 0 }}
                  >
                    <p className="font-secondary" style={{ color: 'var(--c-text-primary)', fontSize: '16px', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '20px' }}>
                      "{wish.message}"
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '15px' }}>
                      <span className="font-heading" style={{ color: 'var(--c-maroon)', fontWeight: 'bold' }}>{wish.name}</span>
                      <span className="font-secondary" style={{ color: 'var(--c-text-secondary)', fontSize: '12px' }}>{getRelativeTime(wish.timestamp, language)}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishesWall;
