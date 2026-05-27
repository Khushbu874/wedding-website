import React from 'react';
import { Music, Pause } from 'lucide-react';

const MusicPlayer = ({ isPlaying, togglePlay }) => {
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 99,
      }}
    >
      <button
        onClick={togglePlay}
        className="glass-panel"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid var(--c-gold)',
          color: 'var(--c-maroon)',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease'
        }}
      >
        {isPlaying ? <Pause size={20} /> : <Music size={20} />}
      </button>
      
      {/* Subtle glowing ring when playing */}
      {isPlaying && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          borderRadius: '50%',
          border: '2px solid var(--c-gold)',
          animation: 'pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
          pointerEvents: 'none',
          zIndex: -1
        }} />
      )}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default MusicPlayer;
