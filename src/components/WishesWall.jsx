import React, { useState, useEffect, useRef } from 'react';
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

// WishCard Component rendered in the marquee
const WishCard = ({ wish, language, onClick, isClickRef }) => {
  return (
    <div
      className="glass-panel wish-card-item"
      onClick={() => {
        if (isClickRef && isClickRef.current) {
          onClick(wish);
        }
      }}
      style={{
        flex: '0 0 280px',
        width: '280px',
        minHeight: '145px',
        padding: '16px',
        borderTop: '3px solid var(--c-gold)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        pointerEvents: 'auto',
        cursor: 'pointer'
      }}
    >
      <p className="font-secondary" style={{
        color: 'var(--c-text-primary)',
        fontSize: '13.5px',
        lineHeight: '1.45',
        fontStyle: 'italic',
        margin: '0 0 12px 0',
        display: '-webkit-box',
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        "{wish.message}"
      </p>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTop: '1px solid rgba(212,175,55,0.2)',
        paddingTop: '8px',
        marginTop: 'auto'
      }}>
        <span className="font-heading" style={{
          color: 'var(--c-maroon)',
          fontWeight: 'bold',
          fontSize: '11px',
          letterSpacing: '0.5px',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: '160px'
        }}>{wish.name}</span>
        <span className="font-secondary" style={{
          color: 'var(--c-text-secondary)',
          fontSize: '10px'
        }}>{getRelativeTime(wish.timestamp, language)}</span>
      </div>
    </div>
  );
};

