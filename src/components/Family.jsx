import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [activeTab, setActiveTab] = useState('bride'); // Shivangi's Family (bride) is first and default
  const [displayTab, setDisplayTab] = useState('bride'); // Tab currently being displayed in grid
  const [isFlipped, setIsFlipped] = useState(false); // Controls the 90deg rotation state
  const [isFlipping, setIsFlipping] = useState(false); // Keeps 3D rendering context active for the whole duration

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
        { name: t('groom_couple_3'), relation: t('relation_bua_fufa'), relKey: 'bua_fufa' },
        { name: t('groom_couple_4'), relation: t('relation_aunt_uncle'), relKey: 'aunt_uncle' }
      ]
    }
  };

  // Dynamically returns cartoon avatars matching relation, gender, and name
  const getFamilyAvatar = (relKey, name) => {
    const isCouple = name.includes('&') || name.includes('एवं');

    if (relKey === 'grandparents') {
      return avatarGrandparents;
    }

    if (relKey === 'parents') {
      return displayTab === 'bride' ? avatarParentsBride : avatarParentsGroom;
    }

    if (relKey === 'cousin_couple' || (isCouple && relKey === 'awaiting')) {
      return avatarCousinCouple;
    }

    if (relKey === 'cousin_single' || (!isCouple && relKey === 'awaiting')) {
      const cleanName = name.toLowerCase().trim();
      const isFemale = cleanName.includes('muskan') || 
                       cleanName.includes('मुस्कान');
      return isFemale ? avatarSingleFemale : avatarSingleMale;
    }

    if (isCouple) {
      return avatarAuntUncle;
    }

    const cleanName = name.toLowerCase().trim();
    const isFemale = cleanName.includes('muskan') || 
                     cleanName.includes('मुस्कान');
    return isFemale ? avatarSingleFemale : avatarSingleMale;
  };

  // Formats names by breaking couples with beautiful, customized connectors
  const renderName = (name) => {
    let parts = [];
    let connector = '';
    if (name.includes(' & ')) {
      parts = name.split(' & ');
      connector = '&';
    } else if (name.includes(' एवं ')) {
      parts = name.split(' एवं ');
      connector = 'एवं';
    }

    if (parts.length === 2) {
      const isHindi = connector === 'एवं';
      return (
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ display: 'block', textWrap: 'balance' }}>{parts[0]}</span>
          <span 
            className={isHindi ? "font-secondary" : "font-script"} 
            style={{ 
              display: 'block', 
              fontSize: isHindi ? 'clamp(13px, 2.5vw, 16px)' : 'clamp(20px, 3.8vw, 24px)', 
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

    // Swap content at the 90 degree perpendicular point (350ms)
    setTimeout(() => {
      setDisplayTab(tab);
      setIsFlipped(false);
    }, 350);

    // Completely end the 3D transform context at the end of the return transition (350ms + 420ms = 770ms)
    // This removes perspective and transform-style from the DOM, restoring perfect crystal clear subpixel font-rendering!
    setTimeout(() => {
      setIsFlipping(false);
    }, 770);
  };

  return (
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
      {/* Decorative Radial Background Lights */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'clamp(300px, 60vw, 600px)',
        height: 'clamp(300px, 60vw, 600px)',
        background: activeTab === 'groom' 
          ? 'radial-gradient(circle, rgba(212,175,55,0.06) 0%, rgba(0,0,0,0) 70%)'
          : 'radial-gradient(circle, rgba(90,0,0,0.06) 0%, rgba(0,0,0,0) 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        transition: 'background 0.8s ease'
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

        {/* Elegant Gold Divider */}
        <div style={{ 
          height: '2px', 
          width: '80px', 
          background: 'linear-gradient(90deg, transparent, var(--c-gold), transparent)', 
          marginBottom: '35px'
        }} />

        {/* Premium Capsule Tab Selector (Shivangi's Family on Left and Active First) */}
        <div className="tab-container">
          <button 
            className={`tab-btn ${activeTab === 'bride' ? 'active bride' : ''}`}
            onClick={() => handleTabChange('bride')}
          >
            {t('bride_family_title')}
          </button>
          <button 
            className={`tab-btn ${activeTab === 'groom' ? 'active groom' : ''}`}
            onClick={() => handleTabChange('groom')}
          >
            {t('groom_family_title')}
          </button>
        </div>

        {/* 3D Flip Perspective Container wrapping both grids */}
        <div className={`flip-container ${isFlipping ? 'active-perspective' : ''}`}>
          <div className={`flip-inner ${isFlipped ? 'flipped' : ''} ${isFlipping ? 'flipping' : ''}`}>
            
            {/* Family Member Cards Grid */}
            <div className="family-grid">
              {families[displayTab].members.map((member, index) => (
                <motion.div 
                  key={`${displayTab}-${index}`}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.5 }}
                  className="family-card"
                >
                  <div className="card-glass-shine" />
                  
                  {/* Gold-Rimmed Double Circle Avatar Container */}
                  <div className="avatar-double-ring">
                    <div className="avatar-inner-circle">
                      <img 
                        src={getFamilyAvatar(member.relKey, member.name)} 
                        alt={member.name}
                        className="avatar-img"
                      />
                    </div>
                  </div>
                  
                  {/* Relation Label */}
                  <span className="family-relation-badge">
                    ✦ {member.relation} ✦
                  </span>
                  
                  {/* Serif Name Layout */}
                  <p className="family-member-name font-primary">
                    {renderName(member.name)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Awaiting to Welcome Secondary Section */}
            <div style={{ textAlign: 'center', marginTop: '70px', marginBottom: '30px', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, transparent, var(--c-gold))' }} />
                <h4 className="font-heading" style={{ fontSize: 'clamp(18px, 4vw, 24px)', letterSpacing: '2px', margin: 0, color: 'var(--c-gold)', fontWeight: '600' }}>
                  ✦ {t('relation_awaiting')} ✦
                </h4>
                <div style={{ height: '1px', width: '60px', background: 'linear-gradient(90deg, var(--c-gold), transparent)' }} />
              </div>
            </div>

            {/* Cousins Awaiting Welcoming Mini Cards Grid */}
            <div className="awaiting-grid">
              {t(displayTab === 'bride' ? 'bride_awaiting' : 'groom_awaiting').map((name, index) => {
                const isCouple = name.includes('&') || name.includes('एवं');
                const avatar = getFamilyAvatar(isCouple ? 'cousin_couple' : 'cousin_single', name);
                
                return (
                  <motion.div 
                    key={`${displayTab}-awaiting-${index}`}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.4 }}
                    className="awaiting-card"
                  >
                    <div className="card-glass-shine" />
                    
                    {/* Secondary Awaiting Avatar Circle */}
                    <div className="awaiting-avatar-ring">
                      <div className="awaiting-avatar-inner">
                        <img 
                          src={avatar} 
                          alt={name}
                          className="awaiting-avatar-img"
                        />
                      </div>
                    </div>
                    
                    {/* Cousin Name */}
                    <p className="awaiting-name">
                      {renderName(name)}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

      </div>

      {/* Dynamic Local Stylesheet */}
      <style>{`
        .flip-container {
          width: 100%;
        }

        .flip-container.active-perspective {
          perspective: 2000px;
        }

        .flip-inner {
          width: 100%;
          transform: rotateY(0deg);
          transition: transform 0.35s cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }

        .flip-inner.flipping {
          transform-style: preserve-3d;
        }

        .flip-inner.flipped {
          transform: rotateY(90deg) scale(0.96);
          transition: transform 0.35s cubic-bezier(0.55, 0.055, 0.675, 0.19);
        }

        /* Spring ease-out effect when returning to normal 0deg orientation */
        .flip-inner:not(.flipped) {
          transition: transform 0.42s cubic-bezier(0.215, 0.61, 0.355, 1);
        }

        .tab-container {
          display: inline-flex;
          background: rgba(26, 26, 26, 0.85);
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 50px;
          padding: 6px;
          gap: 4px;
          margin-bottom: 40px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
          z-index: 10;
          position: relative;
        }

        [data-theme='light'] .tab-container {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 8px 30px rgba(90, 0, 0, 0.06);
        }

        .tab-btn {
          padding: 10px 28px;
          border-radius: 40px;
          border: none;
          background: transparent;
          color: var(--c-text-secondary);
          font-family: var(--font-heading);
          font-size: clamp(12px, 2.5vw, 14px);
          font-weight: 600;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }

        .tab-btn:hover {
          color: var(--c-gold);
        }

        .tab-btn.active.groom {
          background: var(--c-maroon, #5a0000);
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(90, 0, 0, 0.4);
        }

        .tab-btn.active.bride {
          background: var(--c-maroon, #5a0000);
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(90, 0, 0, 0.4);
        }

        .family-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }

        @media (min-width: 768px) {
          .family-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }

        @media (min-width: 1024px) {
          .family-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 28px;
          }
        }

        .family-card {
          position: relative;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          box-shadow: var(--glass-shadow);
          border-radius: 20px;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          text-align: center;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          cursor: default;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        .family-card:hover {
          transform: translateY(-8px);
          border-color: var(--c-gold);
          box-shadow: 0 15px 35px rgba(212, 175, 55, 0.15), var(--glass-shadow);
        }

        .card-glass-shine {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%);
          pointer-events: none;
          z-index: 1;
        }

        .avatar-double-ring {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 1px solid var(--c-gold);
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: radial-gradient(circle, rgba(212,175,55,0.18) 0%, rgba(212,175,55,0) 70%);
          margin-bottom: 16px;
          transition: all 0.4s ease;
        }

        .avatar-inner-circle {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1.5px solid var(--c-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, rgba(90, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.4) 100%);
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.15);
          transition: all 0.4s ease;
          overflow: hidden;
        }

        [data-theme='light'] .avatar-inner-circle {
          background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(212, 175, 55, 0.12) 100%);
        }

        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .family-card:hover .avatar-double-ring {
          border-color: var(--c-gold-light);
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
        }

        .family-card:hover .avatar-inner-circle {
          border-color: var(--c-gold-light);
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.4);
        }

        .family-card:hover .avatar-img {
          transform: scale(1.12) rotate(1deg);
        }

        .family-relation-badge {
          font-family: var(--font-heading);
          font-size: clamp(9px, 2vw, 11px);
          color: var(--c-gold);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 12px;
          display: block;
        }

        .family-member-name {
          font-family: var(--font-primary);
          font-size: clamp(13px, 2.3vw, 16px);
          color: var(--c-maroon);
          font-weight: 700;
          margin: 0;
          line-height: 1.4;
          letter-spacing: 0.3px;
          z-index: 2;
        }

        [data-theme='dark'] .family-member-name {
          color: var(--c-text-primary);
        }

        .awaiting-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }

        @media (min-width: 600px) {
          .awaiting-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }

        @media (min-width: 900px) {
          .awaiting-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
          }
        }

        @media (min-width: 1200px) {
          .awaiting-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }
        }

        .awaiting-card {
          position: relative;
          background: var(--glass-bg);
          border: 1px solid rgba(212, 175, 55, 0.15);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
          border-radius: 16px;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
          min-height: 130px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        .awaiting-card:hover {
          transform: translateY(-5px);
          border-color: var(--c-gold);
          box-shadow: 0 10px 25px rgba(212, 175, 55, 0.12);
        }

        .awaiting-avatar-ring {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.45);
          padding: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0) 70%);
          margin-bottom: 8px;
          transition: all 0.3s ease;
        }

        .awaiting-avatar-inner {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(212, 175, 55, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(26, 26, 26, 0.3);
          overflow: hidden;
        }

        [data-theme='light'] .awaiting-avatar-inner {
          background: rgba(255, 255, 255, 0.85);
        }

        .awaiting-avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
          transition: transform 0.3s ease;
        }

        .awaiting-card:hover .awaiting-avatar-ring {
          border-color: var(--c-gold);
          transform: scale(1.08);
        }

        .awaiting-card:hover .awaiting-avatar-img {
          transform: scale(1.1);
        }

        .awaiting-name {
          font-family: var(--font-primary);
          font-size: clamp(12px, 2vw, 13.5px);
          color: var(--c-maroon);
          font-weight: 600;
          margin: 0;
          line-height: 1.35;
        }

        [data-theme='dark'] .awaiting-name {
          color: var(--c-text-primary);
        }
      `}</style>
    </section>
  );
};

export default Family;
