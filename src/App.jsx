import React, { useState, useRef, useMemo } from 'react';
import IntroScreen from './components/IntroScreen';
import MusicPlayer from './components/MusicPlayer';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InvitationCard from './components/InvitationCard';
import LoveStory from './components/LoveStory';
import EventTimeline from './components/EventTimeline';
import Gallery from './components/Gallery';
import BoardingPass from './components/BoardingPass';
import WishesWall from './components/WishesWall';
import Family from './components/Family';
import EmergencyContacts from './components/EmergencyContacts';
import Venue from './components/Venue';
import FinalSection from './components/FinalSection';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const particles = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      initialX: Math.random() * (window.innerWidth || 1200),
      initialY: Math.random() * (window.innerHeight || 800),
      scale: Math.random() * 0.5 + 0.5,
      targetY: Math.random() * -300 - 100,
      targetX: Math.random() * 200 - 100,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      size: Math.random() * 10 + 5
    }));
  }, []);

  const handleOpenInvitation = () => {
    setIntroFinished(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      // Autoplay immediately upon user click!
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log("Audio play failed:", err));
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      
      {/* Global Audio Element */}
      <audio 
        ref={audioRef} 
        src={`${import.meta.env.BASE_URL}wedding_song.mp3`} 
        loop 
      />
 
      <AnimatePresence mode="wait">
        {!introFinished ? (
          <IntroScreen key="intro" onComplete={handleOpenInvitation} />
        ) : (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ position: 'relative', width: '100%', overflowX: 'hidden' }}
          >
            {/* Global Animated Background Effect */}
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
              {particles.map((p) => (
                <motion.div
                  key={`bg-particle-${p.id}`}
                  initial={{ 
                    opacity: 0, 
                    y: p.initialY, 
                    x: p.initialX,
                    scale: p.scale
                  }}
                  animate={{ 
                    opacity: [0, 0.3, 0], 
                    y: [p.initialY, p.initialY + p.targetY], 
                    x: [p.initialX, p.initialX + p.targetX] 
                  }}
                  transition={{ 
                    duration: p.duration, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: p.delay
                  }}
                  style={{
                    position: 'absolute',
                    width: `${p.size}px`,
                    height: `${p.size}px`,
                    borderRadius: '50%',
                    backgroundColor: 'var(--c-gold)',
                    filter: 'blur(3px)',
                    boxShadow: '0 0 15px var(--c-gold)',
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden'
                  }}
                />
              ))}
            </div>

            <div style={{ position: 'relative', zIndex: 1, width: '100%', overflowX: 'hidden' }}>
              <Navbar />
              <MusicPlayer isPlaying={isPlaying} togglePlay={togglePlay} />
              
              <div id="hero"><Hero /></div>
              <InvitationCard />
              <div id="events"><EventTimeline /></div>
              <div id="gallery"><Gallery /></div>
              <Family />
              <Venue />
              <BoardingPass />
              <WishesWall />
              <div id="story"><LoveStory /></div>
              <div id="contacts"><EmergencyContacts /></div>
              <FinalSection />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
