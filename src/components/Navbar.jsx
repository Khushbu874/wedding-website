import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { useTheme } from './ThemeContext';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';

const Navbar = () => {
  const { t, language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
  
  // Countdown Logic
  const targetDate = new Date('2026-11-24T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    const handleResize = () => setIsMobile(window.innerWidth < 1100);
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Countdown Timer
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, []);

  const menuItems = [
    { label: t('our_story'), href: '#story' },
    { label: t('events'), href: '#events' },
    { label: t('venue'), href: '#venue' },
    { label: t('gallery'), href: '#gallery' },
    { label: t('boarding_pass'), href: '#boarding-pass' },
    { label: t('wishes'), href: '#wishes' },
    { label: t('rsvp'), href: '#rsvp' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: scrolled ? '10px 30px' : '20px 40px',
          background: scrolled ? (theme === 'light' ? 'rgba(255,251,245,0.85)' : 'rgba(26,26,26,0.85)') : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.1)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212,175,55,0.2)' : '1px solid transparent',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Logo */}
        <div className="font-script text-gradient-gold" style={{ fontSize: '36px', cursor: 'pointer', flexShrink: 0, paddingRight: '20px' }}>
          <a href="#hero" style={{ textDecoration: 'none', color: 'inherit' }}>A & P</a>
        </div>

        <div style={{ flex: 1 }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0, paddingLeft: '20px' }}>
          {/* Controls */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <button 
              onClick={toggleTheme} 
              className="icon-btn"
              style={{ background: 'none', border: 'none', color: 'var(--c-gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: isMobile ? '28px' : '35px', height: isMobile ? '28px' : '35px', borderRadius: '50%', border: '1px solid var(--c-gold)' }}
            >
              {theme === 'light' ? <Moon size={isMobile ? 14 : 18} /> : <Sun size={isMobile ? 14 : 18} />}
            </button>
            <button 
              onClick={toggleLanguage} 
              className="icon-btn"
              style={{ background: 'none', color: 'var(--c-gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', fontFamily: 'var(--font-heading)', fontSize: isMobile ? '11px' : '13px', width: 'auto', padding: isMobile ? '0 8px' : '0 12px', height: isMobile ? '28px' : '35px', borderRadius: '20px', border: '1px solid var(--c-gold)' }}
            >
              <Globe size={isMobile ? 14 : 16} /> {language === 'en' ? 'HI' : 'EN'}
            </button>
          </div>

          {/* Hamburger Menu (Always Visible) */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--c-gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '5px' }}
          >
            {isOpen ? <X size={isMobile ? 26 : 32} /> : <Menu size={isMobile ? 26 : 32} />}
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                zIndex: 998
              }}
            />
            {/* Drawer */}
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed',
                top: 0, right: 0, bottom: 0,
                width: '320px',
                maxWidth: '85vw',
                backgroundColor: 'var(--c-bg-primary)',
                borderLeft: '1px solid var(--c-gold)',
                zIndex: 999,
                display: 'flex',
                flexDirection: 'column',
                padding: '40px 30px',
                boxShadow: '-15px 0 40px rgba(0,0,0,0.3)',
                overflowY: 'auto'
              }}
            >
              {/* Close Button inside drawer */}
              <button 
                onClick={() => setIsOpen(false)}
                style={{ position: 'absolute', top: '25px', right: '25px', background: 'none', border: 'none', color: 'var(--c-gold)', cursor: 'pointer', padding: '5px' }}
              >
                <X size={32} />
              </button>

              <h2 className="font-script text-gradient-gold" style={{ fontSize: '40px', marginBottom: '30px', marginTop: '20px' }}>A & P</h2>

              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {menuItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (0.05 * index) }}
                    className="font-heading mobile-nav-link"
                    style={{
                      color: 'var(--c-text-primary)',
                      fontSize: '18px',
                      textDecoration: 'none',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      paddingBottom: '10px',
                      borderBottom: '1px solid rgba(212,175,55,0.1)'
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: var(--c-gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover .nav-link-underline {
          width: 100%;
        }
        .nav-link:hover {
          color: var(--c-gold) !important;
        }
        .icon-btn {
          transition: all 0.3s ease;
        }
        .icon-btn:hover {
          background-color: var(--c-gold) !important;
          color: var(--c-bg-primary) !important;
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(212,175,55,0.3);
        }
        .mobile-nav-link {
          transition: color 0.3s, padding-left 0.3s;
        }
        .mobile-nav-link:hover {
          color: var(--c-maroon) !important;
          padding-left: 10px;
          border-bottom-color: var(--c-maroon) !important;
        }
      `}</style>
    </>
  );
};

export default Navbar;
