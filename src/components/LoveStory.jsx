import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import groomProfile from '../assets/groom_profile.png';
import brideProfile from '../assets/bride_profile.png';

const LoveStory = () => {
  const { t } = useLanguage();

  // Floating background decoration hearts
  const decorationHearts = [
    { left: '8%', top: '25%', size: '14px', delay: 0 },
    { right: '6%', top: '42%', size: '18px', delay: 1 },
    { left: '4%', top: '64%', size: '15px', delay: 2 },
    { right: '8%', top: '78%', size: '12px', delay: 0.5 }
  ];

  // Base path variants for drawing animation
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.7,
    }
  };

  // Node fade-in variants
  const nodeVariants = (delay) => ({
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut", delay }
    }
  });

  return (
    <section 
      className="section-padding" 
      style={{ 
        backgroundColor: 'var(--c-bg-primary)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '60px 15px'
      }}
    >
      {/* Title Block */}
      <div style={{ textAlign: 'center', marginBottom: '25px', position: 'relative', zIndex: 5 }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-script"
            style={{ 
              fontSize: 'clamp(48px, 9vw, 68px)', 
              color: 'var(--c-maroon)', 
              lineHeight: 1.1,
              margin: 0
            }}
          >
            {t('our_story')}
          </motion.h2>
          
          {/* Cursive hearts in header like the reference */}
          <div style={{ position: 'absolute', right: '-35px', top: '5px', display: 'flex', gap: '3px' }}>
            <span style={{ color: '#ff4d6d', fontSize: '20px', transform: 'rotate(-15deg)' }}>❤️</span>
            <span style={{ color: '#ff4d6d', fontSize: '13px', transform: 'rotate(10deg)' }}>❤️</span>
          </div>
        </div>
        
        <p className="font-secondary text-center" style={{ 
          color: 'var(--c-text-secondary)', 
          marginTop: '8px', 
          fontSize: 'clamp(14px, 3.5vw, 17px)', 
          maxWidth: '500px', 
          lineHeight: '1.4',
          padding: '0 10px'
        }}>
          A journey of love, laughter, and a promise for a lifetime.
        </p>
      </div>

      {/* Main Single Page Invitation Container (Transparent Wrapper) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          width: '100%',
          maxWidth: '450px',
          aspectRatio: '1 / 1.75', // Symmetrical grid container proportions
          position: 'relative',
          padding: '15px',
          overflow: 'visible', // Allows elements to scale/rotate out of bounds nicely
          display: 'flex',
          flexDirection: 'column',
          zIndex: 2
        }}
      >
        {/* Ambient floating love hearts in background */}
        {decorationHearts.map((heart, idx) => (
          <motion.span
            key={`floating-heart-${idx}`}
            initial={{ opacity: 0.1, y: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1], y: [-5, 5, -5] }}
            transition={{ duration: 4, repeat: Infinity, delay: heart.delay }}
            style={{
              position: 'absolute',
              left: heart.left,
              right: heart.right,
              top: heart.top,
              fontSize: heart.size,
              color: '#ff758f',
              pointerEvents: 'none'
            }}
          >
            ❤️
          </motion.span>
        ))}

        {/* ================= SVG CONNECTOR ROADMAP PATHS ================= */}
        {/* SVG coordinates stretch to match HTML percentages exactly via preserveAspectRatio="none" */}
        <svg 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ 
            position: 'absolute', 
            inset: 0, 
            width: '100%', 
            height: '100%', 
            pointerEvents: 'none', 
            zIndex: 1 
          }}
        >
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--c-gold)" opacity="0.8" />
            </marker>
          </defs>

          {/* ================= STAGGERED SEQUENTIAL PATH ANIMATIONS ================= */}

          {/* Path 1: Shivangi (Bride Center: 25, 17.5) -> First Meet (Top Icon: 50, 23.5) */}
          {/* Phase 1: Starts immediately at 0.2s, finishes drawing at 1.2s */}
          <motion.path
            d="M 25 17.5 C 25 23, 38 23.5, 50 23.5"
            fill="none"
            stroke="var(--c-gold)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Path 2: Satyam (Groom Center: 75, 17.5) -> First Meet (Top Icon: 50, 23.5) */}
          {/* Phase 1: Starts immediately at 0.2s, finishes drawing at 1.2s */}
          <motion.path
            d="M 75 17.5 C 75 23, 62 23.5, 50 23.5"
            fill="none"
            stroke="var(--c-gold)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Path 3: First Meet (Emerges below description: 50, 35.5) -> The Proposal (Left Center: 25, 49) */}
          {/* Phase 2: Starts exactly when Phase 1 ends (at 1.2s), finishes drawing at 2.0s */}
          <motion.path
            d="M 50 35.5 C 50 42, 25 41, 25 49"
            fill="none"
            stroke="var(--c-gold)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            markerEnd="url(#arrow)"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 1.2 }}
          />

          {/* Path 4: The Proposal (Left Center: 25, 49) -> Engagement (Right Center: 75, 60) */}
          {/* Phase 3: Starts exactly when Phase 2 ends (at 2.0s), finishes drawing at 2.8s */}
          <motion.path
            d="M 25 49 C 25 58, 75 51, 75 60"
            fill="none"
            stroke="var(--c-gold)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            markerEnd="url(#arrow)"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 2.0 }}
          />

          {/* Path 5: Engagement (Right Center: 75, 60) -> Wedding (Left Center: 25, 75.5) */}
          {/* Phase 4: Starts exactly when Phase 3 ends (at 2.8s), finishes drawing at 3.6s */}
          <motion.path
            d="M 75 60 C 75 70, 25 65, 25 75.5"
            fill="none"
            stroke="var(--c-gold)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            markerEnd="url(#arrow)"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 2.8 }}
          />

          {/* Path 6: Wedding (Left Center: 25, 75.5) -> To Be Continued (Right Center: 71, 84) */}
          {/* Phase 5: Starts exactly when Phase 4 ends (at 3.6s), finishes drawing at 4.4s */}
          <motion.path
            d="M 25 75.5 C 25 84, 50 84, 71 84"
            fill="none"
            stroke="var(--c-gold)"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            markerEnd="url(#arrow)"
            variants={pathVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 3.6 }}
          />
        </svg>

        {/* ================= ROADMAP NODES ================= */}

        {/* NODE 1: BRIDE (SHIVANGI) - Top Left */}
        <motion.div
          variants={nodeVariants(0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotate: -2, zIndex: 10 }}
          style={{
            position: 'absolute',
            left: '6%',
            top: '6%',
            width: '38%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 3
          }}
        >
          {/* Sketchy circular profile frame */}
          <div style={{
            width: '75%',
            aspectRatio: '1',
            borderRadius: '48% 52% 47% 53% / 53% 47% 53% 47%',
            border: '2px dashed var(--c-gold)',
            padding: '4px',
            backgroundColor: 'var(--c-bg-primary)',
            boxShadow: '0 8px 20px rgba(90, 0, 0, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={brideProfile} 
              alt="Bride Portrait" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '50%',
                filter: 'contrast(1.02) brightness(0.98)'
              }} 
            />
          </div>

          {/* Tiara/Heels Icon Graphic */}
          <span style={{ 
            fontSize: '10px', 
            marginTop: '2px', 
            color: '#ff758f', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '8px'
          }}>
            👑
          </span>

          <span className="font-heading" style={{ fontSize: 'clamp(11px, 3.5vw, 14px)', color: 'var(--c-maroon)', marginTop: '1px', fontWeight: 'bold' }}>
            {t('story_bride_title')}
          </span>
          <span className="font-secondary" style={{ fontSize: 'clamp(8px, 2.5vw, 10px)', color: 'var(--c-text-secondary)', fontStyle: 'italic', lineHeight: 1 }}>
            {t('story_bride_subtitle')}
          </span>
        </motion.div>


        {/* NODE 2: GROOM (SATYAM) - Top Right */}
        <motion.div
          variants={nodeVariants(0.6)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, rotate: 2, zIndex: 10 }}
          style={{
            position: 'absolute',
            right: '6%',
            top: '6%',
            width: '38%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 3
          }}
        >
          {/* Sketchy circular profile frame */}
          <div style={{
            width: '75%',
            aspectRatio: '1',
            borderRadius: '53% 47% 52% 48% / 47% 53% 47% 53%',
            border: '2px dashed var(--c-gold)',
            padding: '4px',
            backgroundColor: 'var(--c-bg-primary)',
            boxShadow: '0 8px 20px rgba(90, 0, 0, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={groomProfile} 
              alt="Groom Portrait" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '50%',
                filter: 'contrast(1.02) brightness(0.98)'
              }} 
            />
          </div>

          {/* Mustache Icon Graphic */}
          <div style={{ 
            marginTop: '2px',
            color: 'var(--c-text-primary)',
            opacity: 0.85,
            height: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg viewBox="0 0 100 100" width="18" height="8" style={{ fill: 'var(--c-text-primary)' }}>
              <path d="M 10,50 C 20,40 35,40 45,50 C 48,52 50,55 50,55 C 50,55 52,52 55,50 C 65,40 80,40 90,50 C 95,55 95,60 90,62 C 80,66 65,60 55,55 C 52,53 50,52 50,52 C 50,52 48,53 45,55 C 35,60 20,66 10,62 C 5,60 5,55 10,50 Z" />
            </svg>
          </div>

          <span className="font-heading" style={{ fontSize: 'clamp(11px, 3.5vw, 14px)', color: 'var(--c-maroon)', marginTop: '1px', fontWeight: 'bold' }}>
            {t('story_groom_title')}
          </span>
          <span className="font-secondary" style={{ fontSize: 'clamp(8px, 2.5vw, 10px)', color: 'var(--c-text-secondary)', fontStyle: 'italic', lineHeight: 1 }}>
            {t('story_groom_subtitle')}
          </span>
        </motion.div>


        {/* NODE 3: FIRST MEET - Middle Center */}
        <motion.div
          variants={nodeVariants(0.8)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            position: 'absolute',
            left: '25%',
            top: '23.5%', 
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            zIndex: 3
          }}
        >
          {/* Sketchy Eye Icon */}
          <div style={{
            fontSize: 'clamp(12px, 3vw, 15px)',
            lineHeight: 1,
            marginBottom: '1px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--c-bg-primary)',
            padding: '2px 6px',
            borderRadius: '50%',
            border: '1px solid rgba(212,175,55,0.2)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
          }}>
            👁️‍🗨️
          </div>
          
          <h4 className="font-heading" style={{ fontSize: 'clamp(11px, 3vw, 13px)', color: 'var(--c-gold)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold', margin: '0 0 1px 0' }}>
            {t('story_1_title')}
          </h4>
          <span className="font-heading" style={{ fontSize: 'clamp(9px, 2.5vw, 10px)', color: 'var(--c-text-secondary)', fontWeight: '600' }}>
            {t('story_1_date')}
          </span>
          <p className="font-secondary" style={{ fontSize: 'clamp(8px, 2.1vw, 9.5px)', color: 'var(--c-text-primary)', maxWidth: '140px', marginTop: '1px', lineHeight: 1.15, opacity: 0.9 }}>
            {t('story_1_desc')}
          </p>
        </motion.div>


        {/* NODE 4: THE PROPOSAL - Left Row 3 */}
        <motion.div
          variants={nodeVariants(1.0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.04, rotate: -1, zIndex: 10 }}
          style={{
            position: 'absolute',
            left: '6%',
            top: '38%', 
            width: '38%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 3
          }}
        >
          {/* Sketchy circular frame with meeting/proposal scene */}
          <div style={{
            width: '75%',
            aspectRatio: '1',
            borderRadius: '51% 49% 53% 47% / 48% 52% 48% 52%',
            border: '2px dashed var(--c-gold)',
            padding: '4px',
            backgroundColor: 'var(--c-bg-primary)',
            boxShadow: '0 8px 20px rgba(90, 0, 0, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={`${import.meta.env.BASE_URL}royal_indian_couple_first_meet_1779894730819.png`} 
              alt="First Meet Scene" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '50%'
              }} 
            />
          </div>

          <span style={{ fontSize: 'clamp(8.5px, 2.5vw, 10px)', color: 'var(--c-text-secondary)', marginTop: '2px', fontWeight: 'bold' }}>
            {t('story_2_date')}
          </span>
          <h4 className="font-heading" style={{ fontSize: 'clamp(11px, 3vw, 13px)', color: 'var(--c-maroon)', fontWeight: 'bold', textAlign: 'center', margin: '0 0 1px 0' }}>
            {t('story_2_title')}
          </h4>
          <p className="font-secondary" style={{ fontSize: 'clamp(8px, 2.1vw, 9.5px)', color: 'var(--c-text-primary)', textAlign: 'center', maxWidth: '120px', lineHeight: 1.15, opacity: 0.9 }}>
            {t('story_2_desc')}
          </p>
        </motion.div>


        {/* NODE 5: ENGAGEMENT - Right Row 3 */}
        <motion.div
          variants={nodeVariants(1.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.04, rotate: 1, zIndex: 10 }}
          style={{
            position: 'absolute',
            right: '6%',
            top: '49%', 
            width: '38%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 3
          }}
        >
          {/* Sketchy circular frame with engagement scene */}
          <div style={{
            width: '75%',
            aspectRatio: '1',
            borderRadius: '49% 51% 48% 52% / 52% 48% 52% 48%',
            border: '2px dashed var(--c-gold)',
            padding: '4px',
            backgroundColor: 'var(--c-bg-primary)',
            boxShadow: '0 8px 20px rgba(90, 0, 0, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={`${import.meta.env.BASE_URL}royal_indian_engagement_1779894748927.png`} 
              alt="Engagement Scene" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '50%'
              }} 
            />
          </div>

          <span style={{ fontSize: 'clamp(8.5px, 2.5vw, 10px)', color: 'var(--c-text-secondary)', marginTop: '2px', fontWeight: 'bold' }}>
            {t('story_3_date')}
          </span>
          <h4 className="font-heading" style={{ fontSize: 'clamp(11px, 3vw, 13px)', color: 'var(--c-maroon)', fontWeight: 'bold', textAlign: 'center', margin: '0 0 1px 0' }}>
            {t('story_3_title')}
          </h4>
          <p className="font-secondary" style={{ fontSize: 'clamp(8px, 2.1vw, 9.5px)', color: 'var(--c-text-primary)', textAlign: 'center', maxWidth: '120px', lineHeight: 1.15, opacity: 0.9 }}>
            {t('story_3_desc')}
          </p>
        </motion.div>


        {/* NODE 6: SHUBH VIVAH (WEDDING) - Left Row 4 */}
        <motion.div
          variants={nodeVariants(1.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          whileHover={{ scale: 1.04, rotate: -1, zIndex: 10 }}
          style={{
            position: 'absolute',
            left: '6%',
            top: '64.5%', 
            width: '38%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 3
          }}
        >
          {/* Sketchy circular frame with wedding venue scene */}
          <div style={{
            width: '75%',
            aspectRatio: '1',
            borderRadius: '52% 48% 50% 50% / 47% 53% 47% 53%',
            border: '2px dashed var(--c-gold)',
            padding: '4px',
            backgroundColor: 'var(--c-bg-primary)',
            boxShadow: '0 8px 20px rgba(90, 0, 0, 0.08)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <img 
              src={`${import.meta.env.BASE_URL}royal_indian_wedding_venue_1779894764907.png`} 
              alt="Wedding Mandap Scene" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '50%'
              }} 
            />
          </div>

          <span style={{ fontSize: 'clamp(8.5px, 2.5vw, 10px)', color: 'var(--c-text-secondary)', marginTop: '2px', fontWeight: 'bold' }}>
            {t('story_wedding_date')}
          </span>
          <h4 className="font-heading" style={{ fontSize: 'clamp(11px, 3vw, 13px)', color: 'var(--c-maroon)', fontWeight: 'bold', textAlign: 'center', margin: '0 0 1px 0' }}>
            {t('story_wedding_title')}
          </h4>
          <p className="font-secondary" style={{ fontSize: 'clamp(8px, 2.1vw, 9.5px)', color: 'var(--c-text-primary)', textAlign: 'center', maxWidth: '120px', lineHeight: 1.15, opacity: 0.9 }}>
            {t('story_wedding_desc')}
          </p>
        </motion.div>


        {/* NODE 7: TO BE CONTINUED... - Bottom Right */}
        <motion.div
          variants={nodeVariants(1.6)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            position: 'absolute',
            right: '8%',
            top: '80%', 
            width: '38%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3
          }}
        >
          {/* Custom sketched sticker for "To Be Continued" */}
          <div style={{
            backgroundColor: 'var(--c-bg-primary)',
            padding: '5px 10px',
            borderRadius: '16px',
            border: '1.5px dashed var(--c-gold)',
            boxShadow: '0 6px 15px rgba(90, 0, 0, 0.05)',
            transform: 'rotate(2deg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1px',
            maxWidth: '120px'
          }}>
            <span style={{ fontSize: 'clamp(10px, 3vw, 13px)', color: '#ff4d6d' }}>💖</span>
            <span 
              className="font-script" 
              style={{ 
                fontSize: 'clamp(14px, 4vw, 19px)', 
                color: 'var(--c-maroon)', 
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                lineHeight: 0.9,
                margin: 0
              }}
            >
              {t('story_continued')}
            </span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default LoveStory;
