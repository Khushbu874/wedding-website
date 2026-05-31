import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Plane, Download, Share2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useLanguage } from './LanguageContext';
import ssLogo from '../assets/S&S.png';

const BoardingPass = () => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [generated, setGenerated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const passRef = useRef(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setGenerated(true);
    }
  };

  const handleDownload = async () => {
    if (!passRef.current || isProcessing) return;
    setIsProcessing(true);
    
    try {
      const canvas = await html2canvas(passRef.current, { scale: 2, backgroundColor: null });
      const image = canvas.toDataURL('image/png');
      
      const link = document.createElement('a');
      link.href = image;
      link.download = `Wedding_Boarding_Pass_${name}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating image:', error);
      alert(t('bp_fail'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = async () => {
    if (!passRef.current || isProcessing) return;
    setIsProcessing(true);

    try {
      const canvas = await html2canvas(passRef.current, { scale: 2, backgroundColor: null });
      
      canvas.toBlob(async (blob) => {
        if (!blob) throw new Error("Canvas to Blob failed");
        
        const file = new File([blob], `BoardingPass_${name}.png`, { type: 'image/png' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: t('bp_share_title'),
            text: t('bp_share_text'),
            files: [file]
          });
        } else if (navigator.share) {
          await navigator.share({
            title: t('bp_share_title'),
            text: t('bp_share_text')
          });
        } else {
          alert(t('bp_error'));
        }
      }, 'image/png');
      
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <section id="boarding-pass" className="section-padding" style={{ backgroundColor: 'var(--c-bg-secondary)', filter: 'brightness(0.94)', paddingTop: 'clamp(20px, 4vw, 40px)' }}>
      {/* Elegant Gold Divider */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', width: '80%', maxWidth: '400px', margin: '0 auto clamp(15px, 3vh, 25px) auto', position: 'relative', zIndex: 10 }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.6))' }} />
        <span style={{ color: 'var(--c-gold)', fontSize: '14px', letterSpacing: '2px' }}>✦ ⚜ ✦</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212, 175, 55, 0.6))' }} />
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-center"
          style={{ fontSize: '40px', color: 'var(--c-maroon)', marginBottom: '20px', letterSpacing: '4px' }}
        >
          {t('bp_title')}
        </motion.h2>
        
        <p className="font-secondary text-center" style={{ color: 'var(--c-text-secondary)', marginBottom: '40px', fontSize: '18px' }}>
          {t('bp_subtitle')}
        </p>

        {!generated ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', gap: '30px' }}>
            
            {/* Live Ticket Specimen Preview */}
            <div style={{ width: '100%', position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                top: '-12px', 
                left: '20px', 
                backgroundColor: 'var(--c-gold)', 
                color: '#1a1a1a', 
                fontSize: '10px', 
                fontWeight: 'bold', 
                padding: '4px 12px', 
                borderRadius: '20px', 
                zIndex: 10, 
                letterSpacing: '1px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                TICKET PREVIEW
              </div>
              
              <div className="boarding-pass-wrap" style={{ opacity: 0.95, transform: 'scale(1)', transformOrigin: 'center' }}>
                {/* Left Side */}
                <div className="boarding-pass-main">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--c-gold)', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={ssLogo} alt="S&S Logo" style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
                      <span className="font-heading" style={{ color: '#5a0000', fontSize: 'clamp(14px, 3.5vw, 18px)', fontWeight: 'bold', letterSpacing: '1px' }}>WEDDING</span>
                    </div>
                    <Plane color="var(--c-gold)" />
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div>
                      <p className="font-secondary" style={{ color: '#4a4a4a', fontSize: '10px', textTransform: 'uppercase' }}>{t('bp_passenger')}</p>
                      <p className="font-primary" style={{ color: '#1a1a1a', fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: 'bold' }}>
                        {name.trim() !== '' ? name.toUpperCase() : 'YOUR NAME HERE'}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p className="font-secondary" style={{ color: '#4a4a4a', fontSize: '10px', textTransform: 'uppercase' }}>{t('bp_date_label')}</p>
                      <p className="font-primary" style={{ color: '#1a1a1a', fontSize: 'clamp(14px, 3.5vw, 18px)' }}>{t('bp_date_val')}</p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p className="font-primary" style={{ fontSize: 'clamp(22px, 5vw, 30px)', color: '#5a0000', fontWeight: 'bold' }}>{t('bp_home')}</p>
                      <p className="font-secondary" style={{ color: '#4a4a4a', fontSize: 'clamp(11px, 3.5vw, 14px)' }}>{t('bp_anywhere')}</p>
                    </div>
                    <Plane color="var(--c-gold)" style={{ transform: 'rotate(90deg)', width: 'clamp(16px, 4vw, 24px)' }} />
                    <div style={{ textAlign: 'right' }}>
                      <p className="font-primary" style={{ fontSize: 'clamp(22px, 5vw, 30px)', color: '#5a0000', fontWeight: 'bold' }}>{t('bp_dest')}</p>
                      <p className="font-secondary" style={{ color: '#4a4a4a', fontSize: 'clamp(11px, 3.5vw, 14px)' }}>{t('bp_dest_full')}</p>
                    </div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="boarding-pass-stub">
                  <div>
                    <p className="font-secondary" style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>{t('bp_board_time')}</p>
                    <p className="font-primary" style={{ fontSize: '18px' }}>17:00</p>
                  </div>
                  <div>
                    <p className="font-secondary" style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>{t('bp_seat')}</p>
                    <p className="font-primary" style={{ fontSize: '18px' }}>VIP</p>
                  </div>
                  <div className="boarding-pass-stub-text">
                    <span className="font-script" style={{ fontSize: '24px' }}>{t('couple_names')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleGenerate} className="bp-form">
              <input 
                type="text" 
                placeholder={t('bp_placeholder')} 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  borderRadius: '30px',
                  border: '1.5px solid var(--c-gold)',
                  background: 'rgba(255,255,255,0.85)',
                  color: '#1a1a1a',
                  fontFamily: 'var(--font-secondary)',
                  fontSize: '16px',
                  fontWeight: '600',
                  outline: 'none',
                  boxShadow: '0 4px 15px rgba(90, 0, 0, 0.03)'
                }}
              />
              <button 
                type="submit"
                style={{
                  padding: '14px 28px',
                  borderRadius: '30px',
                  background: 'var(--c-maroon)',
                  color: 'var(--c-gold)',
                  border: '1.5px solid var(--c-gold)',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  letterSpacing: '1.5px',
                  boxShadow: '0 4px 15px rgba(90, 0, 0, 0.15)',
                  transition: 'all 0.3s ease'
                }}
              >
                {t('bp_generate')}
              </button>
            </form>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ width: '100%', maxWidth: '600px' }}
          >
            {/* The Boarding Pass */}
            <div 
              ref={passRef}
              className="boarding-pass-wrap"
            >
              {/* Left Side */}
              <div className="boarding-pass-main">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid var(--c-gold)', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <img src={ssLogo} alt="S&S Logo" style={{ height: '24px', width: 'auto', objectFit: 'contain' }} />
                    <span className="font-heading" style={{ color: '#5a0000', fontSize: 'clamp(14px, 3.5vw, 18px)', fontWeight: 'bold', letterSpacing: '1px' }}>WEDDING</span>
                  </div>
                  <Plane color="var(--c-gold)" />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                    <p className="font-secondary" style={{ color: '#4a4a4a', fontSize: '10px', textTransform: 'uppercase' }}>{t('bp_passenger')}</p>
                    <p className="font-primary" style={{ color: '#1a1a1a', fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: 'bold' }}>{name.toUpperCase()}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p className="font-secondary" style={{ color: '#4a4a4a', fontSize: '10px', textTransform: 'uppercase' }}>{t('bp_date_label')}</p>
                    <p className="font-primary" style={{ color: '#1a1a1a', fontSize: 'clamp(14px, 3.5vw, 18px)' }}>{t('bp_date_val')}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p className="font-primary" style={{ fontSize: 'clamp(22px, 5vw, 30px)', color: '#5a0000', fontWeight: 'bold' }}>{t('bp_home')}</p>
                    <p className="font-secondary" style={{ color: '#4a4a4a', fontSize: 'clamp(11px, 3.5vw, 14px)' }}>{t('bp_anywhere')}</p>
                  </div>
                  <Plane color="var(--c-gold)" style={{ transform: 'rotate(90deg)', width: 'clamp(16px, 4vw, 24px)' }} />
                  <div style={{ textAlign: 'right' }}>
                    <p className="font-primary" style={{ fontSize: 'clamp(22px, 5vw, 30px)', color: '#5a0000', fontWeight: 'bold' }}>{t('bp_dest')}</p>
                    <p className="font-secondary" style={{ color: '#4a4a4a', fontSize: 'clamp(11px, 3.5vw, 14px)' }}>{t('bp_dest_full')}</p>
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="boarding-pass-stub">
                <div>
                  <p className="font-secondary" style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>{t('bp_board_time')}</p>
                  <p className="font-primary" style={{ fontSize: '18px' }}>17:00</p>
                </div>
                <div>
                  <p className="font-secondary" style={{ fontSize: '10px', textTransform: 'uppercase', opacity: 0.8 }}>{t('bp_seat')}</p>
                  <p className="font-primary" style={{ fontSize: '18px' }}>VIP</p>
                </div>
                <div className="boarding-pass-stub-text">
                  <span className="font-script" style={{ fontSize: '24px' }}>{t('couple_names')}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
              <button 
                onClick={handleDownload}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '15px',
                  borderRadius: '8px',
                  background: 'var(--c-maroon)',
                  border: '1px solid var(--c-gold)',
                  color: 'var(--c-gold)',
                  fontFamily: 'var(--font-heading)',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  opacity: isProcessing ? 0.7 : 1
                }}
              >
                <Download size={20} /> {isProcessing ? t('bp_processing') : t('bp_download')}
              </button>
              
              <button 
                onClick={handleShare}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  padding: '15px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid var(--c-gold)',
                  color: 'var(--c-gold)',
                  fontFamily: 'var(--font-heading)',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                  opacity: isProcessing ? 0.7 : 1
                }}
              >
                <Share2 size={20} /> {t('bp_share')}
              </button>
            </div>
            
            <button 
              onClick={() => { setGenerated(false); setName(''); }}
              style={{
                display: 'block',
                width: '100%',
                marginTop: '25px',
                padding: '15px',
                background: '#fffff0',
                border: '2px solid var(--c-gold)',
                borderRadius: '8px',
                color: '#1a1a1a',
                fontFamily: 'var(--font-heading)',
                fontSize: '16px',
                fontWeight: '600',
                letterSpacing: '1px',
                cursor: 'pointer',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => { e.target.style.background = '#f0e6d2'; e.target.style.transform = 'scale(1.02)'; }}
              onMouseOut={(e) => { e.target.style.background = '#fffff0'; e.target.style.transform = 'scale(1)'; }}
            >
              {t('bp_create_another')}
            </button>
          </motion.div>
        )}
      </div>
      <style>{`
        .bp-form {
          display: flex;
          flex-direction: row;
          gap: 12px;
          width: 100%;
          max-width: 500px;
          z-index: 5;
        }
        @media (max-width: 480px) {
          .bp-form {
            flex-direction: column;
            gap: 15px;
          }
          .bp-form input {
            width: 100% !important;
            text-align: center;
          }
          .bp-form button {
            width: 100% !important;
            padding: 14px 20px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default BoardingPass;
