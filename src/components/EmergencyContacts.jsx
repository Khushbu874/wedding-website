import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Phone, ShieldAlert, User, Sparkles } from 'lucide-react';

const EmergencyContacts = () => {
  const { t } = useLanguage();

  const contactsList = [
    {
      name: "Dr. Pradeep Agrawal",
      phone: "9826846253",
      role: t('groom_family_title') || "Groom's Family Liaison"
    },
    {
      name: "Navodit Agrawal",
      phone: "9826445554",
      role: t('bride_family_title') || "Bride's Family Liaison"
    }
  ];

  return (
    <section 
      id="contacts" 
      className="section-padding" 
      style={{ 
        backgroundColor: '#eae2d5', 
        position: 'relative', 
        overflow: 'hidden',
        paddingTop: 'clamp(50px, 8vw, 80px)',
        paddingBottom: 'clamp(50px, 8vw, 80px)'
      }}
    >
      {/* Subtle royal background accents */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '30%', height: '30%', opacity: 0.05, backgroundImage: 'radial-gradient(var(--c-gold) 1px, transparent 1px)', backgroundSize: '15px 15px', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '30%', height: '30%', opacity: 0.05, backgroundImage: 'radial-gradient(var(--c-gold) 1px, transparent 1px)', backgroundSize: '15px 15px', borderRadius: '50%' }} />

      {/* Elegant Gold Divider at the top */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', width: '80%', maxWidth: '400px', margin: '0 auto clamp(25px, 5vh, 45px) auto', position: 'relative', zIndex: 10 }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212, 175, 55, 0.6))' }} />
        <span style={{ color: 'var(--c-gold)', fontSize: '14px', letterSpacing: '2px' }}>✦ ⚜ ✦</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212, 175, 55, 0.6))' }} />
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 5 }}>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-center"
          style={{ 
            fontSize: 'clamp(28px, 6vw, 40px)', 
            color: 'var(--c-maroon)', 
            marginBottom: '15px', 
            letterSpacing: '4px',
            textTransform: 'uppercase'
          }}
        >
          {t('emergency_contacts')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-secondary text-center"
          style={{ 
            color: 'var(--c-text-secondary)', 
            maxWidth: '500px', 
            marginBottom: '40px',
            fontSize: 'clamp(14px, 2.5vw, 16px)',
            lineHeight: '1.6'
          }}
        >
          Have questions or need assistance during the wedding? Please feel free to reach out to our emergency coordination team:
        </motion.p>

        {/* Contact Cards Grid */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '25px', 
          width: '100%', 
          maxWidth: '800px', 
          justifyContent: 'center' 
        }}>
          {contactsList.map((contact, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="glass-panel"
              style={{
                flex: '1 1 min(300px, 100%)',
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(212, 175, 55, 0.35)',
                borderRadius: '20px',
                padding: '30px 25px',
                boxShadow: '0 10px 30px rgba(90, 0, 0, 0.04)',
                textAlign: 'center',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Gold sparkles accent */}
              <div style={{ position: 'absolute', top: '15px', right: '15px', color: 'var(--c-gold)', opacity: 0.3, fontSize: '12px' }}>✦</div>

              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                border: '1.5px solid var(--c-gold)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
                color: 'var(--c-maroon)'
              }}>
                <User size={26} />
              </div>

              <h3 className="font-heading" style={{ color: 'var(--c-maroon)', fontSize: '20px', marginBottom: '6px', fontWeight: 'bold' }}>
                {contact.name}
              </h3>
              
              <span className="font-secondary" style={{ 
                color: 'var(--c-gold)', 
                fontSize: '12px', 
                textTransform: 'uppercase', 
                letterSpacing: '1.5px',
                marginBottom: '20px',
                fontWeight: '600'
              }}>
                ✦ {contact.role} ✦
              </span>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${contact.phone}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 28px',
                  backgroundColor: 'var(--c-maroon)',
                  color: 'var(--c-gold)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-heading)',
                  borderRadius: '30px',
                  fontSize: '15px',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  boxShadow: '0 4px 15px rgba(90, 0, 0, 0.15)',
                  transition: 'all 0.3s ease'
                }}
              >
                <Phone size={16} /> {contact.phone}
              </motion.a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmergencyContacts;