const WishesWall = () => {
  const { t, language } = useLanguage();

  const initialWishes = [
    { id: 1, name: t('wish_name_1'), message: t('wish_msg_1'), timestamp: t('time_2_days') },
    { id: 2, name: t('wish_name_2'), message: t('wish_msg_2'), timestamp: t('time_1_week') },
    { id: 3, name: t('wish_name_3'), message: t('wish_msg_3'), timestamp: t('time_2_weeks') },
    { id: 4, name: "Priya & Amit", message: "May your love grow stronger with each passing year! Happy married life.", timestamp: "3 days ago" },
    { id: 5, name: "Dr. Pradeep Agrawal", message: "Lots of love to the most beautiful couple. May God bless your union!", timestamp: "4 days ago" },
    { id: 6, name: "Saurabh", message: "Super excited for the wedding of the year! Congrats guys! #ShivyamKaSangam", timestamp: "5 days ago" },
    { id: 7, name: "Ritu", message: "Wishing you both a journey of love, friendship, and endless laughter.", timestamp: "1 week ago" },
    { id: 8, name: "Aunt & Uncle", message: "May your home be filled with laughter and your hearts with love. Congratulations!", timestamp: "2 weeks ago" }
  ];

  const [allWishes, setAllWishes] = useState(initialWishes);
  const [selectedWish, setSelectedWish] = useState(null);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0); // current translation X in pixels
  const lastInteractionTimeRef = useRef(0);
  const isClickRef = useRef(true);

  // High performance cached dimensions and inertia refs
  const scrollWidthRef = useRef(0);
  const velocityRef = useRef(0);
  const lastMoveTimeRef = useRef(0);
  const lastMoveXRef = useRef(0);
  const inertiaVelocityRef = useRef(0);

  const isConfigured = SCRIPT_URL && SCRIPT_URL !== 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL';

  const fetchWishes = async () => {
    if (!isConfigured) return;
    try {
      const res = await fetch(`${SCRIPT_URL}?action=wishes`);
      const result = await res.json();
      if (result.status === 'success' && Array.isArray(result.data)) {
        setAllWishes(result.data);
      } else {
        console.warn("Spreadsheet backend returned non-success:", result.message);
      }
    } catch (err) {
      console.error("Error fetching wishes from Google Sheet:", err);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  // Update cached scrollWidth safely
  const updateScrollWidth = () => {
    if (scrollRef.current) {
      scrollWidthRef.current = scrollRef.current.scrollWidth;
    }
  };

  useEffect(() => {
    const timer = setTimeout(updateScrollWidth, 150);
    window.addEventListener('resize', updateScrollWidth);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScrollWidth);
    };
  }, [allWishes]);

  // Ultra-smooth, hardware-accelerated GPU translate3d auto-scroll track with inertia drag (paused when off-screen)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || allWishes.length === 0) return;

    let animationFrameId;
    let lastTime = performance.now();
    const scrollSpeed = 75; // px per second
    let isInView = false;
    let observer;
    
    // Set baseline styles
    el.style.transform = `translate3d(0px, 0px, 0px)`;
    el.style.willChange = 'transform';
    currentXRef.current = 0;

    let frameCount = 0;
    let isFirstFrame = true;
    const step = (timestamp) => {
      if (isFirstFrame) {
        lastTime = timestamp;
        isFirstFrame = false;
        animationFrameId = requestAnimationFrame(step);
        return;
      }
      const elapsed = (timestamp - lastTime) / 1000;
      const deltaMs = timestamp - lastTime;
      lastTime = timestamp;

      frameCount++;

      const isThrashing = !scrollWidthRef.current;
      const halfWidth = scrollWidthRef.current / 2 || el.scrollWidth / 2;

      if (frameCount % 60 === 0) {
        const statusStr = isDraggingRef.current ? 'Dragging' : Math.abs(inertiaVelocityRef.current) > 15 ? 'Inertia Glide' : 'Auto Scrolling';
        console.log(
          `%c[WishesWall Loop Tracker]%c Active | TranslateX: %c${currentXRef.current.toFixed(1)}px%c | Frame Time: %c${deltaMs.toFixed(1)}ms (${(1000 / deltaMs).toFixed(0)} FPS)%c | Status: ${statusStr}${isThrashing ? ' | ⚠️ DOM Thrashing' : ''}`,
          'color: #00ff00; font-weight: bold;',
          'color: #fff; background: #333; padding: 2px 5px; border-radius: 3px;',
          'color: #00ff00; font-weight: bold;',
          'color: #fff;',
          'color: #00ffff; font-weight: bold;',
          'color: #fff;'
        );
      }

      // Log frame drops to track movement jitters in browser console (22ms = ~45fps, threshold for visual stutter)
      if (deltaMs > 22) {
        const statusStr = isDraggingRef.current ? 'Dragging' : Math.abs(inertiaVelocityRef.current) > 15 ? 'Inertia Glide' : 'Auto Scrolling';
        console.warn(
          `%c[WishesWall Jitter Tracker] ⚠️ Frame drop detected!%c deltaMs: ${deltaMs.toFixed(1)}ms (${(1000/deltaMs).toFixed(1)} fps) | TranslateX: ${currentXRef.current.toFixed(1)}px | Status: ${statusStr}`,
          'color: #ff3333; font-weight: bold;',
          'color: #ff9999;'
        );
      }

      if (isThrashing && frameCount % 180 === 0) {
        console.warn(
          `%c[WishesWall Loop Tracker] ⚠️ LAYOUT THRASHING WARNING!%c scrollWidthRef.current is 0 or unmeasured. Reading el.scrollWidth from DOM inside rAF loop which triggers style recalculations. Please check why layout dimensions aren't cached.`,
          'color: #ff9900; font-weight: bold;',
          'color: #ffcc66;'
        );
      }

      if (!isDraggingRef.current) {
        if (Math.abs(inertiaVelocityRef.current) > 15) {
          // Inertia momentum scrolling phase
          currentXRef.current += inertiaVelocityRef.current * elapsed;
          // Physics decay formula (friction)
          inertiaVelocityRef.current *= Math.pow(0.93, elapsed * 60);

          // Handle loop boundaries
          if (halfWidth > 0) {
            if (currentXRef.current > 0) {
              currentXRef.current -= halfWidth;
            } else if (currentXRef.current <= -halfWidth) {
              currentXRef.current += halfWidth;
            }
          }
        } else {
          inertiaVelocityRef.current = 0;
          // Auto scrolling phase
          if (Date.now() - lastInteractionTimeRef.current >= 2500) {
            currentXRef.current -= scrollSpeed * elapsed;

            if (halfWidth > 0 && currentXRef.current <= -halfWidth) {
              currentXRef.current += halfWidth;
            }
          }
        }
      }

      // Apply hardware translation directly to DOM (zero React overhead)
      el.style.transform = `translate3d(${currentXRef.current}px, 0px, 0px)`;
      animationFrameId = requestAnimationFrame(step);
    };

    // Touch handlers
    const onTouchStart = (e) => {
      const startX = e.touches[0].clientX;
      isDraggingRef.current = true;
      isClickRef.current = true;
      startXRef.current = startX - currentXRef.current;
      lastInteractionTimeRef.current = Date.now();
      inertiaVelocityRef.current = 0;
      velocityRef.current = 0;
      lastMoveTimeRef.current = performance.now();
      lastMoveXRef.current = startX;
      console.log(`%c[WishesWall Interaction]%c Touch Drag Started | Current TranslateX: ${currentXRef.current.toFixed(1)}px`, 'color: #00ff00; font-weight: bold;', 'color: #00ffff;');
    };

    const onTouchMove = (e) => {
      if (!isDraggingRef.current) return;
      const x = e.touches[0].clientX;
      const deltaX = x - startXRef.current;
      
      // If user drags more than 6px, suppress the click (popup modal)
      if (Math.abs(deltaX - currentXRef.current) > 6) {
        isClickRef.current = false;
      }

      const now = performance.now();
      const dt = now - lastMoveTimeRef.current;
      if (dt > 0) {
        const dx = x - lastMoveXRef.current;
        // Low-pass filter for smooth velocity tracking
        velocityRef.current = velocityRef.current * 0.4 + (dx / dt) * 0.6;
      }
      lastMoveTimeRef.current = now;
      lastMoveXRef.current = x;

      currentXRef.current = deltaX;

      // Handle loop boundary during dragging
      const halfWidth = scrollWidthRef.current / 2 || el.scrollWidth / 2;
      if (halfWidth > 0) {
        if (currentXRef.current > 0) {
          currentXRef.current -= halfWidth;
          startXRef.current += halfWidth;
        } else if (currentXRef.current <= -halfWidth) {
          currentXRef.current += halfWidth;
          startXRef.current -= halfWidth;
        }
      }

      lastInteractionTimeRef.current = Date.now();
    };

    const onTouchEnd = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        const now = performance.now();
        const timeSinceLastMove = now - lastMoveTimeRef.current;
        
        if (timeSinceLastMove < 100) {
          inertiaVelocityRef.current = velocityRef.current * 1000;
          const maxVelocity = 3000;
          if (inertiaVelocityRef.current > maxVelocity) inertiaVelocityRef.current = maxVelocity;
          if (inertiaVelocityRef.current < -maxVelocity) inertiaVelocityRef.current = -maxVelocity;
        } else {
          inertiaVelocityRef.current = 0;
        }
        
        console.log(`%c[WishesWall Interaction]%c Touch Drag Ended | TranslateX: ${currentXRef.current.toFixed(1)}px | Released with velocity: ${inertiaVelocityRef.current.toFixed(1)}px/s`, 'color: #00ff00; font-weight: bold;', 'color: #00ffff;');
        lastInteractionTimeRef.current = Date.now();
        lastTime = performance.now();
      }
    };

    // Mouse handlers
    const onMouseDown = (e) => {
      const startX = e.clientX;
      isDraggingRef.current = true;
      isClickRef.current = true;
      startXRef.current = startX - currentXRef.current;
      lastInteractionTimeRef.current = Date.now();
      inertiaVelocityRef.current = 0;
      velocityRef.current = 0;
      lastMoveTimeRef.current = performance.now();
      lastMoveXRef.current = startX;
      el.style.cursor = 'grabbing';
      console.log(`%c[WishesWall Interaction]%c Mouse Drag Started | Current TranslateX: ${currentXRef.current.toFixed(1)}px`, 'color: #00ff00; font-weight: bold;', 'color: #00ffff;');
    };

    const onMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const x = e.clientX;
      const deltaX = x - startXRef.current;

      if (Math.abs(deltaX - currentXRef.current) > 6) {
        isClickRef.current = false;
      }

      const now = performance.now();
      const dt = now - lastMoveTimeRef.current;
      if (dt > 0) {
        const dx = x - lastMoveXRef.current;
        velocityRef.current = velocityRef.current * 0.4 + (dx / dt) * 0.6;
      }
      lastMoveTimeRef.current = now;
      lastMoveXRef.current = x;

      currentXRef.current = deltaX;

      const halfWidth = scrollWidthRef.current / 2 || el.scrollWidth / 2;
      if (halfWidth > 0) {
        if (currentXRef.current > 0) {
          currentXRef.current -= halfWidth;
          startXRef.current += halfWidth;
        } else if (currentXRef.current <= -halfWidth) {
          currentXRef.current += halfWidth;
          startXRef.current -= halfWidth;
        }
      }

      lastInteractionTimeRef.current = Date.now();
    };

    const onMouseUpOrLeave = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        const now = performance.now();
        const timeSinceLastMove = now - lastMoveTimeRef.current;
        
        if (timeSinceLastMove < 100) {
          inertiaVelocityRef.current = velocityRef.current * 1000;
          const maxVelocity = 3000;
          if (inertiaVelocityRef.current > maxVelocity) inertiaVelocityRef.current = maxVelocity;
          if (inertiaVelocityRef.current < -maxVelocity) inertiaVelocityRef.current = -maxVelocity;
        } else {
          inertiaVelocityRef.current = 0;
        }

        console.log(`%c[WishesWall Interaction]%c Mouse Drag Ended | TranslateX: ${currentXRef.current.toFixed(1)}px | Released with velocity: ${inertiaVelocityRef.current.toFixed(1)}px/s`, 'color: #00ff00; font-weight: bold;', 'color: #00ffff;');
        lastInteractionTimeRef.current = Date.now();
        lastTime = performance.now();
        el.style.cursor = 'grab';
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    el.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUpOrLeave);
    el.addEventListener('mouseleave', onMouseUpOrLeave);

    if (el) {
      observer = new IntersectionObserver(([entry]) => {
        const wasInView = isInView;
        isInView = entry.isIntersecting;
        console.log(`%c[WishesWall Visibility]%c Section is ${isInView ? 'IN' : 'OUT OF'} viewport`, 'color: #00ff00; font-weight: bold;', isInView ? 'color: #00ff00;' : 'color: #ff3333;');
        
        if (isInView && !wasInView) {
          // Start the loop only when entering viewport
          isFirstFrame = true;
          lastTime = performance.now();
          animationFrameId = requestAnimationFrame(step);
        } else if (!isInView && wasInView) {
          // Pause and cancel the loop when leaving viewport
          cancelAnimationFrame(animationFrameId);
        }
      }, { threshold: 0.05 });
      observer.observe(el);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (observer) {
        observer.disconnect();
      }
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
      el.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUpOrLeave);
      el.removeEventListener('mouseleave', onMouseUpOrLeave);
    };
  }, [allWishes]);

  const openPopup = (wish) => {
    console.log(`%c[WishesWall User Action]%c Opened wish card details for: "${wish.name}"`, 'color: #00ff00; font-weight: bold;', 'color: #ff00ff;');
    setSelectedWish(wish);
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    console.log(`%c[WishesWall User Action]%c Closed wish details modal`, 'color: #00ff00; font-weight: bold;', 'color: #ff00ff;');
    setSelectedWish(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedWish) closePopup();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedWish]);

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

      // Optimistic update
      setAllWishes(prev => [newWish, ...prev]);
      
      const submittedName = newName;
      const submittedMessage = newMessage;
      
      setNewName('');
      setNewMessage('');

      if (isConfigured) {
        try {
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

          setTimeout(() => {
            fetchWishes();
          }, 2000);
        } catch (error) {
          console.error("Failed to post wish to Google Sheet:", error);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="wishes" className="section-padding" style={{ backgroundColor: 'var(--c-bg-primary)' }}>
      <style>{`
        .wish-card-item {
          background-color: var(--c-bg-secondary) !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease, box-shadow 0.3s ease;
          will-change: transform;
        }
        .wish-card-item:hover {
          transform: translateY(-4px);
          border-color: var(--c-gold) !important;
          box-shadow: var(--glass-shadow);
        }
      `}</style>

      <div className="container">
        <h2
          className="font-script text-center"
          style={{ fontSize: 'clamp(36px, 8vw, 60px)', color: 'var(--c-gold)', marginBottom: '10px' }}
        >
          {t('wishes_title')}
        </h2>

        <p className="font-secondary text-center" style={{ color: 'var(--c-text-secondary)', marginBottom: 'clamp(25px, 5vw, 40px)' }}>
          {t('wishes_subtitle')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 'clamp(30px, 5vw, 45px)' }}>
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

        {/* Continuous auto-scrolling GPU-marquee which allows native drag/swipe */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
          {allWishes.length === 0 ? (
            <div
              className="glass-panel"
              style={{ padding: '30px', textAlign: 'center', borderTop: '3px solid var(--c-gold)', width: '100%', maxWidth: '600px' }}
            >
              <p className="font-secondary" style={{ color: 'var(--c-text-primary)', fontSize: '16px', fontStyle: 'italic', marginBottom: '0' }}>
                {language === 'hi' ? 'अभी तक कोई शुभकामना नहीं है। सबसे पहले शुभकामना देने वाले बनें!' : 'No blessings yet. Be the first to bless the couple!'}
              </p>
            </div>
          ) : (
            <div 
              style={{ 
                width: '100%', 
                maxWidth: '1000px', 
                overflow: 'hidden',
                position: 'relative',
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                padding: '15px 0 25px 0'
              }}
            >
              <div 
                ref={scrollRef}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row',
                  gap: '16px',
                  width: 'max-content',
                  cursor: 'grab',
                  userSelect: 'none',
                  willChange: 'transform'
                }}
              >
                {/* Original set of cards */}
                {allWishes.map((wish) => (
                  <WishCard key={`orig-${wish.id}`} wish={wish} language={language} onClick={openPopup} isClickRef={isClickRef} />
                ))}
                {/* Duplicated set of cards for seamless wrapping */}
                {allWishes.map((wish) => (
                  <WishCard key={`dup-${wish.id}`} wish={wish} language={language} onClick={openPopup} isClickRef={isClickRef} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Popup for Reading Wish */}
      <AnimatePresence>
        {selectedWish && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                cursor: 'pointer'
              }}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="glass-panel"
              style={{
                position: 'relative',
                width: '90%',
                maxWidth: '450px',
                padding: 'clamp(30px, 6vw, 45px) clamp(20px, 4vw, 35px)',
                background: 'var(--c-bg-primary)',
                border: '2px solid var(--c-gold)',
                boxShadow: '0 20px 50px rgba(90, 0, 0, 0.35)',
                borderRadius: '24px',
                zIndex: 10000,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Corner ornaments */}
              {['tl', 'tr', 'bl', 'br'].map(pos => (
                <span key={pos} style={{
                  position: 'absolute',
                  top: pos.startsWith('t') ? '15px' : 'auto',
                  bottom: pos.startsWith('b') ? '15px' : 'auto',
                  left: pos.endsWith('l') ? '15px' : 'auto',
                  right: pos.endsWith('r') ? '15px' : 'auto',
                  color: 'rgba(212,175,55,0.4)',
                  fontSize: '12px'
                }}>✦</span>
              ))}

              {/* Close Button */}
              <button
                onClick={closePopup}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(212,175,55,0.4)',
                  background: 'rgba(212,175,55,0.1)',
                  color: 'var(--c-gold)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px'
                }}
              >
                ✕
              </button>

              <span style={{ fontSize: '24px', color: 'var(--c-gold)', marginBottom: '15px' }}>🌸</span>

              <p className="font-secondary" style={{
                color: 'var(--c-text-primary)',
                fontSize: 'clamp(15px, 4vw, 18px)',
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '25px',
                whiteSpace: 'pre-wrap'
              }}>
                "{selectedWish.message}"
              </p>

              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, var(--c-gold), transparent)', marginBottom: '15px' }} />

              <span className="font-heading" style={{
                color: 'var(--c-maroon)',
                fontWeight: 'bold',
                fontSize: 'clamp(14px, 3.5vw, 17px)',
                letterSpacing: '1px'
              }}>{selectedWish.name}</span>

              <span className="font-secondary" style={{
                color: 'var(--c-text-secondary)',
                fontSize: '12px',
                marginTop: '5px'
              }}>{getRelativeTime(selectedWish.timestamp, language)}</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WishesWall;
