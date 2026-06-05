import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
// Use new profile images from `src/assets/real/`
const brideProfile = new URL('../assets/real/Shivangi.jpeg', import.meta.url).href;
const groomProfile = new URL('../assets/real/Satyam.jpeg', import.meta.url).href;

const LoveStory = () => {
  const { t } = useLanguage();
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.05 });
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.55, delay }
  });

  const events = [
    { key: 'proposal',   date: t('story_2_date'), title: t('story_2_title'), desc: t('story_2_desc'), image: new URL('../assets/real/IMG_7196.JPG.jpeg', import.meta.url).href, side: 'left'  },
    { key: 'longdrive',  date: t('story_3_date'), title: t('story_3_title'), desc: t('story_3_desc'), image: new URL('../assets/real/IMG_7197.JPG.jpeg', import.meta.url).href,                                                                                    side: 'right' },
    { key: 'engagement', date: t('story_4_date'), title: t('story_4_title'), desc: t('story_4_desc'), image: new URL('../assets/real/IMG_7285.JPG.jpeg', import.meta.url).href,                  side: 'left'  },
    { key: 'datenight',  date: t('story_5_date'), title: t('story_5_title'), desc: t('story_5_desc'), image: new URL('../assets/real/IMG_7484.JPG.jpeg', import.meta.url).href,                                                                                    side: 'right' },
    { key: 'wedding',    date: t('story_wedding_date'), title: t('story_wedding_title'), desc: t('story_wedding_desc'), image: new URL('../assets/real/IMG_7189.JPG.jpeg', import.meta.url).href, side: 'left'  },
  ];

  const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' };

  const makeCircle = (extra = {}) => ({
    width: 'clamp(76px, 19vw, 100px)',
    height: 'clamp(76px, 19vw, 100px)',
    borderRadius: '50%',
    border: '2px dashed var(--c-gold)',
    padding: '4px',
    backgroundColor: 'var(--c-bg-primary)',
    boxShadow: '0 6px 20px rgba(90,0,0,0.1)',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '28px',
    ...extra
  });

  const dot = {
    width: '13px',
    height: '13px',
    borderRadius: '50%',
    background: 'var(--c-maroon)',
    border: '2.5px solid var(--c-gold)',
    boxShadow: '0 0 10px rgba(212,175,55,0.5)',
    flexShrink: 0,
    zIndex: 3
  };

  /*
   * Road layout: dots alternate at 42% (left events) and 58% (right events).
   * The SVG S-curve path passes through each dot position, creating a winding road.
   *
   *  Left  dot x = 42%    Right dot x = 58%
   *
   *  Content column width for both sides = calc(42% - 8px) ≈ symmetrical
   */
  const LEFT_PCT  = 42;  // dot x% for left events
  const RIGHT_PCT = 58;  // dot x% for right events

  // EventCard — circle image/emoji + text, centred
  const EventCard = ({ ev }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', width: '100%' }}>
      <div style={makeCircle()}>
        {ev.image
          ? <img src={ev.image} alt={ev.title} style={imgStyle} />
          : ev.emoji
        }
      </div>
      <div style={{ marginTop: '7px', width: '100%' }}>
        <span style={{ display: 'block', fontSize: 'clamp(9px, 2.3vw, 11px)', color: 'var(--c-text-secondary)', fontWeight: '600', fontFamily: 'var(--font-heading)', marginBottom: '2px' }}>
          {ev.date}
        </span>
        <h4 className="font-heading" style={{ fontSize: 'clamp(11px, 2.8vw, 14px)', color: 'var(--c-maroon)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 4px', lineHeight: 1.2 }}>
          {ev.title}
        </h4>
        <p className="font-secondary" style={{ fontSize: 'clamp(9px, 2.3vw, 11px)', color: 'var(--c-text-primary)', lineHeight: 1.4, margin: 0, opacity: 0.85 }}>
          {ev.desc}
        </p>
      </div>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="section-padding"
      style={{ background: 'var(--c-bg-primary)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden', padding: '60px 16px 80px' }}
    >
      {/* Floating hearts */}
      {isInView && !isMobile && [
        { left: '6%',  top: '22%', size: '14px', delay: 0   },
        { right: '5%', top: '44%', size: '18px', delay: 1.2 },
        { left: '4%',  top: '66%', size: '13px', delay: 2.1 },
        { right: '7%', top: '82%', size: '12px', delay: 0.6 },
      ].map((h, i) => (
        <motion.span key={i} initial={{ opacity: 0.1, y: 0 }} animate={{ opacity: [0.1, 0.3, 0.1], y: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity, delay: h.delay }}
          style={{ position: 'absolute', left: h.left, right: h.right, top: h.top, fontSize: h.size, color: '#ff758f', pointerEvents: 'none' }}>❤️</motion.span>
      ))}

      {/* ── Section title ── */}
      <div style={{ textAlign: 'center', marginBottom: '36px', position: 'relative', zIndex: 5 }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <motion.h2 {...fadeIn(0)} className="font-script"
            style={{ fontSize: 'clamp(44px, 9vw, 66px)', color: 'var(--c-maroon)', lineHeight: 1.1, margin: 0 }}>
            {t('our_story')}
          </motion.h2>
          <div style={{ position: 'absolute', right: '-34px', top: '6px', display: 'flex', gap: '3px' }}>
            <span style={{ color: '#ff4d6d', fontSize: '20px', transform: 'rotate(-15deg)' }}>❤️</span>
            <span style={{ color: '#ff4d6d', fontSize: '13px', transform: 'rotate(10deg)' }}>❤️</span>
          </div>
        </div>
        <p className="font-secondary text-center"
          style={{ color: 'var(--c-text-secondary)', marginTop: '8px', fontSize: 'clamp(14px, 3.5vw, 17px)', maxWidth: '500px', lineHeight: '1.4', padding: '0 10px' }}>
          A journey of love, laughter, and a promise for a lifetime.
        </p>
      </div>

      {/* ── Main column ── */}
      <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>

        {/* ── Profiles row ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          {/* Bride */}
          <motion.div {...fadeIn(0.2)} style={{ width: '44%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={makeCircle({ borderRadius: '48% 52% 47% 53% / 53% 47% 53% 47%' })}>
              <img src={brideProfile} alt="Bride" style={imgStyle} />
            </div>
            <span style={{ fontSize: '10px', color: '#ff758f', marginTop: '3px' }}>👑</span>
            <span className="font-heading" style={{ fontSize: 'clamp(12px, 3.5vw, 15px)', color: 'var(--c-maroon)', fontWeight: 'bold', marginTop: '1px' }}>{t('story_bride_title')}</span>
            <span className="font-secondary" style={{ fontSize: 'clamp(9px, 2.5vw, 11px)', color: 'var(--c-text-secondary)', fontStyle: 'italic' }}>{t('story_bride_subtitle')}</span>
          </motion.div>

          {/* Groom */}
          <motion.div {...fadeIn(0.4)} style={{ width: '44%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={makeCircle({ borderRadius: '53% 47% 52% 48% / 47% 53% 47% 53%' })}>
              <img src={groomProfile} alt="Groom" style={imgStyle} />
            </div>
            <div style={{ height: '13px', marginTop: '3px', display: 'flex', alignItems: 'center' }}>
              <svg viewBox="0 0 100 100" width="20" height="8" style={{ fill: 'var(--c-text-primary)', opacity: 0.8 }}>
                <path d="M 10,50 C 20,40 35,40 45,50 C 48,52 50,55 50,55 C 50,55 52,52 55,50 C 65,40 80,40 90,50 C 95,55 95,60 90,62 C 80,66 65,60 55,55 C 52,53 50,52 50,52 C 50,52 48,53 45,55 C 35,60 20,66 10,62 C 5,60 5,55 10,50 Z" />
              </svg>
            </div>
            <span className="font-heading" style={{ fontSize: 'clamp(12px, 3.5vw, 15px)', color: 'var(--c-maroon)', fontWeight: 'bold', marginTop: '1px' }}>{t('story_groom_title')}</span>
            <span className="font-secondary" style={{ fontSize: 'clamp(9px, 2.5vw, 11px)', color: 'var(--c-text-secondary)', fontStyle: 'italic' }}>{t('story_groom_subtitle')}</span>
          </motion.div>
        </div>

        {/* ── V-connector: both profiles → First Meet ── */}
        <svg width="100%" height="44" viewBox="0 0 480 44" preserveAspectRatio="none" style={{ display: 'block' }}>
          <motion.line x1="106" y1="0" x2="240" y2="44" stroke="var(--c-gold)" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.7"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.55 }} />
          <motion.line x1="374" y1="0" x2="240" y2="44" stroke="var(--c-gold)" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.7"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.65, delay: 0.55 }} />
        </svg>

        {/* ── First Meet — centred ── */}
        <motion.div {...fadeIn(0.9)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2px 0 22px', width: '100%' }}>
          <div style={{ fontSize: 'clamp(18px, 4.5vw, 24px)', background: 'var(--c-bg-primary)', padding: '6px 8px', borderRadius: '50%', border: '1px solid rgba(212,175,55,0.35)', marginBottom: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}>
            👁️‍🗨️
          </div>
          <h4 className="font-heading" style={{ fontSize: 'clamp(13px, 3.5vw, 16px)', color: 'var(--c-gold)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 3px' }}>
            {t('story_1_title')}
          </h4>
          <span className="font-heading" style={{ fontSize: 'clamp(9px, 2.5vw, 11px)', color: 'var(--c-text-secondary)', fontWeight: '600', display: 'block', marginBottom: '4px' }}>
            {t('story_1_date')}
          </span>
          <p className="font-secondary" style={{ fontSize: 'clamp(10px, 2.8vw, 12px)', color: 'var(--c-text-primary)', maxWidth: '220px', lineHeight: 1.45, margin: 0, opacity: 0.88 }}>
            {t('story_1_desc')}
          </p>
        </motion.div>

        {/* ════════════════════════════════════════════════
            WINDING ROAD TIMELINE
            Dots alternate: LEFT events at x=42%, RIGHT events at x=58%
            SVG S-curve passes through each dot → road-map feel
           ════════════════════════════════════════════════ */}
        <div style={{ position: 'relative', width: '100%' }}>

          {/*
            SVG "road" — winding S-curve path.
            viewBox 0 0 100 100, preserveAspectRatio="none" (stretches to container size).

            Approximate dot Y positions (% of timeline div height):
              Event 1 left  → y ≈ 9%
              Event 2 right → y ≈ 26%
              Event 3 left  → y ≈ 44%
              Event 4 right → y ≈ 62%
              Event 5 left  → y ≈ 80%
              To-be-cont.   → y ≈ 96%

            Path description:
            Start at (50,0) [from First Meet centre]
            → curve to (42, 9)  [left dot 1]
            → S to (58, 26)     [right dot 2]
            → S to (42, 44)     [left dot 3]
            → S to (58, 62)     [right dot 4]
            → S to (42, 80)     [left dot 5]
            → S to (58, 96)     [right – To Be Continued]
          */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'visible' }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d={`
                M 50 0
                C 50 3, ${LEFT_PCT} 5, ${LEFT_PCT} 9
                C ${LEFT_PCT} 14, ${RIGHT_PCT} 20, ${RIGHT_PCT} 26
                C ${RIGHT_PCT} 32, ${LEFT_PCT} 38, ${LEFT_PCT} 44
                C ${LEFT_PCT} 50, ${RIGHT_PCT} 56, ${RIGHT_PCT} 62
                C ${RIGHT_PCT} 68, ${LEFT_PCT} 74, ${LEFT_PCT} 80
                C ${LEFT_PCT} 86, ${RIGHT_PCT} 92, ${RIGHT_PCT} 96
                L ${RIGHT_PCT} 100
              `}
              fill="none"
              stroke="var(--c-gold)"
              strokeWidth="2.5"
              strokeDasharray="6,5"
              opacity="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true }}
              transition={{ duration: 4.5, ease: 'easeInOut', delay: 0.6 }}
            />
          </svg>

          {/* ── Event rows ── */}
          {events.map((ev, idx) => {
            const isLeft = ev.side === 'left';
            const dotXpct = isLeft ? LEFT_PCT : RIGHT_PCT;
            // Gap each side of the 16px dot column
            const leftColW  = `calc(${dotXpct}% - 8px)`;
            const rightColW = `calc(${100 - dotXpct}% - 8px)`;

            return (
              <motion.div
                key={ev.key}
                {...fadeIn(1.0 + idx * 0.22)}
                style={{ display: 'flex', alignItems: 'flex-start', width: '100%', marginBottom: '22px', position: 'relative', zIndex: 1 }}
              >
                {/* LEFT column */}
                <div style={{ width: leftColW, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: isLeft ? '6px' : 0 }}>
                  {isLeft && <EventCard ev={ev} />}
                </div>

                {/* Centre dot (16 px) — floated at the correct x% */}
                <div style={{ width: '16px', flexShrink: 0, display: 'flex', justifyContent: 'center',
                              paddingTop: 'clamp(26px, 6.5vw, 36px)', position: 'relative', zIndex: 3 }}>
                  <motion.div
                    style={dot}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 1.1 + idx * 0.22 }}
                  />
                </div>

                {/* RIGHT column */}
                <div style={{ width: rightColW, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: !isLeft ? '6px' : 0 }}>
                  {!isLeft && <EventCard ev={ev} />}
                </div>
              </motion.div>
            );
          })}

          {/* ── To Be Continued (right side — matches right dot x) ── */}
          <motion.div {...fadeIn(2.2)} style={{ display: 'flex', alignItems: 'flex-start', width: '100%', position: 'relative', zIndex: 1, paddingBottom: '8px' }}>
            {/* Empty left = RIGHT_PCT% - 8px */}
            <div style={{ width: `calc(${RIGHT_PCT}% - 8px)` }} />
            {/* Dot */}
            <div style={{ width: '16px', flexShrink: 0, display: 'flex', justifyContent: 'center', paddingTop: '8px', zIndex: 3 }}>
              <motion.div style={dot}
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 2.3 }} />
            </div>
            {/* Tag */}
            <div style={{ flex: 1, paddingLeft: '8px' }}>
              <div style={{ backgroundColor: 'var(--c-bg-primary)', padding: '6px 10px', borderRadius: '14px', border: '1.5px dashed var(--c-gold)', transform: 'rotate(2deg)', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '2px', boxShadow: '0 4px 12px rgba(90,0,0,0.06)' }}>
                <span style={{ fontSize: '12px', color: '#ff4d6d' }}>💖</span>
                <span className="font-script" style={{ fontSize: 'clamp(13px, 3.5vw, 17px)', color: 'var(--c-maroon)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  {t('story_continued')}
                </span>
              </div>
            </div>
          </motion.div>

        </div>{/* /winding road timeline */}
      </div>{/* /main column */}
    </section>
  );
};

export default LoveStory;
