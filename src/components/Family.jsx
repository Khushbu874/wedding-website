import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';

// Import personalized cartoon avatars generated for this wedding
import avatarGrandparents from '../assets/avatar_grandparents.png';
import avatarParentsBride from '../assets/avatar_parents_bride.png';
import avatarParentsGroom from '../assets/avatar_parents_groom.png';
import avatarAuntUncle from '../assets/avatar_aunt_uncle.png';
import avatarCousinCouple from '../assets/avatar_cousin_couple.png';
import avatarSingleMale from '../assets/avatar_single_male.png';
import avatarSingleFemale from '../assets/avatar_single_female.png';

const Family = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('bride');
  const [displayTab, setDisplayTab] = useState('bride');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [popupCard, setPopupCard] = useState(null);

  const families = {
    bride: {
      side: t('bride_family_title'),
      members: [
        { name: t('bride_gparents'), relation: t('relation_grandparents'), relKey: 'grandparents' },
        { name: t('bride_parents'), relation: t('relation_parents'), relKey: 'parents' },
        { name: t('bride_couple_1'), relation: t('relation_aunt_uncle'), relKey: 'aunt_uncle' },
        { name: t('bride_couple_2'), relation: t('relation_aunt_uncle'), relKey: 'aunt_uncle' },
        { name: t('bride_couple_3'), relation: t('relation_aunt_uncle'), relKey: 'aunt_uncle' }
      ]
    },
    groom: {
      side: t('groom_family_title'),
      members: [
        { name: t('groom_gparents'), relation: t('relation_grandparents'), relKey: 'grandparents' },
        { name: t('groom_parents'), relation: t('relation_parents'), relKey: 'parents' },
        { name: t('groom_couple_1'), relation: t('relation_aunt_uncle'), relKey: 'aunt_uncle' },
        { name: t('groom_couple_2'), relation: t('relation_aunt_uncle'), relKey: 'aunt_uncle' },
        { name: t('groom_couple_3'), relation: t('relation_aunt_uncle'), relKey: 'aunt_uncle' },
        { name: t('groom_couple_4'), relation: t('relation_aunt_uncle'), relKey: 'aunt_uncle' }
      ]
    }
  };

  const getFamilyAvatar = (relKey, name) => {
    const isCouple = name.includes('&') || name.includes('एवं');

    if (relKey === 'grandparents') return avatarGrandparents;

    if (relKey === 'parents') {
      return displayTab === 'bride' ? avatarParentsBride : avatarParentsGroom;
    }

    if (relKey === 'cousin_couple' || (isCouple && relKey === 'awaiting')) {
      return avatarCousinCouple;
    }

    if (relKey === 'cousin_single' || (!isCouple && relKey === 'awaiting')) {
      const cleanName = name.toLowerCase().trim();
      const maleNames = ['saubhagya', 'सौभाग्य', 'vikash', 'विकास', 'gaurav', 'गौरव', 'vikki', 'विक्की', 'aman', 'अमन', 'yash', 'यश'];
      const isMale = maleNames.some(n => cleanName.includes(n));
      const isFemale = !isMale && (cleanName.includes('muskan') || cleanName.includes('मुस्कान'));
      return isFemale ? avatarSingleFemale : avatarSingleMale;
    }

    if (isCouple) return avatarAuntUncle;

    const cleanName = name.toLowerCase().trim();
    const isFemale = cleanName.includes('muskan') || cleanName.includes('मुस्कान');
    return isFemale ? avatarSingleFemale : avatarSingleMale;
  };

  const renderName = (name, isLarge = false) => {
    let parts = [];
    let connector = '';
    if (name.includes(' & ')) { parts = name.split(' & '); connector = '&'; }
    else if (name.includes(' एवं ')) { parts = name.split(' एवं '); connector = 'एवं'; }

    if (parts.length === 2) {
      const isHindi = connector === 'एवं';
      return (
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ display: 'block', textWrap: 'balance' }}>{parts[0]}</span>
          <span
            className={isHindi ? 'font-secondary' : 'font-script'}
            style={{
              display: 'block',
              fontSize: isLarge
                ? (isHindi ? 'clamp(15px, 3vw, 20px)' : 'clamp(26px, 5vw, 34px)')
                : (isHindi ? 'clamp(13px, 2.5vw, 16px)' : 'clamp(20px, 3.8vw, 24px)'),
              color: 'var(--c-gold)',
              margin: isHindi ? '2px 0' : '-6px 0 -4px 0',
              fontWeight: isHindi ? '600' : '400',
              fontStyle: isHindi ? 'italic' : 'normal',
              opacity: 0.9,
              textTransform: 'none'
            }}
          >
            {connector}
          </span>
          <span style={{ display: 'block', textWrap: 'balance' }}>{parts[1]}</span>
        </span>
      );
    }
    return name;
  };

  const handleTabChange = (tab) => {
    if (tab === activeTab || isFlipping) return;
    setActiveTab(tab);
    setIsFlipped(true);
    setIsFlipping(true);
    setTimeout(() => { setDisplayTab(tab); setIsFlipped(false); }, 350);
    setTimeout(() => { setIsFlipping(false); }, 770);
  };

  const openPopup = (name, relation, relKey, avatar) => {
    setPopupCard({ name, relation, relKey, avatar });
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    setPopupCard(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape' && popupCard) closePopup(); };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [popupCard]);

  // The Portal modal — rendered at document.body level so parent overflow/transforms can't clip it
  const PopupPortal = () => ReactDOM.createPortal(
    <AnimatePresence>
      {popupCard && (
        <>
          {/* Backdrop */}
          <motion.div
            key="popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={closePopup}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              zIndex: 9000,
              cursor: 'pointer'
            }}
          />

          {/* Centering wrapper — pure CSS flex so no transform math needed */}
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            pointerEvents: 'none'
          }}>
            {/* Modal */}
            <motion.div
              key="popup-modal"
              initial={{ opacity: 0, scale: 0.78 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.82 }}
              transition={{ type: 'spring', stiffness: 340, damping: 28 }}
              style={{
                pointerEvents: 'all',
                background: 'var(--c-bg-primary, #120a0a)',
                border: '1px solid rgba(212,175,55,0.5)',
                borderRadius: '28px',
                padding: 'clamp(40px,6vw,56px) clamp(28px,5vw,48px) clamp(28px,5vw,40px)',
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                boxShadow: '0 30px 80px rgba(0,0,0,0.55), 0 0 60px rgba(212,175,55,0.08), inset 0 1px 0 rgba(255,255,255,0.07)',
                WebkitFontSmoothing: 'antialiased',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Shine */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 100%)',
                borderRadius: '28px 28px 0 0', pointerEvents: 'none'
              }} />

              {/* Corner ornaments */}
              {['tl', 'tr', 'bl', 'br'].map(pos => (
                <span key={pos} style={{
                  position: 'absolute',
                  top: pos.startsWith('t') ? '14px' : 'auto',
                  bottom: pos.startsWith('b') ? '14px' : 'auto',
                  left: pos.endsWith('l') ? '18px' : 'auto',
                  right: pos.endsWith('r') ? '18px' : 'auto',
                  color: 'rgba(212,175,55,0.25)',
                  fontSize: '11px'
                }}>✦</span>
              ))}

              {/* Close button */}
              <button
                onClick={closePopup}
                aria-label="Close"
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '16px',
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  border: '1px solid rgba(212,175,55,0.4)',
                  background: 'rgba(212,175,55,0.1)',
                  color: 'var(--c-gold)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s ease',
                  zIndex: 10,
                  lineHeight: 1
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--c-maroon)';
                  e.currentTarget.style.borderColor = 'var(--c-maroon)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(212,175,55,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)';
                  e.currentTarget.style.color = 'var(--c-gold)';
                  e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                }}
              >
                ✕
              </button>

              {/* Large Avatar */}
              <div style={{
                width: '140px', height: '140px', borderRadius: '50%',
                border: '2px solid var(--c-gold)', padding: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 70%)',
                boxShadow: '0 0 40px rgba(212,175,55,0.25), 0 8px 30px rgba(0,0,0,0.3)',
                animation: 'popup-pulse 2.5s ease-in-out infinite'
              }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  border: '2px solid rgba(212,175,55,0.65)', overflow: 'hidden',
                  background: 'radial-gradient(circle, rgba(90,0,0,0.04) 0%, rgba(0,0,0,0.3) 100%)'
                }}>
                  <img
                    src={popupCard.avatar}
                    alt={popupCard.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>
              </div>

              {/* Gold divider */}
              <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, var(--c-gold), transparent)', margin: '20px auto 14px' }} />

              {/* Relation badge */}
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(10px, 2.5vw, 12px)',
                color: 'var(--c-gold)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: '600',
                display: 'block',
                marginBottom: '10px'
              }}>
                ✦ {popupCard.relation} ✦
              </span>

              {/* Name */}
              <p style={{
                fontFamily: 'var(--font-primary)',
                fontSize: 'clamp(16px, 4vw, 22px)',
                color: 'var(--c-maroon)',
                fontWeight: '700',
                margin: '0',
                lineHeight: '1.45',
                letterSpacing: '0.3px'
              }} className="font-primary popup-name-text">
                {renderName(popupCard.name, true)}
              </p>

              {/* Bottom divider */}
              <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, var(--c-gold), transparent)', margin: '22px auto 0' }} />

              {/* Blessing */}
              <p className="font-script" style={{ fontSize: 'clamp(18px, 4.5vw, 24px)', color: 'var(--c-gold)', margin: '8px 0 0', opacity: 0.75 }}>
                With Love & Blessings 🌸
              </p>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );

  return (
    <>
      <section
        className="section-padding"
        style={{
          background: 'var(--c-bg-primary)',
          overflow: 'hidden',
          position: 'relative',
          paddingTop: 'clamp(60px, 8vh, 100px)',
          paddingBottom: 'clamp(60px, 8vh, 100px)'
        }}
      >
        {/* Decorative Radial Background */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: 'clamp(300px, 60vw, 600px)', height: 'clamp(300px, 60vw, 600px)',
          background: activeTab === 'groom'
            ? 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, rgba(0,0,0,0) 70%)'
            : 'radial-gradient(circle, rgba(90,0,0,0.06) 0%, rgba(0,0,0,0) 70%)',
          pointerEvents: 'none', zIndex: 1, transition: 'background 0.8s ease'
        }} />

        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-script text-center"
            style={{ fontSize: 'clamp(38px, 8vw, 64px)', color: 'var(--c-maroon)', marginBottom: '5px' }}
          >
            {t('family')}
          </motion.h2>

          <div style={{ height: '2px', width: '80px', background: 'linear-gradient(90deg, transparent, var(--c-gold), transparent)', marginBottom: '35px' }} />

          {/* Capsule Tab Selector — Wedding Theme Styled */}
          <div style={{
            display: 'inline-flex',
            background: 'linear-gradient(135deg, rgba(90,0,0,0.08) 0%, rgba(212,175,55,0.06) 100%)',
            border: '1.5px solid rgba(212,175,55,0.45)',
            borderRadius: '50px',
            padding: '5px',
            gap: '3px',
            marginBottom: '40px',
            boxShadow: '0 4px 24px rgba(90,0,0,0.12), inset 0 1px 0 rgba(212,175,55,0.15)',
            position: 'relative',
            zIndex: 10,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}>
            {['bride', 'groom'].map(tab => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                style={{
                  padding: '11px clamp(20px, 4vw, 34px)',
                  borderRadius: '40px',
                  border: activeTab === tab ? '1px solid rgba(212,175,55,0.5)' : '1px solid transparent',
                  background: activeTab === tab
                    ? 'linear-gradient(135deg, var(--c-maroon, #5a0000) 0%, #7a1010 100%)'
                    : 'transparent',
                  color: activeTab === tab ? '#ffffff' : 'var(--c-maroon, #5a0000)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(11px, 2.5vw, 13px)',
                  fontWeight: '700',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  outline: 'none',
                  boxShadow: activeTab === tab
                    ? '0 4px 18px rgba(90,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : 'none',
                  textShadow: activeTab === tab ? '0 1px 4px rgba(0,0,0,0.3)' : 'none'
                }}
              >
                {tab === 'bride' ? t('bride_family_title') : t('groom_family_title')}
              </button>
            ))}
          </div>

          {/* 3D Flip Container */}
          <div style={{ width: '100%', perspective: isFlipping ? '2000px' : 'none' }}>
            <div style={{
              width: '100%',
              transform: isFlipped ? 'rotateY(90deg) scale(0.96)' : 'rotateY(0deg)',
              transition: isFlipped
                ? 'transform 0.35s cubic-bezier(0.55, 0.055, 0.675, 0.19)'
                : 'transform 0.42s cubic-bezier(0.215, 0.61, 0.355, 1)',
              transformStyle: isFlipping ? 'preserve-3d' : 'flat'
            }}>

              {/* Main Family Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '16px',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 16px'
              }} className="family-grid-resp">
                {families[displayTab].members.map((member, index) => {
                  const avatar = getFamilyAvatar(member.relKey, member.name);
                  return (
                    <motion.div
                      key={`${displayTab}-${index}`}
                      initial={{ opacity: 0, y: 35 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.5 }}
                      onClick={() => openPopup(member.name, member.relation, member.relKey, avatar)}
                      className="family-card-item"
                      style={{
                        position: 'relative',
                        background: 'var(--glass-bg)',
                        border: '1px solid var(--glass-border)',
                        boxShadow: 'var(--glass-shadow)',
                        borderRadius: '20px',
                        padding: '24px 16px 16px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        WebkitFontSmoothing: 'antialiased',
                        transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
                      }}
                    >
                      {/* Shine */}
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%)', pointerEvents: 'none' }} />

                      {/* Avatar ring */}
                      <div style={{
                        width: '90px', height: '90px', borderRadius: '50%',
                        border: '1px solid var(--c-gold)', padding: '4px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 70%)',
                        marginBottom: '16px', transition: 'all 0.4s ease'
                      }}>
                        <div style={{
                          width: '100%', height: '100%', borderRadius: '50%',
                          border: '1.5px solid var(--c-gold)', overflow: 'hidden',
                          background: 'radial-gradient(circle, rgba(90,0,0,0.05) 0%, rgba(0,0,0,0.4) 100%)',
                          boxShadow: '0 4px 15px rgba(212,175,55,0.15)'
                        }}>
                          <img src={avatar} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>
                      </div>

                      {/* Relation badge */}
                      <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(9px, 2vw, 11px)',
                        color: 'var(--c-gold)',
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        marginBottom: '12px',
                        display: 'block'
                      }}>✦ {member.relation} ✦</span>

                      {/* Name */}
                      <p className="font-primary family-name-text" style={{
                        fontSize: 'clamp(13px, 2.3vw, 16px)',
                        color: 'var(--c-maroon)',
                        fontWeight: '700',
                        margin: '0',
                        lineHeight: '1.4',
                        letterSpacing: '0.3px',
                        zIndex: 2
                      }}>
                        {renderName(member.name)}
                      </p>

                      <span style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '10px',
                        color: 'var(--c-gold)',
                        letterSpacing: '1px',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        marginTop: '8px',
                        textTransform: 'uppercase'
                      }} className="card-tap-hint">Tap to view ›</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Awaiting to Welcome Header */}
              <div style={{ textAlign: 'center', marginTop: '70px', marginBottom: '30px', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                  <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, var(--c-gold))' }} />
                  <h4 className="font-heading" style={{ fontSize: 'clamp(18px, 4vw, 24px)', letterSpacing: '2px', margin: 0, color: 'var(--c-gold)', fontWeight: '600' }}>
                    ✦ {t('relation_awaiting')} ✦
                  </h4>
                  <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, var(--c-gold), transparent)' }} />
                </div>
              </div>

              {/* Awaiting Grid */}
              <div className="awaiting-grid-resp" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 16px'
              }}>
                {t(displayTab === 'bride' ? 'bride_awaiting' : 'groom_awaiting').map((name, index) => {
                  const isCouple = name.includes('&') || name.includes('एवं');
                  const avatar = getFamilyAvatar(isCouple ? 'cousin_couple' : 'cousin_single', name);
                  const relation = isCouple ? t('relation_aunt_uncle') : t('relation_awaiting');
                  return (
                    <motion.div
                      key={`${displayTab}-awaiting-${index}`}
                      initial={{ opacity: 0, scale: 0.9, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.03, duration: 0.4 }}
                      onClick={() => openPopup(name, relation, isCouple ? 'cousin_couple' : 'cousin_single', avatar)}
                      className="awaiting-card-item"
                      style={{
                        position: 'relative',
                        background: 'var(--glass-bg)',
                        border: '1px solid rgba(212,175,55,0.15)',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                        borderRadius: '16px',
                        padding: '16px 12px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        minHeight: '130px',
                        transition: 'all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1)',
                        WebkitFontSmoothing: 'antialiased'
                      }}
                    >
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)', pointerEvents: 'none' }} />

                      <div style={{
                        width: '56px', height: '56px', borderRadius: '50%',
                        border: '1px solid rgba(212,175,55,0.45)', padding: '2px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0) 70%)',
                        marginBottom: '8px', transition: 'all 0.3s ease'
                      }}>
                        <div style={{
                          width: '100%', height: '100%', borderRadius: '50%',
                          border: '1px solid rgba(212,175,55,0.6)',
                          background: 'rgba(26,26,26,0.3)', overflow: 'hidden'
                        }}>
                          <img src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        </div>
                      </div>

                      <p className="font-primary family-name-text" style={{
                        fontSize: 'clamp(12px, 2vw, 13.5px)',
                        color: 'var(--c-maroon)',
                        fontWeight: '600',
                        margin: '0',
                        lineHeight: '1.35'
                      }}>
                        {renderName(name)}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>

        {/* Responsive + hover styles */}
        <style>{`
          @media (min-width: 768px) {
            .family-grid-resp { grid-template-columns: repeat(3, 1fr) !important; gap: 24px !important; }
          }
          @media (min-width: 1024px) {
            .family-grid-resp { grid-template-columns: repeat(4, 1fr) !important; gap: 28px !important; }
          }
          @media (min-width: 600px) {
            .awaiting-grid-resp { grid-template-columns: repeat(3, 1fr) !important; gap: 16px !important; }
          }
          @media (min-width: 900px) {
            .awaiting-grid-resp { grid-template-columns: repeat(4, 1fr) !important; gap: 20px !important; }
          }
          @media (min-width: 1200px) {
            .awaiting-grid-resp { grid-template-columns: repeat(5, 1fr) !important; gap: 20px !important; }
          }

          .family-card-item:hover {
            transform: translateY(-8px) !important;
            border-color: var(--c-gold) !important;
            box-shadow: 0 15px 35px rgba(212,175,55,0.15), var(--glass-shadow) !important;
          }

          .family-card-item:hover .card-tap-hint { opacity: 0.75 !important; }

          .awaiting-card-item:hover {
            transform: translateY(-5px) !important;
            border-color: var(--c-gold) !important;
            box-shadow: 0 10px 25px rgba(212,175,55,0.12) !important;
          }

          [data-theme='dark'] .family-name-text { color: var(--c-text-primary) !important; }
          [data-theme='light'] .family-name-text { color: var(--c-maroon) !important; }
          [data-theme='light'] .tab-container-inner { background: rgba(255,255,255,0.95) !important; border: 1px solid rgba(212,175,55,0.3) !important; }

          @keyframes popup-pulse {
            0%, 100% { box-shadow: 0 0 35px rgba(212,175,55,0.22), 0 8px 30px rgba(0,0,0,0.25); }
            50% { box-shadow: 0 0 55px rgba(212,175,55,0.4), 0 8px 30px rgba(0,0,0,0.25); }
          }
        `}</style>
      </section>

      {/* Portal-rendered popup: lives at document.body so it's never clipped */}
      <PopupPortal />
    </>
  );
};

export default Family;
