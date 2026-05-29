import React, { useState, useRef } from 'react';
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
import RSVP from './components/RSVP';
import Venue from './components/Venue';
import FinalSection from './components/FinalSection';
import Countdown from './components/Countdown';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

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
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={`bg-particle-${i}`}
                  initial={{ 
                    opacity: 0, 
                    y: Math.random() * window.innerHeight, 
                    x: Math.random() * window.innerWidth,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{ 
                    opacity: [0, 0.3, 0], 
                    y: [null, Math.random() * -300 - 100], 
                    x: [null, Math.random() * 200 - 100] 
                  }}
                  transition={{ 
                    duration: Math.random() * 15 + 15, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: Math.random() * 10
                  }}
                  style={{
                    position: 'absolute',
                    width: `${Math.random() * 10 + 5}px`,
                    height: `${Math.random() * 10 + 5}px`,
                    borderRadius: '50%',
                    backgroundColor: 'var(--c-gold)',
                    filter: 'blur(3px)',
                    boxShadow: '0 0 15px var(--c-gold)'
                  }}
                />
              ))}
            </div>

            <div style={{ position: 'relative', zIndex: 1, width: '100%', overflowX: 'hidden' }}>
              <Navbar />
              <MusicPlayer isPlaying={isPlaying} togglePlay={togglePlay} />
              
              <div id="hero"><Hero /></div>
              <InvitationCard />
              <Countdown />
              <div id="events"><EventTimeline /></div>
              <div id="gallery"><Gallery /></div>
              <Family />
              <Venue />
              <BoardingPass />
              <WishesWall />
              <div id="story"><LoveStory /></div>
              <div id="rsvp"><RSVP /></div>
              <FinalSection />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
